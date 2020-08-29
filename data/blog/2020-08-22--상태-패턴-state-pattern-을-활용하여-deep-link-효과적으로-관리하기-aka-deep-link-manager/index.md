---
title: 상태 패턴(state pattern)을 활용하여 앱스킴, 인터페이스 효과적으로 관리하기 (App protocol manager)
createdDate: "2020-08-22"
updatedDate: "2020-08-22"
author: Ideveloper
tags:
  - frontend
image: app_protocol.png
draft: false
---

## 시작하며 🔥

웹뷰환경에서 앱스킴과 인터페이스를 효과적으로 관리하고, 사용하는 방법에 대해서 알아봅시다.

#### 개념설명

우선 여러가지 개념에 대해서 미리 설명을 드리자면 아래와 같습니다.

`딥링킹이란?`

- 딥링킹은 딥링크(Deeplink)를 통해서 앱 내의 특정 화면으로 이동하는 것을 말합니다.

`액션이란?`

- 액션은 딥링킹을 제외한 특정 동작들을 수행하는 것을 말합니다.
- os들끼리 같은 액션을 수행하게 만들려고 만든것이고, 보통은 네이티브 로직으로 구현하지만 마케팅 팝업이나 트리거 액션을 구현할때는 편의상 쓰는건데 사실 바람직하다고 보기는 어렵다고 합니다.
- ex) 배너나 팝업 CTA액션을 url 형식으로 줘야할때

`인터페이스란?`

- 앱에서 자바스크립트인터페이스를 호출하여 통신하기 위해 호출하는 규약들을 말합니다.

## 상태패턴 📖

- [상태 패턴](https://ko.wikipedia.org/wiki/%EC%83%81%ED%83%9C_%ED%8C%A8%ED%84%B4)은 객체가 특정 상태에 따라 행위를 달리하는 상황에서 자신이 직접 상태를 체크하여 상태에 따라 행위를 호출하지 않고 상태를 객체화하여 상태가 행동을 할 수 있도록 위임하는 패턴입니다.

![image](https://media.geeksforgeeks.org/wp-content/uploads/State-Design-Pattern-Diagram.png)

## 상태패턴(state pattern)을 활용한 앱프로토콜 매니저 🛠

<img width="604" alt="스크린샷 2020-08-25 오전 5 02 11" src="https://user-images.githubusercontent.com/26598542/91626945-5e315100-e9ee-11ea-95bf-65e4782830e2.png">

- 위의 상태패턴의 특성을 활용하여, AOS냐 IOS에 따라서 다른 행동을 할수있으므로, 행동들이 담긴 상태 객체를 생성하여 생성된 상태 객체를 활용하여 딥링크 이동이나, 액션 실행, 또는 자바스크립트 인터페이스 호출등을 쉽게 할 수 있게 됩니다.

#### type.ts

딥링크를 이동하는 type과 (replace, push) 앱 스킴내 이동위치 등을 enum으로 정의해 type파일에 넣어놓습니다.

`MoveType`

- 상황에 따라,location을 push(window.location.href="")할지 replace (window.location.replace="")할지 선택해야 하는 경우가 있을수 있으므로, 아래와 같이 두개의 타입을 정의하게 됩니다.

```typescript
/**
 * move 타입 enum
 */
export enum MoveType {
  REPLACE = "replace",
  PUSH = "push",
}
```

`Location`

- 앱 스킴내 이동 위치입니다.

```typescript
/**
 * 앱 scheme내 이동 위치
 */
export enum Location {
  HOME = 0,
  SUB_HOME,
}
```

`Action`

- 앱스킴으로 할 수 있는 액션을 정의해놓았습니다.

```typescript
/**
 * 앱 action 리스트
 */
export enum Action {
  CLOSE = "closeWebview",
}

export enum LocationType {
  ABSOLUTE = 0,
  RELATIVE,
}
```

`LocationType`

- 절대경로로 이동할지, 상대경로로 이동할지 정의하는 부분입니다.

```typescript
/**
 * Location 타입
 */
export enum LocationType {
  ABSOLUTE = 0,
  RELATIVE,
}
```

`config`

- 아래와 같이 구성한 이유는 aos, ios 공통의 앱스킴이 있을수 있는반면, 같은 링크인데도 다른 앱스킴이 있을 수 있으므로 아래와 같이 구성.

```typescript
const common = {
  HOME: "home",
};

const config = {
  AOS: {
    ...common,
    SUB_HOME: "aos/subHome",
  },
  IOS: {
    ...common,
    SUB_HOME: "ios/subHome",
  },
};
```

#### 전체 코드

```typescript
/**
 * move 타입 enum
 */
export enum MoveType {
  REPLACE = "replace",
  PUSH = "push",
}

/**
 * 앱 scheme내 이동 위치
 */
export enum Location {
  HOME = 0,
  SUB_HOME,
}

/**
 * 앱 action 리스트
 */
export enum Action {
  CLOSE = "closeWebview",
}

/**
 * Location 타입
 */
export enum LocationType {
  ABSOLUTE = 0,
  RELATIVE,
}

const common = {
  HOME: "home",
};

// 아래와 같이 구성한 이유는 aos, ios 공통의 앱스킴이 있을수 있는반면, 같은 링크인데도 다른 앱스킴이 있을 수 있으므로 아래와 같이 구성.
const config = {
  AOS: {
    ...common,
    SUB_HOME: "aos/subHome",
  },
  IOS: {
    ...common,
    SUB_HOME: "ios/subHome",
  },
};

export default config;
```

#### AppProtocol Manager

- 아래와 같이 앱프로토콜 추상 클래스를 만든 후에, 그 클래스를 상속받는 AOS 프로토콜매니저와 IOS 프로토콜 매니저를 만들게 됩니다.
- 앱스킴 딥링크 이동, 앱스킴 액션, 자바스크립트 인터페이스를 호출하는 네이티브 핸들러등의 세가지를 정의하게 됩니다.

```typescript
import { toQueryString } from "utils";
import config, { MoveType, LocationType, Action } from "./types";

export interface IAppProtocolState {
  move(
    location: number,
    locationType: LocationType,
    moveType: MoveType,
    params: object
  ): void;
  action(actionName: Action, moveType: MoveType, params: object): void;
  callNativeHandler(methodName: string, params: any): void;
}

abstract class AppProtocol implements IAppProtocolState {
  protected actionEntry: string | undefined;
  protected entry: string | undefined;

  constructor() {
    this.actionEntry = process.env.REACT_APP_DEEP_LINK_ACTION_PROTOCOL;
    this.entry = process.env.REACT_APP_DEEP_LINK_PROTOCOL;
  }
  /**
   * Action function
   * @param action 실행할 action
   * @param moveType move타입
   * @param params 같이 보낼 param
   */
  action(actionName: Action, moveType: MoveType, params = {}) {
    let url = `${this.actionEntry}${actionName}`;
    url += toQueryString(params);

    if (moveType === MoveType.PUSH) window.location.href = url;
    else window.location.replace(url);
  }

  // move나 callNativeHandler는  추상 메소드로 만들어, 상속받은 객체에 구현을 위임하였습니다.
  abstract move(
    location: number,
    locationType: LocationType,
    moveType: MoveType,
    params: object
  ): void;
  abstract callNativeHandler(methodName: string, params?: any): void;
}

export class IOSProtocol extends AppProtocol {
  constructor() {
    super();
  }

  /**
   * Move function
   * @param location  위치
   * @param moveType move 타입
   * @param params 같이 보낼 param
   */
  move(
    location: number,
    locationType: LocationType,
    moveType: MoveType,
    params = {}
  ) {
    const locations = config["IOS"];
    const locationPrefix = locationType === LocationType.RELATIVE ? "./" : "";
    let url = `${this.entry}${locationPrefix}${
      Object.values(locations)[location]
    }`;
    url += toQueryString(params, true);

    if (moveType === MoveType.PUSH) window.location.href = url;
    else window.location.replace(url);
  }

  callNativeHandler(methodName: string, params: any) {
    const hasNativeHandler = Boolean(
      window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers[methodName]
    );

    if (!hasNativeHandler) {
      return;
    }

    try {
      const stringifiedParams =
        typeof params === "string" ? params : JSON.stringify(params);
      window.webkit.messageHandlers[methodName].postMessage(stringifiedParams);
    } catch (error) {
      console.error(`failed to call ios native handler ${methodName}`, error);
    }
  }
}

export class AOSProtocol extends AppProtocol {
  constructor() {
    super();
  }

  /**
   * Move function
   * @param location  위치
   * @param moveType move 타입
   * @param params 같이 보낼 param
   */
  move(
    location: number,
    locationType: LocationType,
    moveType: MoveType,
    params = {}
  ) {
    const locations = config["AOS"];
    const locationPrefix = locationType === LocationType.RELATIVE ? "./" : "";
    let url = `${this.entry}${locationPrefix}${
      Object.values(locations)[location]
    }`;
    url += toQueryString(params, true);

    if (moveType === MoveType.PUSH) window.location.href = url;
    else window.location.replace(url);
  }

  callNativeHandler(methodName: "string", params: any) {
    const hasNativeHandler =
      window."정의한 인터페이스명" &&
      typeof window.정의한 인터페이스명[methodName] === "function";
    if (!hasNativeHandler) {
      return;
    }

    try {
      const stringifiedParams =
        typeof params === "string" ? params : JSON.stringify(params);

      stringifiedParams
        ? window."정의한 인터페이스명"[methodName](stringifiedParams)
        : window."정의한 인터페이스명"[methodName]();
    } catch (error) {
      console.error(
        `failed to call android native handler ${methodName}`,
        error
      );
    }
  }
}

export class AppManager {
  private state: IAppProtocolState;

  constructor(state: IAppProtocolState) {
    this.state = state;
  }

  get State(): IAppProtocolState {
    return this.state;
  }

  set State(state: IAppProtocolState) {
    this.state = state;
  }

  action(action: Action, moveType: MoveType, params = {}) {
    this.state.action(action, moveType, params);
  }

  move(
    location: number,
    locationType: LocationType,
    moveType: MoveType,
    params = {}
  ) {
    this.state.move(location, locationType, moveType, params);
  }

  callNativeHandler(methodName: string, params: any) {
    this.state.callNativeHandler(methodName, params);
  }
}
```

## react custom hook을 활용해 딥링크매니저 활용하기 📲

- 위에서 만든 딥링크 매니저를 잘 활용하기 위해, react를 사용한다면 아래와 같이 hook을 만들어 사용하면 됩니다.

```typescript
import {
  AppManager,
  AOSProtocol,
  IOSProtocol,
} from "hooks/lib/AppProtocolManager";
import {
  MoveType,
  Action,
  LocationType,
  Location,
} from "hooks/lib/AppProtocolManager/types";

interface IParam {
  deviceType: DeviceType;
}

function useAppManager(param: IParam) {
  const isAndroid = param.deviceType === "android";
  //  아래와 같이 aos ios 여부에 따라 AOSProtocol 혹은 IOSProtocol 상태 객체를 넣어주게 됩니다.
  const context = new AppManager(
    isAndroid ? new AOSProtocol() : new IOSProtocol()
  );

  const appAction = (
    actionName: Action,
    moveType = MoveType.REPLACE,
    params: object
  ) => {
    context.action(actionName, moveType, params);
  };

  const appMove = (
    location: number,
    locationType: LocationType,
    moveType: MoveType,
    params: object
  ) => {
    context.move(location, locationType, moveType, params);
  };

  const appInterfaceHandler = (methodName: string, params?: any) => {
    context.callNativeHandler(methodName, params);
  };

  return { appAction, appMove, appInterfaceHandler };
}

export { MoveType, Action, LocationType, Location };
export default useAppManager;
```

#### 사용하기

- 사용할때는 아래와 같이 aos, ios 여부인지만 넘겨 useAppManager hook을 사용하여 쉽게 앱과 통신을 할수 있게 됩니다.

```typescript
const { appAction, appMove, appInterfaceHandler } = useAppManager({
  'android'
  // user agent에서 ios or aos 판별해서 넘겨중
});

appMove(Location.HOME, LocationType.ABSOLUTE, MoveType.PUSH, {
  param: 1,
});

appAction(Action.CLOSE, MoveType.REPLACE, {});

appInterfaceHandler("호출할 인터페이스명", { param: "paramtest" });
```
