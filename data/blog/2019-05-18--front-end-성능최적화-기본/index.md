---
title: FrontEnd-성능최적화-기본
createdDate: "2019-05-18"
updatedDate: "2019-05-18"
author: Ideveloper
tags:
  - frontend
image: frontend-default.png
draft: false
---

Frontend 성능최적화 기본

## 목차

- 성능측정
  - 브라우저의 렌더링 과정
- 웹페이지 로딩 최적화
  - 최적화 기준: 브라우저
  - 최적화 기준: 사용자
  - 자바스크립트, css 최적화
- 웹페이지 렌더링 최적화
  - dom 조작으로 인한 렌더트리 변경
  - reflow와 repaint
  - layout 최적화

---

### 성능측정

성능측정을 하기위해서는 브라우저의 렌더링과정을 이해하는것이 필요하다!

참고링크 : https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=ko

> `브라우저의 렌더링과정`
> (**파싱 > 스타일 > 레이아웃(리플로우) > 페인트 > 합성 & 렌더**)

#### 1)파싱

- 다운받은 html을 파싱해서 dom 생성 후 트리를 구축 하는것
- dom 트리를 구축하는 것 뿐만 아니라 `<script /> <link /> <img />` 등등 리소스 필요할때는 요청 및 다운로드
- cssom 트리 구축하는 과정도 포함

#### 2) 스타일

![image](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png?hl=ko)

- dom 과 cssom을 매칭해서 렌더트리에 그리는 과정

#### 3) 레이아웃 (reflow)

- 브라우저의 view port 안에서 노드의 위치와 크기 계산하여 렌더트리에 반영하는 과정
- 노드를 순회하면서 계산이 일어남

#### 4) 페인트

- 레이아웃에서 계산된 값을 화면상의 실제 픽셀로 변환하는 과정
- 위치와 관계없는 background-color, color 등등의 css 속성들이 결정되는 과정

#### 5) 합성 & 렌더

- 페인트 된 레이어들을 합쳐 업데이트하는 과정
- css transform도 이과정에 속함

---

### 웹페이지 로딩 최적화

#### 1)**브라우저 관점** 에서의 로딩 최적화

- DOMContentLoaded
  - html ,css 파싱 끝난시점 (렌더트리 구축을 위한 준비 완료 시점)
- Loaded
  - html 상에 모든 리소스가 load 된 시점

브라우저 입장에서는 위의 DOMContentLoaded 와 Loaded 가 빠르면 페이지의 리소스들을 빠르게 준비할수 있다는 것을 말하므로 최적화가 되었다고 말할수 있음

#### 2)**사용자 관점** 에서의 로딩 최적화

위의 리소스 로딩시간은 사용자의 기기성능이나 네트워크 조건에 따라 다를 수 있음

`따라서 사용자의 중심적인 성능 측정항목을 파악해야 한다!`

참고링크 : (사용자 중심적인 성능 측정항목) - https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics?hl=ko

##### 사용자중심 측정항목 지표

- **작동되는 걸까?** -> 탐색이 성공적으로 시작되었나? 서버가 응답했나?
- **유용한가?** -> 충분한 양의 콘텐츠가 렌더링되어 사용자가 이에 참여할 수 있는가?
- **사용할 수 있나?** -> 사용자가 페이지와 상호작용할 수 있나? 아니면 여전히 로딩 중인가?
- **즐거운가?** -> 상호작용이 매끄럽고 자연스러우며, 지연이나 쟁크 현상(jank)이 없나?

  - jank 현상이란? : 일반적으로 디스플레이는 1초에 화면을 60번 그린다. 짧게 60fps(frame per second)라는 표현으로 대체할 수 있다.디스플레이가 1초에 60번 바뀌는데 웹페이지가 1초에 10번 그려진다면, 버벅이는 현상이 발생한다. 우리는 이런 현상을 Jank라고 부른다.

위에 해당하는 질문의 해답을 찾기 이전에 필요한 개념들

##### FP

- First Paint
- 브라우저가 탐색 전에 화면에 있던것과 시각적으로 다른 어떤것이든 렌더링 할때의 지점

##### FCP

- First Contentful Paint
- 브라우저가 DOM 콘텐츠를 처음 렌더링할때의 지점 (텍스트, 이미지, svg ..)

##### FMP

- First Meaningful Paint
- 주요콘텐츠가 (히어로 요소) 화면에 보여지는 시점
- 주요 컨텐츠를 노출하는 css, js가 호출됨

##### TTI

- 애플리케이션이 시각적으로 렌더링 되었으며, 사용자 입려에 안정적으로 반응 할수 있는 지점
- TTI를 세분화 하면 FI와 CI로 나눌수 있음
  - FI : 대부분의 UI가 움직이는 시점
  - CI : 최소한 메인스레드가 50ms내에 컨트롤을 확보해 부드러운 반응 가능한 시점

![image](https://developers.google.com/web/fundamentals/performance/images/perf-metrics-load-timeline.png?hl=ko)

##### 위의 지표들과 사용자측정항목과의 mapping

- **작동되는 걸까?** -> 첫번째 페인트(FP) / 첫번째 콘텐츠가 있는 페인트(FCP)
- **유용한가?** -> 첫번째 페인트(FMP) / 히어로 요소 타이밍
- **사용할 수 있나?** -> TTI (상호작용 시간)
- **즐거운가?** -> 장기 작업

##### 사용자 기준에서 최적화를 빠르게 할수 있는 방법

- lazy loading: FI, CI 향상
- server side rendering : FMP 향상

#### 3)자바스크립트, css 최적화

##### CSS 최적화

- CSS -> 렌더링을 blocking 하는요소
  - 초기 렌더링을 하기위해 렌더트리를 구축하는데에는 DOM 트리와 CSSOM트리가 모두 필요함
  - DOM 트리는 순차적으로 구성이 가능하지만 CSSOM 트리는 전체를 해석해야 가능함 (cascading)
    - `cascading` ? 요소는 하나 이상의 CSS 선언에 영향을 받을 수 있다. 이때 충돌을 피하기 위해 CSS 적용 우선순위가 필요한데 이를 캐스캐이딩(Cascading Order)이라고 한다.
- 최적화
  - css는 항상 최상단 head 영역에 배치해야 한다
  - 경우에 따라 css를 HTML에 인라인으로 포함시킨다. (네트워크 요청수를 줄이기 위해)

##### 자바스크립트 최적화

- 자바스크립트는 -> parsing을 blocking resource 요소이다.
  - js는 dom과 cssom을 동적으로 변경할 수 있다.
  - html 파싱과정에서 자바스크립트를 만나면 스크립트 실행이 완료될때까지 dom트리 생성이 중단된다.
- 최적화

  - 자바스크립트는 항상 문서의 하단에 배치한다

  ```javascript
  <body>
    <div>...</div>
    <script src="example.js" type="text/javascript" />
  </body>
  ```

  - 초기 렌더링에 쓰이지 않는 스크립트는 `defer` , `async` 속성을 명시해서 blocking을 방지한다.

  ![image](https://www.growingwiththeweb.com/images/2014/02/26/legend.svg)

  - 일반적인 `<script>` 태그로 js 실행시
    ![image](https://www.growingwiththeweb.com/images/2014/02/26/script.svg)
  - `<script async>` 로 js 실행시
    ![image](https://www.growingwiththeweb.com/images/2014/02/26/script-async.svg)
  - `<script defer>` 로 js 실행시
    ![image](https://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg)

- `link rel preload` 사용 하기
  - 글꼴이라던지, 초기렌더링 전에 반드시 불러와야하는 중요한 css나 js 파일을 미리 불러온다
  - 참고 : https://developers.google.com/web/fundamentals/performance/resource-prioritization?hl=ko
  ```javascript
    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">
  ```

---

### 웹페이지 렌더링 최적화

- dom 조작으로 렌더트리 변경
- reflow와 repaint
- 레이아웃 최적화

#### 1)DOM 조작으로 인한 렌더트리 변경

- js 코드로 동적으로 html 요소의 스타일이나 css 클래스를 변경시킴
  - render tree는 dom tree와 cssom tree를 맵핑시켜 만들어지므로 위에서 코드로 이를 변경시킴으로 인해 다시 레이아웃을 구축해야 하는 상황 발생

#### 2)reflow와 repaint

- reflow
  - 모든 엘리먼트의 위치나 길이, 크기 등등을 다시 계산하는 과정
  - 상위 엘리먼트를 변경시키면 하위 엘리먼트에도 영향을 끼침
  - render tree를 재생성하므로 부하가 큼
  - 레이아웃에 영향을 줌
- repaint
  - 레이아웃에 영향을 주지않지만 눈에 보이는 요소들(background-color, color, visibility,..)이 변경됨
  - reflow 보다는 부하가 크지는 않음

##### reflow가 일어나는 상황

- dom을 추가하거나 삭제할때
- css 속성중 높이, 넓이, 위치 에 영향을 주는 속성값을 변경할때
  - `height`,`width`,`left`,`top`,`font-size` 등등

```html
<div id="example" style="background:black;width:100px;">
  reflow
</div>
```

```javascript
const example = document.getElementById("example");
example.style.width = "400px";
```

##### repaint가 일어나는 상황

- css 속성중 높이, 넓이, 위치등에 영향을 주지않는 속성을 변경할때
- background-color,color,visibility 등등

```html
<div id="example" style="background:black;width:100px;">
  repaint
</div>
```

```javascript
const example = document.getElementById("example");
example.style.backgroundColor = "red";
```

#### 3)레이아웃 최적화

- css 규칙(ex: 복잡한 selector)을 최소화 한다
  - 계산을 줄이기 위해
- dom 깊이 최소화
  - dom tree 탐색 시간을 줄이기 위해
- 가능한 최하위 요소의 스타일을 변경
  - 상단 dom 노드를 변경하면 하위노드에 영향을 끼치기 때문
- 영향 받는 엘리먼트 제한하기
  - position `fixed`, `absolute` 활용해 영향 받는 엘리먼트 제한
