---
title: How Are Function Components Different from Classes? [번역]
createdDate: "2019-03-12"
updatedDate: "2019-03-12"
author: Ideveloper
tags:
  - react
image: howfuncdifcla.png
draft: false
---

> 원문 : https://overreacted.io/how-are-function-components-different-from-classes/
> (리액트의 함수형 컴포넌트는 어떻게 리액트 클래스 컴포넌트와 다른가?)

**본인의 의역이 들어간 부분이 있어, 해석이 잘못된 부분이 있으면 피드백 주시면 감사하겠습니다.**

잠시동안, 정식으로 나온 답변들은 클래스는 (state와 같은) 많은 피쳐들에 접근할수 있게 한다는 것이었습니다. [훅](https://reactjs.org/docs/hooks-intro.html)과 함께면, 더이상 그것은 정답이 될수 없습니다.

아마 여러분들은 그것들중 하나는 성능상 좋다는 점을 들었을 것입니다. 어떤것인가요? 많은 벤치마크들은 [결함](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f?source=your_stories_page---------------------------)이 있습니다, 그래서 저는 [결론을 그려내는것](https://github.com/ryardley/hooks-perf-issues/pull/2)에 주의하고있습니다. 성능은 주요하게 함수형을 선택하는가 클래스형을 선택하는가가 중요한게 아니라 여러분들의 코드가 어떻게 돌아가는지에 더 영향을 받습니다. 우리의 관찰결과, 성능차이는 무시할수 있고, 최적화 전략은 조금은 [다릅니다](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render).

이러한 케이스에서는 다른 이유가 없고, 얼리어답터가 되는걸 꺼려한다면 우리는 당신의 이미 존재하는 컴포넌트를 재작성 하는걸 [추천하지 않습니다.](https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both) 훅은 여전히 새로운것이고, 몇몇 best practice 들은 아직 그들의 tutorial들을 찾지 못했습니다.

그러면 우리는 어떤걸 해야 할까요? 리액트 function 컴포넌트와 클래스 컴포넌트의 근본적인 차이점들이 있나요? 물론입니다. Mental 모델에 있습니다. **이 포스트에선, 저는 가장 큰 그들의 차이점을 볼 것 입니다.** 이것은 2015년에 function 컴포넌트가 소개된 시점부터 존재했던것이나, 종종 간과되곤 합니다.

> 함수형 컴포넌트는 렌더되는 값들을 capture합니다.

이것은 어떤것을 의미하는지 파악해 봅시다.

---

**Note: 이 post는 클래스 혹은 함수 기반 컴포넌트에서의 가치를 판단하는것이 아닙니다. 저는 오직 리액트에서의 두가지 모델을 비교하는것을 묘사하고 싶었습니다. 함수형 컴포넌트를 더 넓게 사용하고 싶은것에 대해 질문이 더 있다면, [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#adoption-strategy)를 참고하세요.**

---

이 컴포넌트를 고려해 봅시다.

```javascript
function ProfilePage(props) {
  const showMessage = () => {
    alert("Followed " + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>Follow</button>;
}
```

이것은 `setTimeout`으로 네트워크 요청이 일어나게 하는 버튼을 보여주고, 확인 alert창을 띄워주게 됩니다. 예를들어, 만약 `props.user`가 `Dan`이면, 이것은 `'Followed Dan'` 을 삼초뒤에 보여주게 됩니다. 이것은 간단합니다.

(위 예에서 arrow function 혹은 선언형 함수를 쓰더라도 큰 문제가 없습니다. `function handleClick()` 또한 같은 방식으로 동작 할 것입니다.)

class 컴포넌트로는 어떻게 작성할까요? 나이브한 해석은 아래와 같을 것입니다.

```javascript
class ProfilePage extends React.Component {
  showMessage = () => {
    alert("Followed " + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

일반적으로 이 두개의 코드 snippet들이 같다고 생각합니다. 사람들은 종종 자유롭게 이러한 패턴들을 그들의 함축성에 대해서 인지하지 않고 리팩토링하곤 합니다.

![image](https://overreacted.io/wtf-1d3c7a341ee3fcadc79df00e7d872e4b.gif)

**그러나, 이 두개의 snippet code들은 미묘하게 다릅니다.** 그들을 면밀히 살펴봐 봅시다. 아직 그들의 다른점을 못 찾았나요? 개인적으로, 그들을 보는것은 제겐 잠시 시간이 걸렸습니다.

이제부터 스포일러가 있습니다. 그래서 여러분 스스로 찾아낼수 있는 [live demo](https://codesandbox.io/s/pjqnl16lm7)가 있습니다. 이 글의 나머지 글들은 어떤점들이 다르고 왜 이러한 일들이 발생했는지 설명해줍니다.

---

우리는 시작하기 전에, 제가 설명하려는 것이 리액트 훅과는 큰 연관이 없다고 강조하고 싶습니다. 위 예제들은 훅을 사용하지 않고 있습니다!

이것은 리액트에서 function과 class의 차이들에 관한 것입니다. 만약 리액트 앱에서 함수형 컴포넌트를 더 많이 사용하려 했다면, 당신은 이해하고 싶어 할것입니다.

---

**우리는 리액트 애플리케이션에서 공통적으로 있는 버그들의 다른점들을 시각화해 설명해 볼것입니다.**

이 [example sandbox](https://codesandbox.io/s/pjqnl16lm7)를 열고, 최근 선택된 select 박스와 두개의 `ProfilePage`가 주입되어 있고 - 각각 Follow 버튼을 렌더링 하고 있는 것을 볼수 있습니다.

각각의 버튼들과 함께 이 동작들을 연속해서 해보세요.

1. Follow 버튼들중 하나를 **클릭합니다.**
2. 3초가 지나기 전에 선택된 profile을 **바꿉니다.**
3. alert text를 **읽습니다.**

당신은 특별한 다른점을 알아차리게 될것입니다.

- `ProfilePage` function 컴포넌트는, Dan의 프로필에서 follow를 클릭하고, 소피로 이동하면 여전히 `Followed Dan` 이라는 알림창을 띄우게 될 것입니다.

- `ProfilePage` class 기반 컴포넌트는, Dan의 프로필에서 follow를 클릭하고, 소피로 이동하면 `Followed Sophie` 라는 알림창을 띄우게 될 것입니다.

![image](https://overreacted.io/bug-386a449110202d5140d67336a0ade5a0.gif)

---

이 예제에서는, 첫번째 행동이 옳은 것입니다. **만약 제가 한명을 follow하고 다른 사람의 프로필을 간다면, 제 컴포넌트는 제가 어떤 사람을 follow 했는지 혼동되지 말아야 합니다.** 이것은 클래스 컴포넌트는 명확히 오류가 있다는것을 말합니다.

(당신은 전적으로 [소피를 follow](https://mobile.twitter.com/sophiebits) 해야만 하는것입니다.)

---

그러면 우리의 클래스 컴포넌트 기반의 예제는 왜 그렇게 동작 했을까요?

`showMessage` 함수를 class 컴포넌트의 메서드에서 깊게 확인해봅시다.

```javascript
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user); //highlight-line
  };
```

이 클래스의 메소드는 `this.props.user`에서 읽습니다. prop들은 리액트에서 불변성을 가지고, 따라서 그들은 바뀔수 없습니다. 그러나, `this`는 항상 변해왔습니다.

진정으로, `this`의 전체 목적은 클래스 기반 컴포넌트에 있습니다. 리액트는 시간이 지나면 스스로 변하고 따라서, render와 주기함수에서 최신의 버전을 읽을수 있습니다.

그래서 만약 우리의 컴포넌트는 요청이 일어나면 다시 렌더링 됩니다, `this.props`가 바뀌면서요. `showMessage` 의 메소드는 `user` 를 새로운 `props`에서 받아오게 됩니다.

이것은 유저 인터페이스의 본질에 관한 흥미로운 관찰을 이끌어 냅니다. 만약 우리가 UI가 개념적으로 현재 application의 상태라고 말한다면, **이벤트 핸들러는 render 결과의 한 부분입니다. - 시각적 결과와 같이요.** 우리들의 이벤트 핸들러는 특정 prop과 state가 속해 있는 특정 render에 속하게 됩니다.

그러나, this.props의 콜백을 읽는 timeout을 스케쥴링하는것은 그 연관을 무너트립니다. 우리의 `showMessage` callback은 어느 특정 render에 묶여 있지 않습니다, 그리고 이것은 올바른 props 를 잃어 버리게 됩니다. 그 연결로 부터 받아온 `this`로 부터 읽게 되는것입니다.

---

**함수형 컴포넌트가 존재 하지 않는다고 해봅시다.** 어떻게 우리는 문제를 해결할 수 있을까요?

우리는 어떻게든 올바른 prop으로 하는 `렌더`와 그들을 읽는 `showMessage` callback의 연결을 고치고 싶을 것입니다.

이것을 할 수 있는 방법은 `this.props`를 이른 시점에서 읽는것입니다. 그리고 명백히 그것들을 timeout completion handler에게 전달하는 것입니다.

```javascript
class ProfilePage extends React.Component {
  //highlight-start
  showMessage = user => {
    //highlight-end
    alert("Followed " + user);
  };

  handleClick = () => {
    const { user } = this.props; //highlight-line
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

이것은 [제대로 동작합니다.](https://codesandbox.io/s/3q737pw8lq) 그러나, 이 접근 방식은 코드를 매우 중요하게, 에러가 많이 발생하고 이것저것 신경쓸게 많아지게 만듭니다. 만약 우리가 하나의 prop대신 여러개의 prop이 필요한 상황에서는 어떻게 될까요? 만약 우리가 state에 접근해야한다면 어떨까요? **만약 `showMessage` 가 다른 method를 부르게 되면, 그 메소드는 `this.props.something` 혹은 `this.state.something` 을 읽게 되고, 우리는 또다시 똑같은 문제에 직면하게 됩니다.**우리는 그래서 showMessage로 부터 불린 모든 메소드들에게 `this.props`와 `this.state`를 넘겨줘야 하게 됩니다.

이렇게 하면 클래스에 의해 제공되는 쉽게 알아들을 수 있는 것들을 잃어버리게 됩니다. 이것은 또한 기억하거나 강제하기가 어려워서, 사람들이 종종 버그들과 맞딱드리게 됩니다.

유사하게, alert 코드를 handleClick에 inline으로 넣는 것은 큰 문제에 해답을 주지 않습니다. 우리는 코드를 많은 메소드들로 분리하기를 원하고, 그 함수를 부르는 것과 관련된 render에서 정확한 prop과 state들을 읽는것을 원합니다.
**이 문제점은 React에 국한된 문제점이 아닙니다 - 당신은 다시 어떠한 UI 라이브러리에서 변하는 형태의 data들을 object에 넣을때 `this`를 사용하면 다시 발생시킬수 있습니다.**

아마도, 우리는 메소드들을 constructor상에서 bind 할수 있지 않나요?

```javascript
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    //highlight-start
    this.showMessage = this.showMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //highlight-end
  }

  showMessage() {
    alert("Followed " + this.props.user);
  }

  handleClick() {
    setTimeout(this.showMessage, 3000);
  }

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

아니요, 이것은 아무것도 고치지 못합니다. 기억하세요, 문제는 `this.props`가 늦게 읽혀 지는 것입니다. - 우리가 사용하는 syntax에 있는 것이 아닙니다. **그러나, 이 문제는 우리가 자바스크립트의 클로져에 완벽히 의존한다면, 이문제점은 사라지게 될 것입니다.**

클로져는 시간이 지남에 따라 값이 변해지는 값들을 생각하기 매우 [어렵기](https://wsvincent.com/javascript-closure-settimeout-for-loop/) 때문에 종종 피합니다. 하지만 리액트에선, prop과 state는 변하지않습니다! (최소한, 이것은 강하게 추천됩니다) 그것은 클로저의 주요한 발걸음을 제거합니다.

이것은 당신이 특정 렌더에서 prop과 state에 가까이 하고 있다면, 당신은 언제나 같게 유지할수 있다는것을 의미합니다.

```javascript
class ProfilePage extends React.Component {
  render() {
    //highlight-start
    // Capture the props!
    const props = this.props;
    //highlight-end

    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      //highlight-start
      alert("Followed " + props.user);
      //highlight-end
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

**당신은 렌더되는 시점에 prop들을 "capture" 한것입니다.**

![image](https://overreacted.io/pokemon-fa483dd5699aac1350c57591770a49be.gif)

이 방식으로 된 모든 코드들은 (`showMessage` 를 포함하여) 특정 렌더에 prop들을 보는것을 보장합니다. 리액트는 더이상 어려움을 제공하지 않습니다.

---

이 예제는 옳지만 이상하게 보입니다. 클래스 메소드를 사용하는 대신 render가 들어있는 function으로 정의하는것은 어떠한 특징을 가지나요?

진정으로, 우리는 class에 있는 여러 것들을 제거 함으로써 코드를 간단히 만들수 있습니다.

```javascript
function ProfilePage(props) {
  const showMessage = () => {
    alert("Followed " + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>Follow</button>;
}
```

위와 같이, props 들은 여천히 capture 되어 있습니다. - 리액트는 그들을 argument로 제공합니다. **`this`와 달리, `props` 객체는 리액트에 의해 절대로 변하지 않게 됩니다.**

이것은 function definition 상에서 `props` 를 destructure 한다면 매우 분명해집니다.

```javascript
//highlight-start
function ProfilePage({ user }) {
  //highlight-end
  const showMessage = () => {
    alert("Followed " + user); //highlight-line
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>Follow</button>;
}
```

만약 부모 컴포넌트에서 `ProfilePage`를 다른 props들과 함께 render 한다면, 리액트는 `ProfilePage` 함수를 다시한번 부르게 됩니다. 그러나 이미 우리가 이미 클릭한 이벤트 핸들러는 예전 렌더에 속해 있게 되고, 이것의 user value를 showMessage에서 이것을 읽게 됩니다. 그들은 그대로 남아있게 됩니다.

따라서, function 버전인 [이 데모](https://codesandbox.io/s/pjqnl16lm7)에서, Sophie의 프로필에서 Follow를 클릭하고, Sunil로 바꿀때 alert는 'Followed Sophie'라고 뜨는 것입니다.

![image](https://overreacted.io/fix-84396c4b3982827bead96912a947904e.gif)

이 behavior는 옳은 것입니다. (비록 당신이 Sunil을 follow하길 원할때에도요)

---

이제는 우리는 리액트에서의 클래스와 함수형에서의 큰 차이를 한번 이해해봅시다.

> Function component들은 render된 value들을 capture 합니다.

Hook과 함께면, 우리는 동일한 원리를 state에 적용 시킬수 있게 됩니다. 이 예제를 살펴봅시다:

```javascript
function MessageThread() {
  const [message, setMessage] = useState("");

  const showMessage = () => {
    alert("You said: " + message);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = e => {
    setMessage(e.target.value);
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
```

(여기 [라이브 데모](https://codesandbox.io/s/93m5mz9w24)가 있습니다.)

이것은 매우 좋지않은 메시지 앱 UI이더라도, 우리는 같은 점을 설명할것입니다: 만약 특정한 메시지를 보낸다면, 우리의 컴포넌트는 보내진 메시지들에 대해서 혼동되지 않을 것입니다. 이러한 function 컴포넌트의 메시지는 브라우저에 의해 불리게 된 클릭핸들러에 의해 리턴된 렌더에 종속된 스테이트를 캡쳐하게 됩니다. 그래서 메시지는 send를 클릭했을때 input에 있었던 input으로 message가 set 되는것입니다.

---

그래서 우리는 리액트에 있는 함수형 컴포넌트들은 props와 state를 기본으로 캡쳐한다고 알고있습니다. **하지만 우리가 특정 렌더에 종속되지 않은 최신 prop과 state를 읽기를 원한다면 어떡할까요?** 만약 우리가 그들을 [나중에 읽고싶다면요?](https://dev.to/scastiel/react-hooks-get-the-current-state-back-to-the-future-3op2)

클래스 컴포넌트에서는, 당신은 `this.props`나 `this.state`에서 읽을 것입니다. 왜냐하면 `this`는 그자체로 변경되기 때문입니다. 리액트는 그것을 변경 시킵니다. 함수형 컴포넌트에서는, 당신은 여전히 변하는 값들을 가지게 되고 모든 컴포넌트의 렌더에서 공유되게 됩니다. 이것은 ref라고 불리게 됩니다.

```javascript
function MyComponent() {
  const ref = useRef(null);
  // You can read or write `ref.current`.
  // ...
}
```

그러나, 당신은 이것들을 관리해야 할것입니다.

ref는 instance field와 [같은 역할을 하게 됩니다.](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) 이것은 변하는 피할수 없는 세상으로 부터의 탈출구 입니다. 당신은 아마 "DOM refs" 와 익숙할것입니다. 하지만 그 개념은 매우 일반적입니다. 이것은 단지 어떤것을 집어 넣을수있는 box입니다.

시각적으로는, `this.something` 은 `something.current` 와 똑같이 보입니다. 그들은 같은 개념을 나타내고 있습니다.

기본적으로, 리액트는 함수형 컴포넌트에서 최신 props 그리고 state를 가지는 refs를 만들지 않습니다. 많은 케이스들에서 당신은 필요하지 않게 됩니다. 그리고 그들을 할당하는것은 낭비가 되는 일 일것입니다. 그러나, 당신은 이렇게 추적할수 있게 됩니다.:

```javascript
function MessageThread() {
  const [message, setMessage] = useState(''); //highlight-line
  const latestMessage = useRef('');

  const showMessage = () => {
    alert('You said: ' + latestMessage.current); //highlight-line
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    latestMessage.current = e.target.value; //highlight-line
  };
```

만약 우리는 `message`를 showMessage에서 읽는다면, 우리는 send button을 눌렀을때 메시지를 볼것입니다. 하지만 우리가 `latestMessage.current` 를 읽는 다면, 우리는 최신 value를 얻게 될것입니다. -- 만약 버튼을 누른뒤 계속 타이핑을 하더라도 말입니다.

당신은 이두가지 [데모를](https://codesandbox.io/s/93m5mz9w24) 비교 할 수 있게 됩니다. ref는 렌더링의 일관성을 opt out하는 방법입니다, 그리고 특별한 케이스에서는 매우 쉽습니다.

일반적으로, 당신은 렌더링동안에 ref를 읽거나 세팅하는것을 피해야만합니다. 왜냐하면 그것들은 변하기 때문입니다. 우리는 렌더링을 예상가능하게 놔두고 싶어합니다. **그러나, 만약 우리가 특정 prop이나 state의 최신값을 얻는것을 원한다면, ref를 업데이트하는것은 매우 화나게 할수 있습니다.** 우리는 이펙트를 활용해 조정하게 됩니다.

```javascript
function MessageThread() {
  const [message, setMessage] = useState('');

  //highlight-start
  // Keep track of the latest value.
  const latestMessage = useRef('');
  useEffect(() => {
    latestMessage.current = message;
  });
  //highlight-end

  const showMessage = () => {
    alert('You said: ' + latestMessage.current);//highlight-line
  };
```

(여기 그 [데모](https://codesandbox.io/s/yqmnz7xy8x)가 있습니다)

우리는 effect안에서 할당을 하고 ref 값은 dom이 업데이트 되면 변하게 됩니다. 이것은 우리의 변화가 interruptible한 렌더링에 의존하고 있는 [Time Slicing과 Suspense](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) 와 같은 feature들을 무너뜨리지 않게 됩니다.

이것과 같이 ref를 사용하는것은 자주 필요하지는 않습니다. **prop과 state를 캡쳐하는것이 더 좋은 default 입니다.** 그러나, 이것은 Imperative API들과 같은 interval 그리고 subscriptions 와 함께 할때 매우 손쉬워 집니다. 이것과 같은 값들을 추적할수 있다는것을 기억하세요 - prop그리고 state, 그리고 전체 props 객체들, 그리고 심지어 함수들

이러한 패턴은 최적화에도 매우 손쉬워지게 됩니다. - 예를들어 `useCallback` identity가 종종 바뀔때 말이죠. 그러나 [reducer를 사용하는것](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)은 종종 [좋은 해답이 됩니다.](https://github.com/ryardley/hooks-perf-issues/pull/3) (나중의 블로그 포스팅 주제입니다.!)

---

이 포스트에서는, 우리는 클래스에서 종종 무너지는 패턴에 대해서 살펴봤습니다. 그리고 어떻게 클로져 패턴이 이것을 고치는지 살펴봤습니다. 그러나, 당신은 훅을 array의 디펜던시를 구체화하여 최적화 하려고 할때, 당신은 안좋은 버그에 맞닥뜨리게 될것입니다. 이것은 클로져는 문제가 있는것을 말할까요? 전 아니라고 생각합니다.

우리가 위에서 봤듯이, 클로져는 미묘한 문제들을 해결해주고 인지하기 어려운 문제들을 해결해 줍니다. 유사하게, [Concurrent mode](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)에서 동작하는 코드들을 매우 쉽게 만들어줍니다. 이것은 컴포넌트 안에 있는 로직들이 prop과 state들을 렌더상에서 정확히 보여주게 되기 때문에 가능하게 만듭니다.

모든 케이스들에서, **좋지않은 클로져들"의 문제점들은 "변하지않는 함수", "props는 언제나 같다" 라는 점들을 잘못 사용한 것입니다.** 이 case가 아니더라도, 저는 이 포스트가 명확하게 도움이 되길 원합니다.

함수들은 그들의 prop과 state에 가까이 다가가 있습니다. - 그리고 그들의 identity는 매우 중요합니다. 이것은 버그가 아닙니다, 그리고 function 컴포넌트의 특징입니다. 예를들어 함수형 컴포넌트는 useEffect 혹은 useCallback을 위한 "dependencies array" 로 부터 제외시키지 말아야 합니다. (옳게 고치면, 대개 useReducer나 useRef 같은 것들의 해답입니다 - 우리는 곧 어떻게 그것들을 선택할지 보게 될것입니다.)

우리가 대다수의 리액트 코드를 function 기반으로 작성할때, 우리는 직관을 코드를 [최적화 하는것](https://github.com/ryardley/hooks-perf-issues/pull/3) 그리고 [시간에 따라 어떠한 값들이 변하게 되는지](https://github.com/facebook/react/issues/14920)에 대해 조정해야 할것입니다.

[fredrik이 말한것과 같이](https://mobile.twitter.com/EphemeralCircle/status/1099095063223812096),

> 내가 찾은 훅을 사용할때 정신적으로 가져야 하는 규칙은 시간에 따라 값들이 어떻게 코드상에서 변하는지 아는것이다.

함수형 컴포넌트들은 이 룰에 대해서 예외가 아닙니다. 이것은 리액트에서의 것들을 배울때 기본이 되는 지식일것입니다. 이것은 클래스컴포넌트에서의 마음가짐으로 부터 조금 조정이 필요합니다. 하지만 이 아티클들은 새로운 눈으로 바라볼수 있도록 도와주게 될것입니다.

리액트의 함수형은 언제나 그들의 값들을 capture할것입니다 - 그리고 이제 우리는 그 이유를 알게 되었습니다.

![image](https://overreacted.io/pikachu-fc3bddf6d4ca14bc77917ac0cfad3608.gif)
