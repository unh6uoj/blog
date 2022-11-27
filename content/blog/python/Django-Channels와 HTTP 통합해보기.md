---
title: Django-Channels와 HTTP 통합해보기
date: 2022-10-17 11:10:11
category: python
thumbnail: { thumbnailSrc }
draft: false
---

프로젝트로 IoT 애플리케이션을 제작하고 있는데, 처음 시도 해보는 부분이라서 어떻게 구축을 시작해야할지 막막한 부분이 많았습니다.  
개인적으로 Python을 주로 사용하고 있고, 중앙 서버를 Django로 구축하기로 했기 때문에, Django에 관한 여러 정보들을 찾아보다가 Channels라는 Django 애드온을 알게 되었습니다.

Channels를는 주로 채팅 관련 서비스에 사용 되는것 같은데, Django를 웹소켓 서버로 사용할 수 있도록 도와주는 점에서 잘 활용하면 계속 연결이 유지되어야하고, 양방향 통신이 필요한 IoT 서버로 사용할 수 있다고 판단하여 Channels를 사용 해보게 되었습니다.

하지만 어플리케이션과 IoT 서버가 항상 WebSocket으로 연결되어 있진 않을것 같았고... IoT기기와 서버가 웹소켓을 통해 항상 연결되어 있고, 어플리케이션은 해당 웹소켓 연결에 HTTP로 데이터를 던져주는 방향으로 생각을 해보게 되었습니다.

## Django-Channels 외부 Consumer에서 접근

[Django-Channels](https://channels.readthedocs.io/en/stable/topics/channel_layers.html#using-outside-of-consumers)공식 문서에 힌트가 될 부분을 찾았습니다.

Channels-Layer를 외부 Consumer에서 접근할 수 있는 방법에 대한 설명이었는데, 이 부분을 잘 활용하면 Django api로 웹소켓에 접근이 가능해보였습니다.

> ⚠️ 여기서 데이터를 받는 Consumer는 WebsocketConsumer를 통해 생성되었습니다.

```python
from channels.layers import get_channel_layer
channel_layer = get_channel_layer()
```

먼저 이렇게 get_channel_layer() 함수로 channels를 조작할 수 있는 객체를 받을 수 있었습니다.

```python
await channel_layer.group_send(
        chat_name,
        {"type": "chat.system_message", "text": announcement_text},
    )
```

그럼 이렇게 group_send()라는 함수를 사용할 수 있는데,
여기서 두 번째 파라미터의 type에 Consumer의 함수명을 작성하면 해당 Consumer의 메소드를 실행 할 수 있습니다.

## HTTP로 Channels Layer에 데이터 보내기

이렇게 Consumer를 외부에서 접근할 수 있는 방법을 알게 되었으니 이제 어플리케이션에서 데이터를 보내는 부분을 진행 해보았습니다.  
먼저, 어플리케이션에서 IoT 디바이스에 HTTP요청에 대한 응답을 view.py에 정의 해두었습니다.

```python
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def index(request):
    if request.method == "POST":
        body = json.loads(request.body.decode("utf-8"))

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            chat_name,
            {
                "type": "app_response",
                "data": body["data"],
            }
        )
```

어플리케이션에서 보낸 POST요청의 데이터가 channel layer로 전달이 됩니다.

```python
class ConnectionConsumer(WebsocketConsumer):
    ...
    def app_response(self, event):
        self.send(text_data=json.dumps({"data": event["data"]}))
```

마지막으로 이렇게 Consumer객체에 POST요청을 받았을 때 어떤 처리를 하면 되는지 작성만 하면 끝 !
