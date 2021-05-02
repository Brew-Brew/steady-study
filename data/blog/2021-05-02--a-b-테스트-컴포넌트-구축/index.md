---
title: 간단하게 만드는 A/B테스트 컴포넌트
createdDate: "2021-05-02"
updatedDate: "2021-05-02"
author: Ideveloper
tags:
  - react
  - frontend
image: abtest.png
draft: false
---

## 시작하기에 앞서

많은 회사들에서 여러 유저들이 여러 UI 상황에서 어떻게 행동하고, 또 어떤 UI를 보여줬을때 더 많이 반응(ex: 클릭)하고, 더 효과적인지 파악하기 위해 많이들 a/b테스트를 진행한다. 또 최근에 UI A/B테스트를 위해 관련 컴포넌트를 구축해야 했고 어떻게 간단히 구축해보았는지 설명해보려한다.

## AB테스트 시스템에 필요한 컴포넌트들

간단히 표현하면 두가지 컴포넌트로 구성이 된다. 첫번째로는 ABTest를 하는 컴포넌트를 감싸는 컨테이너 컴포넌트, 그리고 두번째로는 AB테스트를 할 영역을 표현하는 컴포넌트 이다.

그리고 아래 순서대로 설명을 하려한다.

1. AB테스트 컨테이너 컴포넌트
2. AB테스트 각 타입별 컴포넌트
3. 위 1~2를 활용한 예시

![image](https://user-images.githubusercontent.com/26598542/116808149-37757c80-ab72-11eb-8ddc-bffc9c0b1b28.png)

우선 아래는 참고용 코드들이다. 아래 내용들을 보며 확인하면 좋을듯 하다.

<iframe src="https://codesandbox.io/embed/stupefied-brook-8g2ol?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="stupefied-brook-8g2ol"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### 1. ABTest Container 컴포넌트

- AB테스트 컨테이너 컴포넌트는 테스트할 UI컴포넌트들을 감싸는 컨테이너 역할을 하는 컴포넌트이다.
- 관련 context와 컴포넌트로 구성되고 prop은 테스트 할 타입을 받고, children으로 테스트에 쓰이는 UI컴포넌트들을 받게 된다.
  - prop으로 간단하게 children으로 받는 이유는 a/b테스트 컴포넌트들이 그안에 있을때 다양한 컴포넌트들이 얽혀있을수 있고 또 그에 따른 다양한 hierarchy들이 생길수 있어, 다양하게 UI가 표현될 수 있게 자유도를 주기 위함이었다.
- Context 프로바이더에는 컨테이너 컴포넌트에서 받은 테스트할 prop을 바탕으로 useABTestState 함수를 통해 테스트할 타입과 일치하는지를 알수 있는 함수를 넣어주게 된다. 따라서 아래 ABTest UI 표현용 컴포넌트 에서 쉽게 본인 컴포넌트가 테스트할 타입인지/아닌지를 체크할수 있게 된다.

```typescript
import React, { ReactChild, ReactFragment, useContext } from "react";

import ABTest from "./ABTestComponent";

export interface IABTestContext {
  state: IABTestState | null;
}

export const ABTestContext = React.createContext<IABTestContext | null>(null);

export function useABTestProvider() {
  const context = useContext(ABTestContext);

  if (!context) {
    return {
      state: null,
    };
  }

  return context;
}

/**
 * isMatchedType: 컴포넌트의 type과 selectedType이 일치 하는지 여부
 */
export interface IABTestState {
  isMatchedType: (type: string[]) => boolean;
}

export function useABTestState(props: IABTestProps): IABTestState {
  // selectedType 과 같은지 체크
  const isMatchedType = (type: string[]): boolean => {
    return type.includes(props.type);
  };

  return {
    isMatchedType,
  };
}

/**
 * ABTest prop
 * type:  A / B 테스트에 사용할 컴포넌트의 타입
 */
export interface IABTestProps {
  type: string;
  children: ReactChild | ReactFragment;
}

const ABTestContainer: React.FC<IABTestProps> = (props) => {
  const { children } = props;
  const state = useABTestState(props);

  // chilren이 없다면 error
  if (React.Children.toArray(props.children).length < 1) {
    console.error("children이 없습니다.");
  }

  return (
    <ABTestContext.Provider value={{ state }}>
      {children}
    </ABTestContext.Provider>
  );
};

export { ABTest, ABTestContainer };
```

### 2. ABTest UI 표현용 컴포넌트

- 큰 부분은 없고 컨텍스트에서 프로바이더를 가져오고, ab테스트 컨테이너에 받은 prop (테스트할 a/b테스트 타입) 을 가져와 일치하면 영역을 보여주고, 아니면 아무것도 보여주지 않도록 처리해준다.
- type을 배열로 받는 이유는 여러가지 타입으로 테스트를 할때 같은 타입이더라도 같은 UI를 보여주는 경우가 있을수 있기 떄문에 이를 대응하기 위함이다.

```typescript
import React from "react";

import { useABTestProvider } from "./ABTestContainer";

interface IProps {
  type: string[];
}

const ABTest: React.FC<IProps> = ({ children, type }) => {
  const abTestProps = useABTestProvider();
  const { state } = abTestProps;

  const isMatched = state?.isMatchedType(type);

  // match 된 타입이면 render
  return isMatched ? <>{children}</> : null;
};

export default ABTest;

```

### 3.사용 예시

아래와 같은 여러가지 사용 예시 상황을 생각해보았고, 그예시 코드들이다.

1. 기본 (A/B 테스트 하는 요소의 hierarchy가 동일할 때)
2. 여러개의 타입 선택지가 있을때
3. 직계 자식컴포넌트가 테스트 컴포넌트가 아닌경우

위에서 ab테스트 컨테이너 컴포넌트에서 `children` 으로 테스트할 컴포넌트들이 표현되는 부분을 받는 이유가 자유도를 높이기 위함이라 했는데, 아래와 같이 여러상황들이 존재하기 때문이다. 물론 이상황 말고도 여러가지 상황들이 있을것이다.

그리고 위에 잠시 설명하긴 했지만, `type prop을 배열`을 받는 이유가 타른 타입이더라도 큰 틀 측면에서는 같은 UI를 보여줄때가 있기 때문이다. 실제 관련 작업 당시에도 관련한 상황이 존재했었다. (ex: 타입은 다르지만 UI레이아웃은 다를게 없고, 리스트에 보여주는 갯수가 다른 UI)

```typescript
import React from "react";

import { ABTest, ABTestContainer } from "./ABTestContainer";

// 예시용 컴포넌트
const Example = () => {
  return (
    <>
      {/* 기본 (A/B 테스트 하는 요소의 hierarchy가 동일할 때)*/}
      <ABTestContainer type="B">
        <ABTest type={["A"]}>
          <p>aaa</p>
        </ABTest>
        <ABTest type={["B"]}>
          <p>bbb</p>
        </ABTest>
      </ABTestContainer>
      {/* 여러개의 타입 선택지가 있을때 */}
      <ABTestContainer type="C">
        <ABTest type={["A"]}>
          <p>aaa</p>
        </ABTest>
        <ABTest type={["B"]}>
          <p>bbb</p>
        </ABTest>
        <ABTest type={["C"]}>
          <p>ccc</p>
        </ABTest>
      </ABTestContainer>
      {/**직계 자식컴포넌트가 테스트 컴포넌트가 아닌경우 */}
      <ABTestContainer type="A">
        <div>
          <header />
          <ABTest type={["B"]}>dd</ABTest>
          <ABTest type={["A"]}>dd</ABTest>
          <footer />
        </div>
      </ABTestContainer>
    </>
  );
};

export default Example;
```

## 마치며

위 코드들은 여러가지 리팩토링을 거쳐 나온 최종 결과물로 놓고보니 생각보다 크게 어려운 부분은 없었다. 다만 작업당시 관련해서 여러가지 상황들에 고민들이 필요했고, 또 과한 오버엔지니어링을 피하고, 자유도를 위해 여러가지 코드들로 강제했던 여러가지 부분들을 많이 삭제하기도 했다. 물론 위 코드가 이상적인 것은 당연 아니지만, 추후 구축할때 더 develop해볼수도 있고 이에 대한 생각들을 기록하고 공유하기 위해 포스팅해보았다.

또한 위 내용은 UI 관점에서의 A/B테스트 컴포넌트를 어떻게 구축하면 좋을지에 대한 내용이었고, A/B테스트에서는 각 타입별로 어떻게 클릭로그들이 심기고 또 어떻게 impression 로그들이 심기고 등등 지표들이 가장 중요하기 떄문에 실제로는 UI가 보여지는것에 따라 관련 로그도 전송에 필요한 관련 a/b테스트 데이터들을 어떻게 보관하고, 또 어떻게 전송할지등등도 충분히 고려가 필요하다.
