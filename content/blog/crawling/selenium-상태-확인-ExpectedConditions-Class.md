---
title: selenium 상태 확인 ExpectedConditions Class
date: 2022-08-27 23:08:99
category: crawling
thumbnail: { ./images/selenium_logo.jpg }
draft: false
---

요즘 대부분의 웹 사이트들은 데이터들을 동적으로 받아와서 화면에 뿌려줍니다.

그래서 웹 사이트가 데이터를 받아오기까지 시간이 필요한데, 흔히 selenium으로 웹 크롤링을 진행 하면서 이런 로딩 시간 때문에 에러가 많이 발생하곤 합니다.

> ⚠️ NoSuchElementException

이런 문제를 해결하기 위해 selenium에선 WebDriverWait이라는 모듈을 통해 로딩을 대기하는 방법을 제공해주고 있습니다.

<https://selenium-python.readthedocs.io/waits.html>

👆️ 공식 문서 참조!

---

WebDriverWait에선 크게 두 가지의 대기 방법을 제공하고 있는데,

1. Explicit Waits (명시적 대기)와
2. Implicit Waits (암시적? 대기)인데, 이 둘의 차이점에 대해선 많이 알려져 있으니,

이 글에선 Explicit Waits에서 사용되는 expected_conditions에 대해서 소개를 해보려고 합니다.

expected_conditions는 특정 element가 어떤 상태를 가지는 것?에 대한 함수입니다. 이 함수를 이용하면 찾고자하는 element가 지정한 condition이 됐다는 것을 알 수 있습니다.

먼저, 아래 내용을 코드에 추가하면 import를 할 수 있습니다. (Python3 기준)

```python
from selenium.webdriver.support import expected_conditions as EC
```

```python
wait = WebDriverWait(driver, 10)
element = wait.until(EC.element_to_be_clickable((By.ID, 'someid')))
```

그리고 이렇게 함수를 실행하는데, webDriverWait()에는 webdriver와 최대 대기 시간(초)가 인자로 들어가고, until()에는 expected_conditions객체가, EC.element_to_clickable()이 어떤 상태를 가리키는 함수인데, 흔히 속성이름과 값이 튜플 형태로 들어갑니다.

By는 속성을 참조할 때 사용하는데,

```python
from selenium.webdriver.common.by import By
```

이걸 import하면 사용할 수 있습니다.

---

```python
alert_is_present()
```

alert의 유무를 체크합니다.

<br>

```python
all_of_expected_conditions(*expected_conditions)
```

파라미터로 ExpectedConditions 객체를 가변인자로 넣으면 여러 상태를 동시에 체크할 수 있습니다.  
AND 연산자와 비슷합니다.

<br>

```python
any_of_expected_conditions(*expected_conditions)
```

파라미터로 ExpectedConditions 객체를 가변인자로 넣으면 여러 상태 중 하나만 True일때 True를 반환합니다.  
 OR 연산자와 비슷합니다.

<br>

```python
element_attribute_to_include(locator, attribute_)
```

해당 attribute\_의 속성이 locator에 포함되어 있는지 체크합니다.

<br>

```python
title_is(title)
```

페이지 제목을 확인하기 위한 함수입니다. 인자로 들어간 제목과 현재 페이지 제목이 같다면True를, 아니라면 False를 반환합니다.

<br>

```python
title_contains(title)
```

페이지 제목을 확인하는데, 대/소문자를 구분합니다. 같으면 true, 다르면 false

<br>

```python
presence_of_element_located(locator)
```

locator로 들어간 element가 DOM에 있는지 확인합니다. element가 존재하면 true, 없다면 false

<br>

```python
presence_of_all_elements_located(locator)
```

locator로 들어간 element가 하나 이상 존재하는지 확인하고, 찾는 element들을 리스트로 반환합니다.

<br>

```python
visibility_of(locator)
```

locator로 들어간 element가 보이는지 확인합니다. DOM에는 있지만 hidden등의 속성 값으로 보이지 않는 element들을 체크하는데 사용합니다.  
해당 element가 보인다면 True, 그렇지 않다면 False를 반환합니다.

> ⚠️주의! width나 height 등의 속성값이 0이 돼서 보이지 않는 element들 또한 보이지 않는 것으로 취급 (visibility~~ 함수들 모두 해당)

<br>

```python
visibility_of_element_located(locator)
```

locator로 들어간 element가 보이는지 체크하고, DOM에도 있는지 체크합니다.

<br>

```python
invisibility_of_element_located(locator)
```

locator로 들어간 element가 보이지 않다면 true를 반환, 보인다면 false를 반환합니다.
