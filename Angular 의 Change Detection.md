# Angular의 Change Detection

---

## Change Detection 이란?

> **Change Detection**은 애플리케이션 **상태(state) 변경을 추적**하고 이러한 업데이트된 상태를 화면에 렌더링 하도록 설계한 메커니즘이다. 이는 사용자 인터페이스가 항상 내부 상태와 동기화 되도록 한다.

여기서의 포인트 => `변경추적` & `렌더링`

### 렌더링

- 어떤 애플리케이션이던 렌더링 프로세스는 프로그램 내부 상태를 파악하고, 화면에서 이를 볼 수 있도록 한다.
- 웹 개발에서 객체나 배열 같은 데이터 구조를 가지고 있고, 이를 이미지, 버튼 등 기타 시각적인 요소의 형태로 해당 데이터의 DOM을 표현하게 된다.
- 시간이 지남에 따라 변하는 데이터를 표시하기 시작하면 상황은 훨씬 더 정교함을 요구하게 된다. 오늘날의 웹 애플리케이션은 상호작용한다.
- 즉, 애플리케이션의 상태는 사용자의 상호작용의 결과로 언제든지 변경 될 수 있다.
- `상태변화`는 이것을 감지해야 하며 이러한 변화를 반영

---

## Change Detection 구현

- 컴파일러가 템플릿을 분석하면 DOM 요소와 관련된 property를 식별한다. 여기서 연결된 구성마다 컴파일러는 일종의 명령의 형태로 바인딩을 만든다.
- 바인딩은 앵귤러에서 변화를 감지하는 핵심요소다. 컴포넌트의 속성과 DOM 요소 속성 사이에 연관관계를 정의한다.
- 이렇게 바인딩이 만들어지면 앵귤러는 더 이상 템플릿과 함께 동작하지 않는다. 변경 감지 메커니즘은 바인딩을 처리하는 명령을 실행한다. 이러한 작업은 속성이 있는 표현식의 값이 변경되었는지 확인하고 필요한 경우 DOM 업데이트를 수행한다.
- 더티체크를 수행하고, DOM의 관련된 부분을 업데이트 하는 바인딩을 처리하는 것이 앵귤러의 Change Detection의 핵심 작업이다.

---

## 언제 Change Detection이 실행될까?

- React의 경우 setState를 이용해 state 변경을 감지한 후 가상 DOM과 비교해 렌더링에 반영한다.
- 하지만 Angular의 경우 이와는 다르게 두가지 옵션이 있다.

- Angular에서는 changeDetector 서비스를 활용해서 수동으로 트리거할 수 있다.

```javascript
class RatingWidget {
  constructor(changeDetector) {
    this.cd = changeDetector;
  }

  handleClick(event) {
    this.rating = Number(event.target.dataset.value);
    this.cd.detectChanges();
  }
}
```

- 하지만 프레임워크에서 자동으로 Change Detection을 하게 할 수 있다. 여기에서는 단순히 `property` 를 업데이트 해야한다.

```js
class RatingWidget {
  handleClick(event) {
    this.rating = Number(event.target.dataset.value);
  }
}
```

- 하지만 Angular에서는 어떻게 change detection을 실행해야 한다는 것을 알까?
- 앵귤러가 제공하는 메커니즘을 활용하여, 템플릿의 UI 이벤트에 바인딩하기 때문에 모든 UI 이벤트리스너에 대해 알 수 있다.
- 이러한 이벤트 리스너를 가로챈다는 것은 애플리케이션 코드 실행이 끝난 후 변경 탐지 실행을 스케줄링할 수 있다는 것을 의미한다. 이것은 기발한 아이디어 일 수 있으나 이 메커니즘으로 모든 비동기 이벤트를 가로챌 수는 없다.
- `setTimeout`이나 `XHR`과 같은 이벤트에 앵귤러 메커니즘을 바인딩할 수 없으므로 Change Detection이 자동으로 이루어질 수 없다. 이러한 문제를 해결하기 위해 zone.js라는 라이브러리를 사용한다. 브라우저의 모든 비동기 이벤트를 패치한 다음, 특정 이벤트가 발생할 때 앵귤러에 알릴 수 있다.
- UI이벤트와 마찬가지로 앵귤러는 애플리케이션의 실행이 완료될 때까지 기다렸다가 자동으로 변경을 탐지할 수 있다.

---

### 참고

[참고 - yceffort](https://yceffort.kr/2020/07/change-detection-in-angular-react)
