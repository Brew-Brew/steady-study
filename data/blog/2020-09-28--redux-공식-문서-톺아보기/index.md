---
title: redux 공식 문서 톺아보기
createdDate: '2020-09-28'
updatedDate: '2020-10-13'
author: Ideveloper
tags:
  - react
  - redux
  - frontend
image: welcoming.png
draft: false
---

## redux 의 motivation

<https://redux.js.org/understanding/thinking-in-redux/motivation#motivation> 참고

일단 redux라는 라이브러리가 어떻게 나오게 되었는지 그 배경에 대해서 공식문서를 통해 알아보자.

우선, 이전에 비해 우리의 코드는 많은 상태를 관리해야만 했다. 이러한 상태라는 것은 서버의 응답과 캐시된 데이터, 서버에 종속적이지 않은 로컬상에 만들어진 데이터들을 포함한다.

또한 특정한 모델이 다른 모델을 업데이트가 가능하게 하면, 즉 어떠한 뷰가 한 모델을 업데이트하고 또 그 모델이 다른 모델을 업데이트해 다른 뷰가 업데이트 하게 된다면 **개발자는 상태를 언제, 어떻게 그리고 왜 업데이트 하는지에 대한 제어권을 잃어버리게 된다.**

또 이러한 복잡성은 두가지 개념을 함께 다루고 있어 발생하는 것이라 하였고, 변화와 비동기성(mutation , asynchronocity)이 그 두가지 요인이라고 소개했다. 또 그 둘을 멘토스와 콜라라고 소개하기도 했다.

따라서, 리액트는 뷰 레이어에서의 이러한 문제를 풀려고 비동기적인 행동과 DOM 조작을 제거하는등의 시도를 했다. 그러나 역시 상태를 조작하는것은 우리에게 달려있고 이포인트에서 redux가 나오게 되었다고 소개하고 있다.

또 Flux, CQRS, Event Sourcing의 단계들을 따른다고 나와있었는데 이러한 개념들이 어떻게 녹아들었는지는 의문이었다. flux는 개념을 이미 많이 접했지만 그외 다른것들은 이름정도만 들었기 때문이다.

그리고 마지막으로 강조한것은 **redux는 상태의 변화를 몇가지 제한을 두어 예측가능하게 하였다고 한다.**

그 제한들은 우리가 잘 알고있는 redux의 세가지 원칙인것이다.

redux에서의 CQRS를 알기 위해 아래 포스팅을 읽어보았다. CQRS 시스템을 구현할때 모든 명령들은 event들로 모델링 되어있다고 한다. 또한 이러한 점때문에 event sourcing으로 불리기도 한다고 한다.
<https://medium.com/@swazza85/understanding-redux-as-a-cqrs-system-177526aa4671>

![image](https://miro.medium.com/max/1490/1*cHMLE1mqIzMTtsSIfSTU-w.png)

그리고 아래는 CQRS를 구현한 코드인데 redux 코드와 상당히 많은 부분이 닮아있었다. 위 첨부한 글에서도 counter 함수는 redux의 reducer와 commands 배열은 모든 reducer의 배열들이 되는것이다.

```javascript
let store = {
  counter: 0,
};
const increment = { type: "INCREMENT" };
const decrement = { type: "DECREMENT" };
let counter = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
  }
};
let commands = [counter];
let dispatch = (action) => {
  commands.reduce((intermediateStore, command) => {
    let storeFragment = store[command.name];
    store[command.name] = command(storeFragment, action);
    return store;
  }, store);
};
dispatch(increment);
dispatch(increment);
dispatch(decrement);
console.log(store);
// assert.equals(store.count, 1)
// try it out on the babel repl
```

이를 통해 redux가 CQRS 개념을 차용한것을 알 수 있다.

## redux의 세가지 원칙

<https://redux.js.org/understanding/thinking-in-redux/three-principles> 참고

**1.Single source of truth**

많이들 알고 있는 global state는 하나의 store에만 존재해야 한다는 원칙이다. 이로인해 debug도 쉬워지고 빠른 개발이 가능해졌다고 한다.

**2.State is read-only**
상태를 바꾸는 방법은 오직 action을 emit하는것 뿐이라는 원칙이다. 또한 모든 변화드리 중앙집권화 되어있고, 엄격한 순서대로 진행되며 미묘한 다른 변경사항들을 볼 필요가 없어진것이다. 또한 action은 일반적인 object의 형태이므로 로깅될수 있고, serialize 될수 있고 저장되고 다시 디버깅이나 테스트를 위해 replay 시킬수도 있다고 한다.

**3.Changes are made with pure functions**

순수함수로 변확가 이뤄져야 한다는 것이다. 리듀서들은 이전 상태와 액션을 가지고 있고, 새로운 상태를 반환하게 된다.

## History and Design

다양한 기술들과 패턴이 redux에는 혼합되어있다고 한다.

### flux

`같은점`
Like Flux, Redux prescribes that you concentrate your model update logic in a certain layer of your application (“stores” in Flux, “reducers” in Redux)

`다른점`
Unlike Flux, Redux does not have the concept of a Dispatcher
이 부분이 조금 의아했다. 액션을 디스패치 하는 부분이 존재하지 않는가..? 이것은 event emitter때신 순수 함수에 의존해서 그렇다고는 하는데.. 읽고 바로 이해되지는 않았다.

Another important difference from Flux is that Redux assumes you never mutate your data
=> You should always return a new object, which is easy with the object spread operator proposal, or with a library like Immutable.

Moreover it doesn't seem like immutability poses performance problems in most real apps, because, as Om demonstrates, even if you lose out on object allocation, you still win by avoiding expensive re-renders and re-calculations, as you know exactly what changed thanks to reducer purity.

<https://stackoverflow.com/a/37532497> 관련글 (더 찾아보기)
