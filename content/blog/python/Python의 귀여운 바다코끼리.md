---
title: Python의 귀여운 바다코끼리
date: 2022-12-17 18:35:00
category: python
thumbnail: { thumbnailSrc }
draft: false
---

## :=

Python 3.8 PEP 572버전에서 새롭게 등장한 바다코끼리 연산자라는것을 발견했습니다.

:= 요렇게 생긴 친구인데, 파이썬 공식 문서에 따르면

> "There is new syntax := that assigns values to variables as part of a larger expression."

표현식의 일부로 변수에 값을 할당할 수 있다고 합니다. 그런데 생긴게 꼭 바다코끼리의 눈과 엄니를 닮아서 the walrus operator 라고 부른다고 하네요! 😍  
![바다코끼리](https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pacific_Walrus_-_Bull_%288247646168%29.jpg/1920px-Pacific_Walrus_-_Bull_%288247646168%29.jpg)

---

### 사용법

마트에 가서 우유를 하나 사오는 심부름을 받았는데, 아보카도가 있으면 아보카도의 개수만큼 우유를 사오라는 추가 주문을 받은 상황을 가정 해보겠습니다.

```python
abocado_count = check_abocado_count()
if abocado_count:
    cart += milk * abocado_count
else:
    cart += milk
```

요런 느낌으로 프로그램을 만들 수 있겠죠?? 지금도 충분히 간단한 코드지만 := 이 녀석을 사용하면 조금 더 코드를 간결하게 만드실 수 있습니다.

```python
if abocado_count := check_abocado_count():
    cart += milk * abocado_count
else:
    cart += milk
```

˗ˋˏ 와 ˎˊ˗ 코드가 한 줄 줄어들었어요...

이렇게 간단한 코드에선 별 의미 없다고 생각 하실 순 있지만, 파이썬 표준 라이브러리에서 copy.py의 예제를 한 번 볼까요?

_기존 코드_

```python
reductor = dispatch_table.get(cls)
if reductor:
    rv = reductor(x)
else:
    reductor = getattr(x, "__reduce_ex__", None)
    if reductor:
        rv = reductor(4)
    else:
        reductor = getattr(x, "__reduce__", None)
        if reductor:
            rv = reductor()
        else:
            raise Error(
                "un(deep)copyable object of type %s" % cls)
```

_개선된 코드_

```python
if reductor := dispatch_table.get(cls):
    rv = reductor(x)
elif reductor := getattr(x, "__reduce_ex__", None):
    rv = reductor(4)
elif reductor := getattr(x, "__reduce__", None):
    rv = reductor()
else:
    raise Error("un(deep)copyable object of type %s" % cls)
```

˗ˋˏ 와 ˎˊ˗ 코드가 훨씬 깔끔하고 정돈된 느낌을 주지 않나요??  
이렇게 귀엽고 예쁘게 코드를 작성할 수 있는만큼 주의해야할 사항도 많이 있는데요,

---

### 더 자세한 사용법 및 주의사항

코드의 모호함을 피하기 위해 :=가 허용되지 않는 부분들이 있습니다.  
먼저, 부모의 크기가 정해지지 않았을땐 변수 할당, 함수 파라미터, lambda 함수 등에서 사용이 불가능합니다.

```python
y := f(x)  # INVALID
(y := f(x))  # Valid이지만 추천되진 않음


def foo(answer = p := 42):  # INVALID
    ...
def foo(answer=(p := 42)):  # Valid이지만 추천되진 않음
    ...


(lambda: x := 1) # INVALID
lambda: (x := 1) # Valid이지만 추천되진 않음
(x := lambda: 1) # Valid
lambda line: (m := re.match(pattern, line)) and m.group(1) # Valid
```

그리고 f-string 내부에선 괄호를 꼭 사용 해야합니다.

```python
>>> f'{(x:=10)}'  # Valid, uses assignment expression
'10'
```

자세한 내용은 [공식 문서의 Exceptional cases](https://peps.python.org/pep-0572/#exceptional-cases) 부분을 확인 해보세요 !

또한 중요한 것은 바다코끼리는 표현식이기 때문에 기본 할당문과는 차이점이 있습니다.  
기본적인 다중 값 할당이나 튜플 할당에도 차이가 있으니 주의해서 사용을 해주셔야 합니다.

```python
x = y = z = 0
z := y := x := 0 # INVALID
(z := (y := (z := 0))) # Valid
```

```python
x = 1, 2
print(x) # (1, 2)
(x := 1, 2)
print(x) # 1
```

---

### 표준 라이브러리 예제

#### site.py

_기존 코드_

```python
env_base = os.environ.get("PYTHONUSERBASE", None)
if env_base:
    return env_base
```

_개선된 코드_

```python
if env_base := os.environ.get("PYTHONUSERBASE", None):
    return env_base
```

#### datetime.py

_기존 코드_

```python
s = _format_time(self._hour, self._minute,
                 self._second, self._microsecond,
                 timespec)
tz = self._tzstr()
if tz:
    s += tz
return s
```

_개선된 코드_

```python
s = _format_time(self._hour, self._minute,
                 self._second, self._microsecond,
                 timespec)
if tz := self._tzstr():
    s += tz
return s
```

#### sysconfig.py

_기존 코드_

```python
while True:
    line = fp.readline()
    if not line:
        break
    m = define_rx.match(line)
    if m:
        n, v = m.group(1, 2)
        try:
            v = int(v)
        except ValueError:
            pass
        vars[n] = v
    else:
        m = undef_rx.match(line)
        if m:
            vars[m.group(1)] = 0
```

_개선된 코드_

```python
while line := fp.readline():
    if m := define_rx.match(line):
        n, v = m.group(1, 2)
        try:
            v = int(v)
        except ValueError:
            pass
        vars[n] = v
    elif m := undef_rx.match(line):
        vars[m.group(1)] = 0
```

---

### 끝

이렇게 바다코끼리에 대해 알아보았는데 무려 4년 가까이 지난 업데이트인데도 아직까지 다양한 곳에서 사용되고 있지는 않은 것 같습니다.  
코드를 조금 더 간결하게 만들어줄 수 있고 무엇보다 귀여우니까 앞으로 자주 사용하게 될 것 같습니다 ㅎㅎㅎ😍
