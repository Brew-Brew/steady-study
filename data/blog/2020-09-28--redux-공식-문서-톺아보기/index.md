---
title: redux 공식 문서 톺아보기
createdDate: '2020-09-28'
updatedDate: '2020-10-22'
author: Ideveloper
tags:
  - react
  - redux
  - frontend
image: welcoming.png
draft: false
---

## 시작하기에 앞서

익숙한 듯 redux를 사용하긴 하지만, 선뜻 redux가 왜나오게 되었고 또 어떠한 원리를 통해 동작하고 또 어떠한 설계를 통해 이루어졌는지는 얘기하지 못하고 있는것 같아, 공식문서를 한번 톺아보기로 했다.
또 이러한 글들을 읽어보며, 추가로 필요한 개념들을 정리해보았다.

## redux 의 motivation

<https://redux.js.org/understanding/thinking-in-redux/motivation#motivation> 참고

일단 redux라는 라이브러리가 어떻게 나오게 되었는지 그 배경에 대해서 공식문서를 통해 알아보자.
우선, 이전에 비해 우리의 코드는 많은 `상태`를 관리해야만 했고, 이러한 `상태`라는 것은 서버의 응답과 캐시된 데이터, 서버에 종속적이지 않은 로컬상에 만들어진 데이터들을 포함한다고 공식문서는 설명하고 있다.

또한 특정한 모델이 다른 모델을 업데이트가 가능하게 하면, 즉 어떠한 뷰가 한 모델을 업데이트하고 또 그 모델이 다른 모델을 업데이트해 다른 뷰가 업데이트 하게 된다면 **개발자는 상태를 언제, 어떻게 그리고 왜 업데이트 하는지에 대한 제어권을 잃어버리게 된다**고 설명하였다.

그리고 프론트엔드에서의 복잡성은 두가지 개념을 함께 다룰때 발생하는 것이라 하였고,**변화(mutation)와 비동기성(asynchronocity)**이 그 두가지 요인이라고 소개했다. 둘이 엮이면 아주 복잡해지고 어려운 상황이 발생한다고 하여 그 둘을 `멘토스와 콜라`라고 비유하기도 했다.ㅎㅎ

**이러한 복잡성 떄문**에, 리액트는 뷰 레이어에서의 이러한 문제를 풀려고 비동기성과 직접적인 DOM 조작을 제거하는등의 시도를 했다고 소개하고 있다. **그중 리액트는 어떻게 비동기성을 제거했을까?**가 궁금하여 검색을 해보았는데 [이러한](https://stackoverflow.com/a/40891474)답변이 달려있었고 이는 아래와 같다.

즉, 설계단에서 비동기적인 동작은 뷰레이어에서 하지않게 했고, render 메소드에서 비동기적인 어떠한 행동이든 할수 없게 만든것이다.

`It removes asynchronous behavior from the view layer by design. You must not do async stuff in render or what is rendered will be broken.`

그러나 뷰레이어는 그렇다치고, 상태를 조작하는것은 우리에게 달려있고, 이러한 상태관리측면에서 비동기적인 작업이 나오게 될수 있으므로 redux가 나오게 되었다고 소개하고 있었다.

또 **Flux, CQRS, Event Sourcing**의 단계들을 따라서, **몇가지 원칙(그 제한들은 우리가 잘 알고있는 redux의 세가지 원칙인것이다.)**등을 강제해 예측가능한 상태변화를 가능하게 했다고 하였다. 그러나 이러한 개념들이 어떻게 녹아들었는지는 의문이었다. flux는 개념을 이미 많이 접했지만 그외 다른것들(CQRS, Event Sourcing)은 프론트개발과 연관지었을때 생소한 개념이긴했고 이름정도만 들었기 때문이다.

redux에서의 **CQRS**를 알기 위해 아래 포스팅을 읽어보았다. CQRS와 이벤트 소싱의 개념은 아주 밀접한 관련이 있었는데 CQRS 시스템을 구현할때 모든 명령들은 event들로 모델링 되어있다고 한다. 또한 이러한 점때문에 event sourcing으로 불리기도 한다고 한다.
<https://medium.com/@swazza85/understanding-redux-as-a-cqrs-system-177526aa4671>

**(아래 그림을 보면 redux를 사용할때의 익숙한 개념들이 많이 등장한다.)**
![image](https://miro.medium.com/max/1490/1*cHMLE1mqIzMTtsSIfSTU-w.png)

그리고 아래는 CQRS를 구현한 코드인데 redux 코드와 상당히 많은 부분이 닮아있었다. 위 첨부한 글에서도 counter 함수는 redux의 reducer와 유사한 성격을띄고, commands 배열은 모든 reducer의 배열들이 되는것이다.

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

이를 통해 redux가 CQRS 개념을 차용한것을 알 수 있었다.

그렇다면 다시 돌아와서 이러한 개념들이 예측가능한 상태변화를 어떻게 만들었는지 생각해보자.

## Redux의 세가지 원칙

<https://redux.js.org/understanding/thinking-in-redux/three-principles> 참고

**1.Single source of truth**

많이들 알고 있는 global state는 하나의 store에만 존재해야 한다는 원칙이다. 이로인해 debug도 쉬워지고 빠른 개발이 가능해졌다고 한다.

**2.State is read-only**

상태를 바꾸는 방법은 state를 직접 건드리는게 아니라 오직 action을 emit하는것 뿐이라는 원칙이다. 또한 모든 변화들이 중앙집권화 되어있고, 엄격한 순서대로 진행되며 미묘한 다른 변경사항들을 볼 필요가 없어진것이다. 또한 action은 일반적인 object의 형태이므로 로깅될수 있고, serialize 될수 있고 저장되고 다시 디버깅이나 테스트를 위해 replay 시킬수도 있다고 한다. (당연하게 redux debugger로 보고있던것들을 다시한번 고찰하게되었다.)

**3.Changes are made with pure functions**

순수함수로 변화가 이뤄져야 한다는 것이다. 리듀서들은 이전 상태와 액션을 가지고 있고, 새로운 상태를 반환하게 된다.

## Redux History and Design

다양한 기술들과 패턴이 redux에는 혼합되어있다고 한다.

### flux

`같은점`

flux와 같이 리덕스는 특정레이어에 모델 업데이트 로직을 집중시켜주게 해주었다고 하였고, flux에서는 store에, redux에서는 reducer에 라고하였다.

`다른점`

flux와 다르게 리덕스는 dispatcher의 컨셉을 가지고 있지 않다.
Unlike Flux, Redux does not have the concept of a Dispatcher
이 부분이 조금 의아했다. 이것은 event emitter대신 순수 함수에 의존해서 그렇다고는 하는데.. 읽고 바로 이해되지는 않았다.

flux와 다르게 redux는 data를 변화시키지 않는다고 추정한다. (항상 새로운 object 반환)
Another important difference from Flux is that Redux assumes you never mutate your data
=> You should always return a new object, which is easy with the object spread operator proposal, or with a library like Immutable.

(이부분 자세히 해석)

Moreover it doesn't seem like immutability poses performance problems in most real apps, because, as Om demonstrates, even if you lose out on object allocation, you still win by avoiding expensive re-renders and re-calculations, as you know exactly what changed thanks to reducer purity.

<https://stackoverflow.com/a/37532497> 관련글 (더 찾아보기)

### redux의 reducer가 순수함수여야하는 이유 더 조사

순수함수

-   동일한 인자가 주어졌을 때 항상 동일한 결과를 반환하는 것을 말한고, 함수 내의 변수 외에 외부의 값을 참조, 의존하거나 변경하지 않아야 한다.

<https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts#L203> 를 보면 object를 단순히 비교함(주소값)

리덕스는 두 객체(prevState,newState)의 메모리 위치를 비교하여 이전 객체가 새 객체와
동일한지 여부를 단순 체크한다. 만약 리듀서 내부에서 이전 객체의 속성을 변경하면 새 상태 와 이전 상태가 모두 동일한 객체를 가리킨다. 그렇게 되면 리덕스는 아무것도 변경되지 않았다고 판단하여 동작하지 않는다.

````javascript
        let hasChanged = false
        const nextState: StateFromReducersMapObject<typeof reducers> = {}
        for (let i = 0; i < finalReducerKeys.length; i++) {
          const key = finalReducerKeys[i]
          const reducer = finalReducers[key]
          const previousStateForKey = state[key]
          const nextStateForKey = reducer(previousStateForKey, action)
          if (typeof nextStateForKey === 'undefined') {
            const errorMessage = getUndefinedStateErrorMessage(key, action)
            throw new Error(errorMessage)
          }
          nextState[key] = nextStateForKey
          ```
          hasChanged = hasChanged || nextStateForKey !== previousStateForKey
          ```
        }

        hasChanged =
          hasChanged || finalReducerKeys.length !== Object.keys(state).length

        return hasChanged ? nextState : state
      }
````

<https://velog.io/@kimu2370/redux%EC%9D%98-reducer%EA%B0%80-%EC%88%9C%EC%88%98%ED%95%A8%EC%88%98%EC%9D%B8-%EC%9D%B4%EC%9C%A0>
