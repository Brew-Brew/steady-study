---
title: How Are Function Components Different from Classes?
createdDate: '2019-03-12'
updatedDate: '2019-03-12'
author: Ideveloper
tags:
  - react
image: welcoming.png
draft: false
---

리액트의 함수형 컴포넌트는 어떻게 리액트 클래스 컴포넌트와 다른가?

잠시동안, 정식으로 나온 답변들은 클래스는 (state와 같은) 많은 피쳐들에 접근할수 있게 한다는 것이었습니다. 훅과 함께면, 더이상 그것은 정답이 될수 없습니다.

아마 여러분들은 그것들중 하나는 성능상 좋다는 점을 들었을 것입니다. 어떤것인가요? 많은 벤치마크들은 결함이 있습니다, 그래서 저는 결론을 그려내는것에 주의하고있습니다. 성능은 주요하게 함수형을 선택하는가 클래스형을 선택하는가가 중요한게 아니라 여러분들의 코드가 어떻게 돌아가는지에 더 영향을 받습니다. 우리의 관찰결과, 성능차이는 무시할수 있고, 최적화 전략은 조금은 다릅니다.

이러한 케이스에서는 다른 이유가 없고, 얼리어답터가 되는걸 꺼려한다면 우리는 당신의 이미 존재하는 컴포넌트를 재작성 하는걸 추천하지 않습니다. 훅은 여전히 새로운것이고, 몇몇 best practice 들은 아직 그들의 tutorial들을 찾지 못했습니다.

그러면 우리는 어떤걸 해야 할까요? 리액트 function 컴포넌트와 클래스 컴포넌트의 근본적인 차이점들이 있나요? 물론입니다. Mental 모델에 있습니다. 이 포스트에선, 저는 가장 큰 그들의 차이점을 볼 것 입니다. 이것은2015년에 function 컴포넌트가 소개된 시점부터 존재했던것이나, 종종 간과되곤 합니다.

> 함수형 컴포넌트는 렌더되는 값들을 capture합니다.

이것은 어떤것을 의미하는지 파악해 봅시다.

---

Note: 이 post는 클래스 혹은 함수 기반 컴포넌트에서의 가치를 판단하는것이 아닙니다. 저는 오직 리액트에서의 두가지 모델을 비교하는것을 묘사하고 싶었습니다.

---

이 컴포넌트를 고려해 봅시다.

```javascript
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>Follow</button>;
}
```

이것은 `setTimeout`으로 네트워크 요청이 일어나게 하는 버튼을 보여주고, 확인 alert창을 띄워주게 됩니다. 예를들어, 만약 `props.user`가 `Dan`이면, 이것은 `Followed Dan` 을 삼초뒤에 보여주게 됩니다. 이것은 충분히 간단합니다.

(위 예에서 arrow function과 선언형 함수를 쓰더라도 큰 문제가 없습니다. `function handleClick()` 또한 같은 방식으로 동작 할 것입니다.)

class 컴포넌트로는 어떻게 작성할까요? 나이브한 해석은 아래와 같을 것입니다.

```javascript
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

이것은 일반적으로 이 두개의 코드 snippet들이 같다고 생각합니다. 사람들은 종종 자유롭게 이러한 패턴들을 그들의 함축성에 대해서 인지하지 않고 리팩토링하곤 합니다.

//gif 파일

그러나, 이 두개의 snippet code들은 미묘하게 다릅니다. 그들을 면밀히 살펴봐 봅시다. 아직 그들의 다른점을 못 찾았나요? 개인적으로, 그들을 보는것은 제겐 잠시 시간이 걸렸습니다.

이제부터 스포일러가 있습니다. 그래서 여러분 스스로 찾아낼수 있는 `live demo`가 있습니다. 이 글의 나머지 글들은 어떤점들이 다르고 왜 이러한 일들이 발생했는지 설명해줍니다.

---

우리는 리액트 애플리케이션에서 공통적으로 있는 버그들의 다른점들을 시각화해 설명해 볼것입니다.

이 example sandbox를 열고, 최근 선택된 select 박스와 두개의 `ProfilePage`가 위에서 주입되어 있고 각각 Follow 버튼을 렌더링 하고 있는 것을 볼수 있습니다.

각각의 버튼들에 이 동작들을 연속해서 해보세요.

1. Follow 버튼들중 하나를 **클릭합니다.**
2. 3초가 지난뒤에 선택된 profile을 **바꿉니다.**
3. alert text를 **읽습니다.**

당신은 특별한 다른점을 알아차리게 될것입니다.

- `ProfilePage` function 컴포넌트는, Dan의 프로필에서 follow를 클릭하고, 소피로 이동하면 여전히 `Followed Dan` 이라는 알림창을 띄우게 될 것입니다.

- `ProfilePage` class 기반 컴포넌트는, Dan의 프로필에서 follow를 클릭하고, 소피로 이동하면 `Followed Sophie` 라는 알림창을 띄우게 될 것입니다.

(당신은 전적으로 소피를 follow 하는것입니다.)

그러면 우리의 클래스 컴포넌트 기반의 예제는 왜 그렇게 동작 했을까요?

showMessage함수를 class 컴포넌트의 메서드에서 깊게 확인해봅시다.

```javascript
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user); //highlight
  };
```

이 클래스의 메소드는 `this.props.user`에서 읽습니다. prop들은 리액트에서 불변성을 가지고, 따라서 그들은 바뀔수 없습니다. 그러나, 이것은, 항상 변해왔습니다.

진정으로, 이것의 전체 목적은 클래스 기반 컴포넌트에 있습니다. 리액트는 시간이 지나면 스스로 변하고 따라서, render와 주기함수에서 최신의 버전을 읽을수 있습니다.

그래서 만약 우리의 컴포넌트는 요청이 일어나면 다시 렌더링 됩니다, `this.props`가 바뀌면서요. `showMessage` 의 메소드는 `user` 를 새로운 `props`에서 받아오게 됩니다.

이것은 유저 인터페이스의 본질에 관한 흥미로운 관찰을 이끌어 냅니다.

---
