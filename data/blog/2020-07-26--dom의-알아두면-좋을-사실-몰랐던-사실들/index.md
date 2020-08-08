---
title: DOM의 알아두면 좋을 사실들 / 몰랐던 사실들
createdDate: "2020-07-26"
updatedDate: "2020-07-26"
author: Ideveloper
tags:
  - frontend
image: dom2.png
draft: false
---

### 시작하며

우리는 dom의 메서드나 속성에 대해서 잘알지 못하거나 애매하게 알고있다. react나 vue angular 혹은 이전엔 jquery의 도움을 받아 웹 개발을 했었기 때문이다. 때문에 dom에 대해 면밀히 파악해 볼겸 **"DOM을 깨우치다"** 를 읽어보며 헷갈릴만한 부분들을 정리해본다.

### 1. Node? Element..?같은말인가..?!

여러가지의 노드들로 구성되어 있다 여러가지 엘리먼트들로 구성되어있다~~ 이런식으로 말을 많이 한다.

결론만 말하면 **element는 노드의 하위개념이다.**

- DOM 트리의 각 노드 개체들은 Node로부터 속성과 메서드를 상속 받는다.
- Object < Node < Element < HTMLElement

**DOM과 Node**

브라우저는 HTML코드를 해석해서 트리 형태로 구조화된 Node들을 가지고 있는 문서(DOM)을 생성한다.

DOM은 자바스크립트 **Node개체**의 계층화된 트리이다.

![image](https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/module/904/2242.png)

- 그림 :https://opentutorials.org/course/1375/6698 참고

위 그림에서도 알 수 있듯이, 노드는 엘리먼트의 상위 개념이다. Element는 Node개체로부터 상속받은 하위 노드 개체이다. 그리고 Element 이외의 다른 개체들은 아래 표와 같이 볼 수 있다.

| 개체             |       node type        |                                        example |
| :--------------- | :--------------------: | ---------------------------------------------: |
| HTML \*Element   |      ELEMENT_NODE      |                                   `<body> <a>` |
| Text             |       TEXT_NODE        | 줄바꿈과 공백 포함한 html문서 내의 텍스트 문자 |
| Attr             |     ATTRIBUTE_NODE     |                                   class="test" |
| HTMLDocument     |     DOCUMENT_NODE      |                                window.document |
| DocumentFragment | DOCUMENT_FRAGMENT_NODE |              document.createDocumentFragment() |
| DocumentType     |   DOCUMENT_TYPE_NODE   |                              `<!DOCTYPE html>` |

### 2. Element 노드 및 Text 노드 생성하기

브라우저는 문서 초기 load시 html 문서 기반으로 노드 생성하긴 하나 아래와 같이 document 메서드를 사용해 직접 노드생성을 해주거나, 문자열을 하여 생성 해주는 방법이 있다.

`document 메서드 사용`

- createElement()
  - document.createElement('div')
- createTextNode()
  - document.createElement('hi')

또한 아래와 같이 문자열을 삽입 해서도 가능하다.

`문자열을 사용하여 DOM에 엘리먼트 및 텍스트 노드 생성 및 추가`

- innerHTML

  - innerHTML은 무겁고 비싼 대가를 치르는 HTML 파서를 호출하므로 innerHTML 계열의 사용을 삼가해야 한다고 한다.
  - [Why is "element.innerHTML+=" bad code?](https://stackoverflow.com/a/11515395)

- outerHTML

  - outerHTML은 특정 노드 바깥 혹은 그위(바깥쪽)의 엘리먼트를 명시하는것 같은데 실질적으로는 그 노드를 나타낸다.

- textContext
  - document.getElementById('id1').textContent = 'ideveloper';
- insertAdjacentHTML()

  - insertAdjacentHTML 세밀하게 다룰수 있음 시작태그의 뒤와 앞, 종료 태그앞, 종료태그뒤에 삽입 가능 (ex: 엘리먼트.insertAdjacentHTML('beforebegin' or 'beforeend' or 'aftoerbegin' or 'afterend' , '<span>asdasd</span>'))
  - innerHTML보다 더 빠르다고 함.이미 사용중인 element 는 다시 파싱하지 않는다. 그러므로 element 안에 존재하는 element를 건드리지 않는다. (innerHtml은 과 좀 다름). innerHtml보다 작업이 덜 드므로 빠르다.
  - [Element.insertAdjacentHTML() 에 관한 mozilla 링크](https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)

### 3. innerHTML과 appendChild의 차이

위 두개가 헷갈렸는데 아래와 같은 차이점이 있다.

- **innerHTML** 은 요소 안의 모든 태그들이 교체되는 것이고

- **appendChild** 는 요소 안의 태그들은 그대로 두고 맨 뒤에 추가되는 것이다.

### 4. removeChild 및 replaceChild 를 사용하여 노드 제거 / 바꾸기

```jsx
var divA = document.getElementById("A");
divA.parentNode.removeChild(divA);

var divA = document.getElementById("A");
var newSapn = document.createElement("span");
divA.parentNode.replaceChild(newSpan, divA);
```

제거하거나 바꾸는 대상이 무엇인지에 따라 innerHTML, outerHTML, textContent속성에 빈 문자열을 주는것이 더 쉽고 빠를수도 있다. 하지만 존재하지 않는 요소에 값을 할당하지 않는것이므로, 브라우저의 **메모리 누수**가 발생할수 있으므로 조심해야 한다고 한다.

- 최근엔 remove사용가능 ([DOM4](https://dom.spec.whatwg.org/))

### 5. HTMLCollection 과 NodeList (유사 배열)

HTMLCollection과 NodeList는 유사배열이라는 공통점이 있지만 생성하는 메서드도 다르며 조금씩 차이는 있다.

**HTMLCollection**

- document.scripts
- document.body.children
- document.getElementsByTagName
- document.getElementsByClassName

위 메서드들로 생성 가능

**NodeList**

- document.querySelectorAll
- element.childNodes

`element.childNodes` 프로퍼티나 `document.querySelectorAll` 메서드로 반환되는 노드의 모음이다. `NodeList`도 유사 배열인데, `forEach` 메서드는 가지고 있다. 하지만 [browser support](https://caniuse.com/#feat=mdn-api_nodelist_foreach)는 확인이 필요하다. 또 다른 이용 가능한 메서드에는 `entries()`, `keys()`, `values()`가 있다.

- [Why doesn't nodelist have forEach? (forEach 지원 시작시기 관련)](https://stackoverflow.com/a/39133264)

- [NodeList.prototype.forEach() 애 관한 모질라 링크](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)

**유사배열에서 배열메소드 사용하기**

```jsx
Array.prototype.forEach.call(nodeList, function(node) {
  // Your code here.
});
```

`map`, `filter` 등의 메서드를 유사배열에서 사용하려면 위에서 언급한 방법을 이용해 배열로 바꿔주어야 한다.

### 6. 문서내에서 포커스를 가지고 있거나 활성상태인 노드에 대한 참조 혹은 판별

문서내에서 포커스를 가지고 있거나 활성상태인 노드에 대한 참조

- window.document.activeElement

문서 혹은 문서 내의 특정 노드가 포커스를 가지고 있는지 판별하기

- document.hasFocus()

```jsx
setInterval(function() {
  console.log(document.hasFocus());
}, 1000);
```

### 7. Element 선택 / Element NodeList 선택

- element 하나 선택
  - querySelector
  - getElementById
- element 노드리스트 선택
  - querySelectorAll (라이브 상태의 노드리스트 반환 x , 정적인 nodelist)

### 8. scrollIntoView() 사용하여 element를 view로 스크롤

- 스크롤이 가능한 노드 내에 있는 노드를 선택하면. scrollIntoView 활용하면 선택된 노드가 view로 스크롤되게 가능함. true는 optional함.
- false를 주면 element의 bottom으로 스크롤 됨.true는 element의 top

```jsx
document.querySelector("content").children[4].scrollIntoView(true);
```

- [관련 js fiddle 예제 ](https://jsfiddle.net/r4fcdok7/)

### 9. 스타일을 가져오는 속성

- getComputedStyle()
- .style

getComputedStyle 은 element의 계산된 스타일 (계층화된것을 포함한 실제스타일)을 가져옴

- 즉 인라인으로 입힌 스타일 style태그안에서 입힌 스타일시트,외부에서 불러온 스타일 시트 등등이 모두 최종 적용된 스타일
- .style은 개별 인라인 스타일을 가져오는것

아래 예제에서 볼수 있음.

- [관련 jsfiddle 예제](https://jsfiddle.net/5w069134/)

### 10 .텍스트 노드

- 공백과 줄바꿈 역시 텍스트 노드로 변환된다.
- 따라서 html문서를 최소화 하거나 압축하지 않는한 상당수의 공백과 줄바꿈 text 노드를 가지게 되는것이다.
