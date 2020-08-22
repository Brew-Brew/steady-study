---
title: 상태 패턴(state pattern)을 활용하여 Deep Link 효과적으로 관리하기
createdDate: "2020-08-22"
updatedDate: "2020-08-22"
author: Ideveloper
tags:
  - frontend
image: welcoming.png
draft: false
---

My awesome article

## 시작하며,

웹뷰환경에서 딥링크를 효과적으로 관리하고, 사용하는 방법에 대해서 알아봅시다.

### 상태패턴

### 상태패턴을 활용한 딥링크 매니저

#### type들

```typescript
/**
 * move 타입 enum
 */
export enum MoveType {
  REPLACE = 'replace',
  PUSH = 'push'
}

/**
 * 앱 scheme내 이동 위치
 */
export enum Location {
  HOME = 0,
  ORDER_SHEET,
  DELIVERY_TRACKING,
  ORDER_HISTORY_DETAIL,
  ORDER_HISTORY_DELIVERY_TRACKING_URL,
  PRODUCT,
  RETURN_EXCHANGE,
  HISTORY_TO_SHOP,
  MARKET_CATALOG,
  SHOP,
  ORDER_FAIL,
  ORDER_HISTORY,
  LOGIN,
  HISTORY_DETAIL_TO_SHOP
}

/**
 * 앱 action 리스트
 */
export enum Action {
  CLOSE = 'closeWebview',
  ORDER_BADGE = 'showOrderBadge',
  REFRESH_TOKEN = 'refreshToken',
  REFRESH_WEBVIEW = 'refreshWebview',
  REFRESH_ORDER_HISTORY = 'refreshOrderHistory'
}

export enum LocationType {
  ABSOLUTE = 0,
  RELATIVE
}

const common = {
  HOME: 'home',
  ORDER_SHEET: 'marketOrder',
  DELIVERY_TRACKING: 'home/marketDeliveryTracking',
  ORDER_HISTORY_DETAIL: 'orderHistoryDetail',
  ORDER_HISTORY_DELIVERY_TRACKING_URL: 'marketDeliveryTracking',
  PRODUCT: 'marketProduct',
  RETURN_EXCHANGE: '',
  HISTORY_TO_SHOP: 'home/market',
  MARKET_CATALOG: 'marketFirstCatalog'
}

const config = {
  AOS: {
    ...common,
    SHOP: 'home/market',
    ORDER_FAIL: '',
    ORDER_HISTORY: 'orderHistory',
    HISTORY_DETAIL_TO_SHOP: 'market'
  },
  IOS: {
    ...common,
    SHOP: 'marketReload',
    ORDER_FAIL: 'marketOrderResult',
    ORDER_HISTORY: 'home/orderHistory',
    HISTORY_DETAIL_TO_SHOP: 'home/market'
  }
}

export default config

```


#### Deeplink Manager (AppProtocol Manager)

```typescript
import { toQueryString } from 'utils'
import config, { MoveType, LocationType, Action } from './types'

export interface IAppProtocolState {
  move(location: number, locationType: LocationType, moveType: MoveType, params: object): void
  action(actionName: Action, moveType: MoveType, params: object): void
  smartAction(actionParam: object, moveType: MoveType): void
  callNativeHandler(methodName: string, params: any): void
}

abstract class AppProtocol implements IAppProtocolState {
  protected actionEntry: string | undefined
  protected entry: string | undefined

  constructor() {
    this.actionEntry = process.env.REACT_APP_DEEP_LINK_ACTION_PROTOCOL
    this.entry = process.env.REACT_APP_DEEP_LINK_PROTOCOL
  }
  /**
   * Action function
   * @param action 실행할 action
   * @param moveType move타입
   * @param params 같이 보낼 param
   */
  action(actionName: Action, moveType: MoveType, params = {}) {
    let url = `${this.actionEntry}${actionName}`
    url += toQueryString(params)

    if (moveType === MoveType.PUSH) window.location.href = url
    else window.location.replace(url)
  }

  abstract move(location: number, locationType: LocationType, moveType: MoveType, params: object): void
  abstract callNativeHandler(methodName: string, params?: any): void
}

export class IOSProtocol extends AppProtocol {
  constructor() {
    super()
  }

  /**
   * Move function
   * @param location  위치
   * @param moveType move 타입
   * @param params 같이 보낼 param
   */
  move(location: number, locationType: LocationType, moveType: MoveType, params = {}) {
    const locations = config['IOS']
    const locationPrefix = locationType === LocationType.RELATIVE ? './' : ''
    let url = `${this.entry}${locationPrefix}${Object.values(locations)[location]}`
    url += toQueryString(params, true)

    if (moveType === MoveType.PUSH) window.location.href = url
    else window.location.replace(url)
  }

  callNativeHandler(methodName: string, params: any) {
    const hasNativeHandler = Boolean(
      window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[methodName]
    )

    if (!hasNativeHandler) {
      return
    }

    try {
      const stringifiedParams = typeof params === 'string' ? params : JSON.stringify(params)
      window.webkit.messageHandlers[methodName].postMessage(stringifiedParams)
    } catch (error) {
      console.error(`failed to call ios native handler ${methodName}`, error)
    }
  }
}

export class AOSProtocol extends AppProtocol {
  constructor() {
    super()
  }

  /**
   * Move function
   * @param location  위치
   * @param moveType move 타입
   * @param params 같이 보낼 param
   */
  move(location: number, locationType: LocationType, moveType: MoveType, params = {}) {
    const locations = config['AOS']
    const locationPrefix = locationType === LocationType.RELATIVE ? './' : ''
    let url = `${this.entry}${locationPrefix}${Object.values(locations)[location]}`
    url += toQueryString(params, true)

    if (moveType === MoveType.PUSH) window.location.href = url
    else window.location.replace(url)
  }

  callNativeHandler(methodName: 'string', params: any) {
    const hasNativeHandler =
      window.MarketCartJavaScriptInterface && typeof window.MarketCartJavaScriptInterface[methodName] === 'function'
    if (!hasNativeHandler) {
      return
    }

    try {
      const stringifiedParams = typeof params === 'string' ? params : JSON.stringify(params)

      stringifiedParams
        ? window.MarketCartJavaScriptInterface[methodName](stringifiedParams)
        : window.MarketCartJavaScriptInterface[methodName]()
    } catch (error) {
      console.error(`failed to call android native handler ${methodName}`, error)
    }
  }
}

export class AppManager {
  private state: IAppProtocolState

  constructor(state: IAppProtocolState) {
    this.state = state
  }

  get State(): IAppProtocolState {
    return this.state
  }

  set State(state: IAppProtocolState) {
    this.state = state
  }

  action(action: Action, moveType: MoveType, params = {}) {
    this.state.action(action, moveType, params)
  }

  smartAction(actionParam: object, moveType: MoveType) {
    this.state.smartAction(actionParam, moveType)
  }

  move(location: number, locationType: LocationType, moveType: MoveType, params = {}) {
    this.state.move(location, locationType, moveType, params)
  }

  callNativeHandler(methodName: string, params: any) {
    this.state.callNativeHandler(methodName, params)
  }
}

```

### hook을 활용해 딥링크매니저 활용하기

```typescript
import { AppManager, AOSProtocol, IOSProtocol } from 'hooks/lib/AppProtocolManager'
import { MoveType, Action, LocationType, Location } from 'hooks/lib/AppProtocolManager/types'
import { DeviceType } from 'models/internals/Environment'

interface IParam {
  deviceType: DeviceType
}

function useAppManager(param: IParam) {
  const isAndroid = param.deviceType === DeviceType.ANDROID
  const context = new AppManager(isAndroid ? new AOSProtocol() : new IOSProtocol())

  const appAction = (actionName: Action, moveType = MoveType.REPLACE, params: object) => {
    context.action(actionName, moveType, params)
  }

  const appMove = (location: number, locationType: LocationType, moveType: MoveType, params: object) => {
    context.move(location, locationType, moveType, params)
  }

  const appSmartAction = (actionParam: object, moveType = MoveType.REPLACE) => {
    context.smartAction(actionParam, moveType)
  }

  const appInterfaceHandler = (methodName: string, params?: any) => {
    context.callNativeHandler(methodName, params)
  }

  return { appAction, appMove, appSmartAction, appInterfaceHandler }
}

export { MoveType, Action, LocationType, Location }
export default useAppManager

```