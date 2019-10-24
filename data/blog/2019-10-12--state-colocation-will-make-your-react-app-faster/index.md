---
title: State Colocation will make your react app faster
createdDate: '2019-10-12'
updatedDate: '2019-10-24'
author: Ideveloper
tags:
  - react
image: react_app_faster.png
draft: false
---

![image](https://kentcdodds.com/static/e6c884bb612a2f39f6e2fad83e93c4d7/5d855/banner.webp)

Photo by [Samuel Zeller](https://unsplash.com/photos/j0g8taxHZa0)

> 원 글은 <https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster> 입니다.

State Colocation(공존)이 여러분의 app을 유지하기쉽게 뿐만 아니라 빠르게 만들어 주는 방법.

리액트 application을 느리게 만드는 원인중 주요한 것 중 하나는 전역 state 이고, 특별하게는 급변하는 상태들입니다. 이것을 설명하기 위해 제가 작은 예시를 꾸며낸것을 이해해주세요, 그리고 저는 조금 더 현실적인 예시를 드리고 여러분은 어떻게 실용적으로 당신의 앱에 적용될수 있을지 결정할 수 있을것입니다.

![10월-25-2019 00-38-41](https://user-images.githubusercontent.com/26598542/67501788-d4bf3d00-f6bf-11e9-84ee-a7a02c0fceb1.gif)

여기 그 예시 코드가 있습니다.
```javascript
function sleep(time) {
  const done = Date.now() + time;
  while (done > Date.now()) {
    // sleep...
  }
}
// slow component가 많은 데이터떄문에 render가 느린 상황을 상상해보세요 (예를들어)
function SlowComponent({ time, onChange }) {
  sleep(time);
  return (
    <div>
      Wow, that was{" "}
      <input
        value={time}
        type="number"
        onChange={e => onChange(Number(e.target.value))}
      />
      ms slow
    </div>
  );
}
function DogName({ time, dog, onChange }) {
  return (
    <div>
      <label htmlFor="dog">Dog Name</label>
      <br />
      <input id="dog" value={dog} onChange={e => onChange(e.target.value)} />
      <p>{dog ? `${dog}'s favorite number is ${time}.` : "enter a dog name"}</p>
    </div>
  );
}
function App() {
  // 이것은 "global state"입니다.
  const [dog, setDog] = React.useState("");
  const [time, setTime] = React.useState(200);
  return (
    <div>
      <DogName time={time} dog={dog} onChange={setDog} />
      <SlowComponent time={time} onChange={setTime} />
    </div>
  );
}
```

잠시 play를 해본다면, 당신은 주요한 성능문제가 input field에 있다는것을 알아차릴 것입니다. 성능을 향상 시킬수 있는 방법에는 `DogName` 그리고 `SlowComponent` 에도 있습니다. 우리는 비용의 탈출구로 `react.memo`를 사용할수 있고, 느리게 render되는 우리의 codebase에 적용할 수 있습니다. 하지만 다른 solution을 제안합니다.

만약 [Colocation](https://kentcdodds.com/blog/colocation) 에 대해 이미 읽지 않았다면, 저는 읽어볼것을 추천드립니다. colocation을 알게되면 application의 지속가능성을 향상시킵니다, 몇몇 state를 colocate 시켜봅시다. `time` state가 App 안의 모든 component에서 사용되는 것을 볼 수 있고, 이것이 왜 App으로 [올라갔는지(lifted)](https://reactjs.org/docs/lifting-state-up.html)에 대한 이유입니다.
그러나, `dog` state는 하나의 컴포넌트에서만 사용되었고, 따라서 state를 colocate되어야 하는 위치로 옮깁시다. (업데이트 된 부분은 강조되어 있습니다.)

```javascript
function DogName({ time }) {
  // highlight-line
  const [dog, setDog] = React.useState(""); // highlight-line
  return (
    <div>
      <label htmlFor="dog">Dog Name</label>
      <br />
      <input id="dog" value={dog} onChange={e => setDog(e.target.value)} />
      <p>{dog ? `${dog}'s favorite number is ${time}.` : "enter a dog name"}</p>
    </div>
  );
}
function App() {
  // this is "global state"
  const [time, setTime] = React.useState(200);
  return (
    <div>
      <DogName time={time} /> // highlight-line
      <SlowComponent time={time} onChange={setTime} />
    </div>
  );
}
```

그리고, 그 결과입니다:

![10월-25-2019 00-38-46](https://user-images.githubusercontent.com/26598542/67501793-d557d380-f6bf-11e9-96ce-6e7bd05fad11.gif)


와우! dog name input에 타이핑 하는것이 더 좋은 방식이 되었습니다. 그리고 더 나아가, 컴포넌트가 [colocation](https://kentcdodds.com/blog/colocation) 덕분에 더 유지하기 쉬워졌습니다. 하지만, 어떻게 더 빨라졌을까요?

저는 빠르게 만드는 방법중 최고의 방법은 최대한 영향이 가는부분을 최소화 하는것이었습니다. 그것이 바로 지금부터 할 것들 입니다. 우리가 리액트 컴포넌트 트리에서, state를 위로 끌어올릴때, 전체 react tree에서 검증하지 않은 모든 update를 야기합니다. 리액트는 어떤것이 바뀌었는지 모릅니다, 그래서 모든 컴포넌트에서 그들이 dom update를 해야하는지 모두 체크를 해야합니다(특별히 임의적으로 느린 컴포넌트가 없으면 그러한 과정들은 쉽지는 않습니다.) 하지만 만약 당신이 우리가 dog state를 DogName 컴포넌트로 내린것 처럼, state를 아래로 내리면 리액트는 체크할것이 적어집니다. 이것은 SlowComponent를 호출하는것으로 부터 우리를 힘들지 않게 합니다. 왜냐하면 이것은 바뀐 output에 대해 더이상 참조하지 않고 있기 때문에 더이상 관련이 없기 때문입니다.

요약하면, 전에는 우리가 dog name을 바꾸었을때 모든 컴포넌트는 매번 변화(re-render)에 대해 체크해야 했다면, 후에 우리는 `DogName` 컴포넌트에 대해서만 체크하면 되었습니다. 이것은 큰 성능 이득이었습니다! 좋네요!

##### Real World

제가, 이 원리를 현실에서의 애플리케이션에서 본것은 사람들이 모두 global일 필요가 없는 상태들을 모두 global redux store나 global context안에 넣는것을 봤을때 입니다. `DogName` 같은 input들은 위의 예에서, 종종 성능문제가 일어나는것들입니다, 하지만 마우스 상호작용이 많이 있는곳에서도 봤습니다. (테이블 data들이나 그래프에서 tooltip을 보여줄때와 같이)

종종 이러한 문제에서 사람들이 사용하는 해결책은 사용자들의 interaction을 "debounce" 하는것입니다. ( ex) state를 업데이트하기이전에 사용자가 타이핑을 멈추는 것을 기다린다).
이것은 때때로, 우리가 할수있는 최선입니다, 하지만 이것은 사용자 경험의 일부만 최적화하게 됩니다.( 리액트의 곧 나올 concurrent mode는 미래에 이러한 과정이 필요하지 않게 할 것입니다.) [Dan이 이것에 대해 말한 demo를 봐보세요.](https://www.youtube.com/watch?v=nLF0n9SACd4&feature=youtu.be&t=181)

- (번역 외) 참고로 react concurrent mode에 대해서는 제 이전 블로그에 조사한 내용이 있습니다 :) 궁금하신 분들은 참고하셔도 좋을것 같습니다!
  <https://ideveloper2.tistory.com/170>

리액트의 렌더링 성능 향상을 위해 다른 사람들이 쓰는 해결책은 `react.memo` 와 같은 방법을 쓰는 것입니다. 이것은 우리가 앞에서 만들어낸 예제에서는 잘 작동합니다. 왜냐하면 이것은 react에게 우리의 `Slow-component`가 re-rendering을 스킵하게 허락해줍니다, 하지만 더 실제적인 시나리오에서는 , 당신은 종종 느리게 만드는곳이 한곳이 아니라는 것을 의미하는 "능지처참"(death by a thousand cuts) 을 겪게 될것입니다, 따라서 결국 모든곳에 `react.memo` 를 적용시켜야 하게 됩니다. 그리고 그렇게 하고, 당신은 useMemo나 useCallback 같은 것을 모든곳에 사용해야 하게 될 것입니다. (그렇지 않으면 모든 react.memo에 했던 작업들을 되돌려야 할것입니다.) 이러한 최적화들은 함께 문제를 풉니다, 하지만 여러분의 application이 복잡도가 급격히 증가하면 state를 colocating 하는것보다 덜 효과적이게 될것입니다. 왜냐하면 리액트는 여전히 최상단에서 모든 컴포넌트에 이르기까지 모든 컴포넌트에서 리렌더링을 해야할지를 결정해야 하기 떄문입니다. 당신은 이러한 접근(colocate을 고려하지 않고 모든 부분을 찾아 최적화하는)으로 코드를 더더 작성할수록 점점 힘들어 질것입니다.

만약 당신이 조금 더 꾸며내지지 않은 예제를 보고싶으면 [이 codesandbox예제를 살펴보세요.](https://codesandbox.io/s/colocate-state-ts1x9)

##### What is colocated state?

[colocation의 원리](https://kentcdodds.com/blog/colocation) 는 아래와 같습니다:

> 코드를 최대한 그것과 연관있는 곳에 배치 시켜라

따라서, 이것을 성취하기 위해서는, 우리는 `dog` state를 `dogName` 컴포넌트안에 넣었습니다.

```javascript
function DogName({ time }) {
  const [dog, setDog] = React.useState("");
  return (
    <div>
      <label htmlFor="dog">Dog Name</label>
      <br />
      <input id="dog" value={dog} onChange={e => setDog(e.target.value)} />
      <p>{dog ? `${dog}'s favorite number is ${time}.` : "enter a dog name"}</p>
    </div>
  );
}
```

하지만, 만약 그것을 깬다면 어떻게 될까요? 그 state는 어디로 가야할까요? 정답은 같습니다: "코드를 최대한 그것과 연관있는 곳에 배치 시켜라". 그것은 바로 **가장 가까운 부모 컴포넌트** 일것입니다. 그 예로써, `dogName` 컴포넌트를 바꿔 input 태그와 p 태그를 다른 컴포넌트에서 보여주도록 해봅시다.

```javascript
function DogName({ time }) {
  const [dog, setDog] = React.useState("");
  return (
    <div>
      <DogInput dog={dog} onChange={setDog} />
      <DogFavoriteNumberDisplay time={time} dog={dog} />
    </div>
  );
}
function DogInput({ dog, onChange }) {
  return (
    <>
      <label htmlFor="dog">Dog Name</label>
      <br />
      <input id="dog" value={dog} onChange={e => onChange(e.target.value)} />
    </>
  );
}
function DogFavoriteNumberDisplay({ time, dog }) {
  return (
    <p>{dog ? `${dog}'s favorite number is ${time}.` : "enter a dog name"}</p>
  );
}
```

이 케이스에서는 우리가 `DogInput` 컴포넌트로 state를 옮길수 없습니다, 왜냐하면 `DogFavoriteNumberDisplay`는 그 state에 접근이 필요하고, 따라서 우리는 이 두개의 컴포넌트의 최소한의 부모를 찾아 위로 배치시켜야 합니다.

그리고 이것은 state가 여러개의 컴포넌트에 의해 접근되어야 하는 case에도 동일합니다. 당신은 [prop drilling](https://kentcdodds.com/blog/prop-drilling)을 피하기 위해 context안에 넣을수도 있습니다. 하지만 context provider 안의 값들을 관련있는 값들만 넣어주는어야 colocation 관점에서 성능상으로 여전히 이득을 얻을수 있는 방법임을 생각해야 합니다. 이러한 것을 통해, 제가 말하고 싶은건 당신의 context 일부 provider가 application의 react tree의 상단에 위치할수 있지만, 모든 것이 그럴 필요는 없다는 것입니다. 당신은 가장 알맞은곳에 배치시키는것이 좋습니다.

이것은 나의 [리액트의 상태관리](https://kentcdodds.com/blog/application-state-management-with-react) 블로그 글에서 말하는 본질입니다. 당신의 state를 가능하면 그것이 사용되는것과 최대한 가까이 배치시키세요, 그러면 당신은 성능관점에서 아주 큰 이득을 얻을것입니다. 거기서, 성능관점에서 UI interaction만 신경쓰면 될것입니다.

##### What about context or redux?

만약 당신이 [리액트에서 재렌더링을 막는 간단한 속임수](https://kentcdodds.com/blog/optimize-react-re-renders)를 읽었다면, 당신은 실제로 변경하는 state를 사용하는 구성 요소 만 업데이트되도록 할 수 있습니다. 따라서 그런식으로 이 이슈를 회피할 수 있을것 입니다. 만약 이것이 사실이라면, 사람들은 여전히 redux와 성능이슈를 겪고 있을 것입니다. 만약 리액트만의 문제가 아니라면, 무엇일까요? 이문제는 [react-redux는 연결된 컴포넌트들로부터의 불필요한 렌더를 피하게 해주는 가이드라인을 따르길 기대하고 있습니다.](https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-and-performance) 그리고 이것은 우연하게 컴포넌트들을 매우 자주 전역 state가 바뀔때마다 재렌더되도록 하게 합니다. 이 효과는 매우 안좋아지고, 당신의 앱이 커지면 커질수록 , 그리고 특별히 너무 많은 state를 redux에 넣을수록 발생합니다.

운좋게도, 이러한 효과를 줄일수 있는, [mapState 함수를 최적화 하는 memoized된 reselect 셀렉터를 사용하는 방법](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)이 있고, 리덕스의 문서는 [추가적인 리덕스 앱의 성능 향상](https://redux.js.org/faq)을 제공하기도 합니다.

저는 또한 colocation을 통해 redux로 부터 이러한 이익을 얻을수 있다고 말합니다. 단지 리덕스의 전역 state에 들어갈것들을 줄이고, 모든 것들을 colocate시키세요. Redux FAQ에는 [state가 redux안에 들어가야하는지, 컴포넌트안에 그대로 있어야 하는지의 결정을 도와주는 경험법칙이 있습니다.](https://redux.js.org/faq/organizing-state#do-i-have-to-put-all-my-state-into-redux-should-i-ever-use-reacts-setstate)

추가적으로, 만약 도메인별로 state를 분리한다면 (다양한 도메인의 context를 가지는), 그 문제는 더 적게 이야기가 나올것 입니다.

하지만 사실은 당신이 state를 colocate시킨다면, 당신은 이 문제들을 가지지 않을것이고 유지보수성이 향상될것입니다.

##### So how do you decide where to put state?

저는 이러한 결정을 도와주는 decision tree를 만들었습니다.

![image](https://kentcdodds.com/static/d2b50fdb8371e7ec209faacac5363111/35838/where-to-put-state.png)

Chart perfected by [Stephan Meijer](https://twitter.com/meijer_s/status/1176776537322020867)

여기 위의것을 적은것입니다.(screen reader와 친구들을 위해)

`도표와 비교하며 읽으시길 추천드립니다!`

1 app 만들기를 시작하세요. 2로 가세요

2 컴포넌트안에 state를 만드세요 3으로 가세요

3 이것이 **오직** 이 컴포넌트에서만 필요한가요?

- 그런가요? 4로 가세요
- 아닌가요? **오직** 자식 컴포넌트들 중의 하나에서만 필요한가요?
  - 그런가요? 이것을 자식에게 옮기세요 (colocate state). 3으로 가세요
  - 아닌가요? 이것은 부모나 형제컴포넌트에게도 필요한가요?
      - 그런가요? 부모에게 옮기세요 (state를 올리세요) 3으로 가세요
      - 아닌가요? 4로 가세요.

4 거기 놔두세요. 5로 가세요

5 prop drilling 문제가 발생하나요?

- 그런가요? state를 context provider에 넣고 state가 매니지 되는 컴포넌트에 render시키세요. 6으로 가세요
- 아닌가요? 6으로 가세요.

6 app을 끝내세요. 요구사항이 변경되면 1로 가세요.

이것은 당신의 앱을 유지보수하고 리팩토링하는 과정에 있어서 매우 중요한 과정입니다. 왜냐하면 state를 끌어올리는것은 자연스럽게 발생하는 요구사항이고, 당신의 app은 당신이 state를 colocate시키는지 아닌지 상관없이 "작동해야 합니다", 이것을 매우 중요하게 생각해야 하고 당신의 app이 manageable하고 빠르도록 해야합니다.

##### Conclusion

일반적으로, 사람들은 변화함에따라 state를 끌어올리는 것은 잘하지만, 우리는 종종 당신의 codebase에서 state를 colocate시키는 것에 대해서 생각하지 않습니다. 그래서 제가 여러분께 말해주고 싶은것은 state를 colocate시키는것입니다. 당신에게 물어보세요, "정말 modal의 `isOpen` state가 redux안에 있어야 할까?(그 대답은 아마 아니다 입니다.)". 당신의 state를 colocate 시키고, 더 빠르고 간결한 codebase를 찾게 될것입니다. 행운을 빌어요!

