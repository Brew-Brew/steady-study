---
title: css-in-js 라이브러리 코드로 파악해보는 css-in-js의 이모저모
createdDate: '2022-01-25'
updatedDate: '2022-01-25'
author: Ideveloper
tags:
  - frontend
  - css-in-js
  - emotion
image: css-in-js.png
draft: false
---

emotion을 현재 조직에서 사용하고 있기도 하고, 예전에 팀원분이 이슈 디버깅중 실제 운영 환경에서 style이 비어있는 이슈를 마주하셨습니다. 이를 계기로 emotion및 다른 라이브러리의 스타일 적용 동작을 파악해보게 되었고,
파악하면서 css-in-js 라이브러리들의 구현 방식이나, 왜 그런 특성들을 각자 갖게 되었는지 알게된점을 이글에서 공유하려 합니다.

## 1. emotion에서의 style 적용은 어떻게 될까 살펴보자 👀

우선, emotion에서 어떻게 스타일이 적용되는지 코드를 기반으로 파악해보았습니다.

[https://github.com/emotion-js/emotion/blob/main/packages/sheet/src/index.js#L65](https://github.com/emotion-js/emotion/blob/main/packages/sheet/src/index.js#L65)

- production 여부 체크

```jsx
export class StyleSheet {
  isSpeedy: boolean
  ctr: number
  tags: HTMLStyleElement[]
  container: HTMLElement
  key: string
  nonce: string | void
  prepend: boolean | void
  before: Element | null
  insertionPoint: HTMLElement | void
  constructor(options: Options) {
    this.isSpeedy =   // highlight-line
      options.speedy === undefined   // highlight-line
        ? process.env.NODE_ENV === 'production'   // highlight-line
        : options.speedy  // highlight-line
    this.tags = []
    this.ctr = 0
    this.nonce = options.nonce
    // key is the value of the data-emotion attribute, it's used to identify different sheets
    this.key = options.key
    this.container = options.container
    this.prepend = options.prepend
    this.insertionPoint = options.insertionPoint
    this.before = null
  }
```

- 한 스타일 태그에 들어갈 최대의 rule의 갯수는 dev/prod 일때 다르다 (`isSppedy`라는 flag)
  - prod일때는 65000개 dev는 1개
  - dev일떄는 소스맵도 고려해야했음
- style insert하고 나면 ctr하나씩 증가시킴

```jsx
_insertTag = (tag: HTMLStyleElement) => {
    let before
    if (this.tags.length === 0) {
      if (this.insertionPoint) {
        before = this.insertionPoint.nextSibling
      } else if (this.prepend) {
        before = this.container.firstChild
      } else {
        before = this.before
      }
    } else {
      before = this.tags[this.tags.length - 1].nextSibling
    }
    this.container.insertBefore(tag, before)
    this.tags.push(tag)
  }

insert(rule: string) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {   // highlight-line
      this._insertTag(createStyleElement(this))
    }
    ...

    this.ctr++   // highlight-line
  }
```

`예시로 확인하기`

```jsx
import React from 'react'
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`
const Button2 = styled.button`
  color: blue;
`

const Button3 = styled.button`
  color: green;
`

function App() {
  return (
    <div className='App'>
      <h1>{process.env.NODE_ENV}</h1>
      <Button>이모션</Button>
      <br />
      <Button2>고모션</Button2>
      <br />
      <Button3>저모션</Button3>
    </div>
  )
}

export default App
```

dev 모드

- 아래와 같이 rule별로 각 스타일 태그가 3개가 추가되었음
  ![스크린샷 2022-01-22 오전 12.50.26.png](https://user-images.githubusercontent.com/26598542/150975129-50a1ee3e-ef9a-4aa5-8561-f8b4f76e0856.png)

prod 모드

- 위에서 파악한것처럼 적용된 rule은 3개지만 production은 스타일 태그 하나, 하지만 style은 비어있음..?
  ![스크린샷 2022-01-22 오전 12.52.21.png](https://user-images.githubusercontent.com/26598542/150975480-a6f062d4-f36a-4cf5-bbdf-d26055be8493.png)

### production 에서는 스타일 태그들이 왜 비어있을까?

조금 더 코드상에서 파악해봅시다.

- production 에서는 CSSOM수정 방식(CSSStyleSheet.insertRule())을 선택
- development 에서는 DOM수정 방식을 선택 (tag.appendChild(document.createTextNode(rule)))

```jsx
insert(rule: string) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this))
    }
    ...

    if (this.isSpeedy) {
      const sheet = sheetForTag(tag)
      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length) // highlight-line
      } catch (e) {
        if (
          process.env.NODE_ENV !== 'production' &&
          !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(
            rule
          )
        ) {
          console.error(
            `There was a problem inserting the following rule: "${rule}"`,
            e
          )
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule)) // highlight-line
    }
    this.ctr++
  }
```

CSSStyleSheet.insertRule()

- [https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule)
  - 새로운 css rule을 style sheet에 직접 삽입하는 방식

**CSSStyleSheet**

CSS 스타일 시트는 CSS 사양에 정의된 스타일 시트를 나타내는 추상적인 개념 이고, CSSOM에서 css style sheet는 [CSSStyleSheet](https://drafts.csswg.org/cssom/#cssstylesheet) 객체로 표현됩니다

- [https://drafts.csswg.org/cssom/#css-style-sheets](https://drafts.csswg.org/cssom/#css-style-sheets)

`sheet.rules` 로 dev tool에서 조회해야 조회가 가능하다

![스크린샷 2022-01-22 오전 1.05.40.png](https://user-images.githubusercontent.com/26598542/150975654-2133388c-7cf4-412b-b5e5-b590162bfceb.png)

### 디버깅이 힘들어지는데.. 왜 다르게 할까?

**runtime css-in-js** 라는 emotion의 특성과 겹친다 (styled component도 동일)

- prod에서도 dev와 같이 style 태그가 추가된다면 ->
- 컴포넌트에서 runtime에 스타일을 수정할시마다 스타일 태그가 추가 ->
- dom tree 다시 그리고 또 cssom 트리 구축 ->
- css를 parsing하는 시간이 필요하고, 이 시간만큼 렌더링 blocking. ->
- runtime에 일어나는 이러한 변화를 최적화하기 쉽지 않다.

css parsing으로 인해 blocking되는 시간을 최대한 줄이는 노력이 필요했고, (브라우저는 DOM및 CSSOM트리를 결합하여 렌더링 트리를 형성 → 렌더링) emotion에서 **DOM트리는 수정하지 않고 CSSOM을 수정하는 방식을 선택하여** DOM트리 parsing에 드는 시간을 줄이는 방법을 선택했겠구나라는 생각이 들었습니다.

`동적인 스타일 변경으로 더 체감해보기`

아래와 같이 상태에 따라 스타일들이 변경 되도록 수정

```typescript
import React, { useState } from 'react'
import styled from '@emotion/styled'

const Button = styled.button<{ flag: boolean }>`
  color: ${(props) => (props.flag ? 'pink' : 'hotpink')};
  font-weight: bold;
`
const Button2 = styled.button<{ flag: boolean }>`
  color: ${(props) => (props.flag ? 'skyblue' : 'blue')};
  font-weight: bold;
`

const Button3 = styled.button<{ flag: boolean }>`
  color: ${(props) => (props.flag ? 'yellow' : 'green')};
  font-weight: bold;
`

function App() {
  const [flag, setFlag] = useState(false)
  return (
    <div className='App'>
      <h1>{process.env.NODE_ENV}</h1>
      <button onClick={() => setFlag((flag) => !flag)}>flag 바꾸기</button>
      <br />
      <br />
      <Button flag={flag}>이모션</Button>
      <br />
      <Button2 flag={flag}>고모션</Button2>
      <br />
      <Button3 flag={flag}>저모션</Button3>
    </div>
  )
}

export default App
```

- dev
  - 런타임에 사용자의 동작에 따라 스타일들이 추가됨
  - 스타일이 복잡할 경우 런타임에 성능 이슈가 생길 수 있음

![Jan-22-2022 01-16-00.gif](https://user-images.githubusercontent.com/26598542/150975774-2bfd1155-2707-42cf-8cd5-7c04f8a50246.gif)

- prod
  - 스타일 태그 추가되지않고 cssom에 추가되는 방식 -> 런타임에 스크립트 추가로 인한 불필요한 dom tree parsing 일어나지 않음

![Jan-22-2022 01-19-55.gif](https://user-images.githubusercontent.com/26598542/150975873-13eae2a5-bd39-487f-aa82-3052261acc9b.gif)

### 다른 runtime css-in-js인 styled component는 어떨까?

세부 코드들은 다르지만, 동일하게 production에선 cssom 수정방식을 dev에선 dom 수정방식을 선택했습니다.

[1. speedy 여부 판별 (dev, prod)](https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/constants.ts#L15)

```javascript
export const DISABLE_SPEEDY = Boolean(
  // highlight-line
  typeof SC_DISABLE_SPEEDY === 'boolean'
    ? SC_DISABLE_SPEEDY
    : typeof process !== 'undefined' &&
      typeof process.env.REACT_APP_SC_DISABLE_SPEEDY !== 'undefined' &&
      process.env.REACT_APP_SC_DISABLE_SPEEDY !== ''
    ? process.env.REACT_APP_SC_DISABLE_SPEEDY === 'false'
      ? false
      : process.env.REACT_APP_SC_DISABLE_SPEEDY
    : typeof process !== 'undefined' &&
      typeof process.env.SC_DISABLE_SPEEDY !== 'undefined' &&
      process.env.SC_DISABLE_SPEEDY !== ''
    ? process.env.SC_DISABLE_SPEEDY === 'false'
      ? false
      : process.env.SC_DISABLE_SPEEDY
    : process.env.NODE_ENV !== 'production'
)
```

[2. 그 flag에 따라 cssom injection 쓸지 /말지](https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/sheet/Sheet.ts#L24)

```javascript
const defaultOptions: SheetOptions = {
  isServer: !IS_BROWSER,
  useCSSOMInjection: !DISABLE_SPEEDY // highlight-line
}
```

[3. 관련해서 스타일 추가](https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/sheet/Tag.ts#L8)

```javascript
/** Create a CSSStyleSheet-like tag depending on the environment */
export const makeTag = ({ isServer, useCSSOMInjection, target }: SheetOptions) => {
  if (isServer) {
    return new VirtualTag(target)
  } else if (useCSSOMInjection) {
    return new CSSOMTag(target) // highlight-line
  } else {
    return new TextTag(target)
  }
}
```

- prod : [https://github.com/styled-components/styled-components/blob/80cf751528f5711349dd3c27621022b4c95b4b7f/packages/styled-components/src/sheet/Tag.ts#L32](https://github.com/styled-components/styled-components/blob/80cf751528f5711349dd3c27621022b4c95b4b7f/packages/styled-components/src/sheet/Tag.ts#L32)

```javascript
 insertRule(index: number, rule: string): boolean {
    try {
      this.sheet.insertRule(rule, index);    // highlight-line
      this.length++;
      return true;
    } catch (_error) {
      return false;
    }
  }

```

- dev: [https://github.com/styled-components/styled-components/blob/80cf751528f5711349dd3c27621022b4c95b4b7f/packages/styled-components/src/sheet/Tag.ts#L74](https://github.com/styled-components/styled-components/blob/80cf751528f5711349dd3c27621022b4c95b4b7f/packages/styled-components/src/sheet/Tag.ts#L74)

```javascript
  insertRule(index: number, rule: string) {
    if (index <= this.length && index >= 0) {
      const node = document.createTextNode(rule);
      const refNode = this.nodes[index];
      this.element.insertBefore(node, refNode || null);    // highlight-line
      this.length++;
      return true;
    } else {
      return false;
    }
  }
```

![스크린샷 2022-01-22 오전 2.02.20.png](https://user-images.githubusercontent.com/26598542/150976063-7dd40707-160c-4329-a0e4-bf6acd10af5a.png)

![스크린샷 2022-01-22 오전 2.00.07.png](https://user-images.githubusercontent.com/26598542/150976071-e7ed9f2b-ecfe-4e64-a516-a07509021dd7.png)

## 2. runtime css-in-js 와 zero-run-time 그리고 near zero run time ✨

runtime의 특성때문에 생기는 production에서의 최적화 처리는 알겠는데, 그러면 아예 runtime이 아닌 라이브러리들을 고려해보지 않았을까? 아래에서 알아봅시다!

### runtime

emotion과 styled component

`runtime css-in-js에서 생긴 문제점들`

![스크린샷 2022-01-24 오후 1.34.28.png](https://user-images.githubusercontent.com/26598542/150976175-69183878-5330-471f-a1d7-a3c797da869e.png)

위 내용은 [한 블로그](https://punits.dev/blog/zero-runtime-css-in-js/)에서 발췌한 내용인데, 해석해보면 아래와 같습니다.

자바스크립트로 조작하는 UI 스타일링들은 자바스크립트 런타임과 연관이 생겼고, 아래와 같은 성능관련 여러 내용들을 생각해보게 되었다

- 사용자들의 여러 동작들로 인해 동적으로 추가되는 스타일링은 parse ,compile 과정 등등이 추가적으로 일어나게 되었다
- UI 렌더링이 지연되기도 하였다 (많은 js들이 실행되고 난뒤 실행되서)
- 자바스크립트 실행에 실패하면 스타일들이 제대로 렌더되지않았다. (JavaScript errors are a lot more probable than CSS or HTML errors.)

`run time css-in-js로 얻는 DX 의 장점(js로 핸들링 하는 css,..etc)`과 `웹 성능들에서 생기는 문제점`들이 양자택일의 문제처럼 상충하기 시작했다

### zero runtime

그럼 run time에서 생기는 문제점들이 있으니 zero run time? 그런데, 빌드시 css파일이 생기는 예전으로 회귀하는게 아닌가..?
사실 Zero Runtime CSS 라는 것은 예전에도 있었습니다..! 하지만 과거에는 prop이나 state에 의한 동적 스타일링을 지원하지 않은 채로, 단순한 정적 스타일 파일을 빌드 시간에 생성하는 것에 그쳤습니다.

![linaria](https://user-images.githubusercontent.com/26598542/150981027-96c97470-0f41-40e7-9e78-676b54392ea9.png)

#### linaria

linaria 라는 대표적인 zero run time css in js 라이브러리가 있는데, 그럼 이건 어떻게 zero run time을 접목했을까요?

![스크린샷 2022-01-24 오후 1.41.18.png](https://user-images.githubusercontent.com/26598542/150976258-a7287eb4-c77d-43f7-b8a8-ef6be7d4e9f9.png)

**Q) 생긴건 emotion/styled 나 styled-components랑 비슷한데 뭐가 다른가?**

간단히 말해, Emotion 및 Styled Components와 같은 JS 라이브러리의 CSS는 브라우저에서 페이지가 로드될 때 스타일을 구문을 분석해 적용하고(runtime) Linaria는 프로젝트를 빌드할 때(예: webpack) CSS 파일에 스타일을 추출하고 CSS 파일이 로드되는 방식 (zero runtime).

- [How is Linaria different from Emotion and Styled Components](https://medium.com/call-stack/how-is-linaria-different-from-emotion-42e420a3984f)

**Q) 그러면 기존의 동적 스타일링은 어떻게 구현?**

Linaria는 Babel Plugin과 Webpack Loader를 사용해서 빌드될 때 별도의 CSS 파일을 생성하게 되는 데 이 파일 안에서 prop이나 state 등에 의한 값들을 CSS Variable로 정의하고 CSS Variable의 값을 변경시킴으로써 동적 스타일링을 구현

- JS 코드 상에서 Linaria에 넘겨주는 Prop을 변경하게 되면 inline-style로 CSS 변수값이 변경
- 그러면 CSS 스타일 내에서 해당 변수를 참조하고 있기 때문에 해당 요소에 적용되고 있는 스타일이 변하고 이로써 동적 스타일링이 구현
- Styled Component가 새로운 스타일 클래스를 만들고 그 클래스의 이름을 요소의 class 속성으로 넣어줌으로써 동적 스타일을 구현했다면 Linaria는 CSS 변수값만 바꿔줌으로써 이를 구현

**Q) [어떠한 장점](https://github.com/callstack/linaria/blob/master/docs/BENEFITS.md#advantages-over-other-css-in-js-solutions)이 있을까?**

**zero runtime css-in-js는 run time css-in-js에서의 DX는 유지하면서, 웹성능 문제가 상충하는 상황도 해결하려 노력했다**

- CSS가 JS와 동일한 번들에 있는 runtime css-in-js와 달리 CSS와 JavaScript를 병렬로 로드할 수 있으므로 로드 시간이 향상
- CSS 구문 분석과 같은 추가 작업이 런타임에 수행될 필요가 없기 때문에 런타임 성능이 향상
- ..etc

**Q) 그럼 좋은건 알겠는데 고려할점은 없을까..?**

- CSS 변수를 사용한 방식이다보니까 브라우저 호환성에서 문제가 있다. `IE`에서는 CSS 변수를 지원하고 있지 않기 때문에 IE11을 지원해야 하는 프로젝트에서는 Linaria가 아닌 다른 방식을 선택해야 한다.

  - [https://developer.mozilla.org/ko/docs/Web/CSS/Using*CSS_custom_properties#브라우저*호환성](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%ED%98%B8%ED%99%98%EC%84%B1)

  ![ie-image](http://file3.instiz.net/data/file3/2018/04/30/3/b/3/3b3c687d9cf0380cbc78ed969b7288c0.jpg)

#### vanilla-extract

[https://github.com/seek-oss/vanilla-extract](https://github.com/seek-oss/vanilla-extract)

물론 zero runtime css-in-js 라이브러리에 linaria 말고도 vanilla-extracts라는 다른 라이브러리도 있습니다.

![vanilla-extracts](https://user-images.githubusercontent.com/26598542/150995183-9746d405-5d4f-43e6-81dd-f2ff13a1f126.png)

- 사용 방법은 뒤이어 소개할 near run time css-in-js 라이브러리인 stitches 스러움
- css module과 유사 , type safe, ..etc

```typescript
import { createTheme, style } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue',
    white: '#fff'
  },
  space: {
    small: '4px',
    medium: '8px'
  }
})

export const hero = style({
  backgroundColor: vars.color.brandd,
  color: vars.color.white,
  padding: vars.space.large
})
```

## near zero run time

zero run time은 이제 알겠는데.. 그럼 near zero run time은 뭘까???

stitches가 대표적인 near zero run time 라이브러리입니다.

- 단어 그대로 runtime을 아예 가지지 않는 것은 아니지만, component prop에 의한 interpolation을 최소화하는 방향의 API를 제공해 zero run time에 가까운 성능을 냄.
- styled-components, emotion에서는 prop 전달받은것에 따라 동적 스타일링이 가능하지만, stitches는 사전에 정의한 [variants](https://stitches.dev/docs/variants)에 의한 스타일링만 가능

![스크린샷 2022-01-24 오후 1.48.14.png](https://user-images.githubusercontent.com/26598542/150976372-9b6425b0-57b6-4b62-9e81-5d9d529a3f3a.png)

`prop interpolation` 최적화란..?

- 예를 들어, styled-components나 emotion에서는 prop에 의한 자유로운 동적 스타일링이 가능하지만, stitches는 사전에 정의한 [variants](https://stitches.dev/docs/variants)에 의한 스타일링만 가능
- 위와 같은 제약을 통해 runtime 에서 마주하는 성능문제를 상황을 제약하는 다른 방식으로 해결
  - 기존 emotion, styled component : 컴포넌트에 동적인 값을 자유롭게 넘길 수 있다는 것 ⇒ 미리 정의할 수 없는 상황 (최적화 하기가 어려워짐)

#### styled components와 생긴건 비슷한데 어떻게 다른가?

[https://stitches.dev/blog/migrating-from-styled-components-to-stitches](https://stitches.dev/blog/migrating-from-styled-components-to-stitches)

위 링크에서 더 자세히 알수 있지만, prop interpolation 기준으로만 살펴보면 아래와 같이 variant로 제약을 둬서 불필요한 prop interpolation을 방지합니다.

![스크린샷 2022-01-24 오후 2.26.48.png](https://user-images.githubusercontent.com/26598542/150976378-44fec9c4-5fdb-485d-a10f-80024d87380f.png)

#### 성능 (stitches, emotion, styled-component) 은 얼마나 더 좋을까?

아래 링크에서 알 수 있듯 거의 대부분의 지표에서 성능은 stitches가 좋게 나왔습니다.

[Benchmarks - Stitches](https://stitches.dev/docs/benchmarks)
![성능](https://user-images.githubusercontent.com/26598542/150995497-4a08643c-4e0d-422a-831b-47d45547ee57.png)

#### state of css 2021 css-in-js

아래 사진은 https://2021.stateofcss.com/en-US/ 에서 가져온 css-in-js 라이브러리의 흥미도 그래프입니다.
위와 같이 여러 흐름들을 살펴보니 run time css-in-js에서 zero run time css-in-js, near zero runtime css-in-js로 이어지는 흐름에 영향을 주지 않았을까..? 라는 생각도 들게 되었습니다 😃

그도 그럴것이, stitches, vanilla-extract, linaria 등이 높은 순위를 차지하고 있었기 떄문입니다 🕵🏻‍♂️

![스크린샷 2022-01-24 오후 2.32.11.png](https://user-images.githubusercontent.com/26598542/150976487-fbe06528-9637-443b-882e-3352bcfcfec4.png)

## 3. 결론, 그리고 atomic css는 또 뭐지..?

```
**사고의 과정**

1. 왜 emotion라이브러리를 사용하면 운영에서 스타일 태그가 비어있지?
2. emotion, styled-component와 같은 runtime css-in-js 라이브러리 코드를 파악해보니 dev와 prod는 runtime css in js의 성능 문제를 해결하려다보니 다르게 구현했구나?
3. 그럼 run-time 이외의 css-in-js는 있을까? (zero run time css / near zero run time css)
```

위와 같은 사고의 과정으로 runtime css-in-js 라이브러리의 스타일 추가 구현 방식 그리고 run time css-in-js이외의 zero run time css-in-js, near zero run time css-in-js의 특성까지 파악해보았었습니다.

**이렇게 파악해보면서, 많이들 알려져있는 emotion이나 styled component를 이미 기존에 사용하고 있다면**

- runtime overhead를 걱정할 필요가 없는 인터랙션에 따른 동적인 스타일 변경이 많이 없는 서비스인 경우는 기존의 runtime css-in-js를 쓰더라도 무방하지 않을까? 라는 생각이 들었고
- 동적으로 스타일링이 변하는 상황들이 자주 발생한다면 다른 라이브러리로의 교체도 고려해봄직하지 않을까? 라는 생각도 들었습니다 (zero run time, near zero run time)

**다만 처음 프로젝트를 시작할떄는**

- 기존 css in js가 가지는 DX장점을 가져가면서 성능상 이점도 함께 할수 있으니 위에 소개한 zero run time, near zero run time 라이브러리들을 한번 사용해보는것도 좋을거라는 생각이 들었습니다 :)
  - linaria는 ie에서 동작안하니 고려

그리고 추가로 이 글에 다 소개하진 못했지만, facebook에선 새로운 방법론으로 css파일 크기를 80프로 줄이면서 최적화를 극대화 했다고 하는데요, 빌드 타임에 css를 생성해 atomic css를 js적인 방법으로 활용할 수 있는 stylex라는 라이브러리를 개발하였고, 이 stylex는 atomic css 방법론을 적용했다고 합니다. 아직 stylex 라이브러리가 공개되진 않은거 같네요 😢

[tailwind](https://github.com/tailwindlabs/tailwindcss) , [atomizer](https://github.com/acss-io/atomizer) 등등의 라이브러리들이 atomic css 방법론을 적용한 라이브러리라고 합니다

`atomic css`

- tailwind와 같이 원자 단위로 css를 작성
- atomic css는 css를 변수처럼 선언하고 해당 스타일이 필요한 HTML tag 혹은 Component가 className 등을 통해 스타일을 가져다 쓰는 방식.
- 사용하는 컴포넌트가 많아지고 UI복잡도가 올라가면 장점은 더 극대화
- https://dev.to/developertharun/9-things-to-learn-from-facebook-s-new-tech-stack-2020-in-terms-of-atomic-css-javascript-2d5e

![이미지](https://imgur.com/CHdIhfe.png)

자세한 내용은 [react 핀란드 2021 conf 영상](https://www.youtube.com/watch?v=ur-sGzUWId4) 참고 하시면 좋을것 같습니다 :)

## 자매품 css-in-js-media (css in js 라이브러리들에서 반응형 쉽게 대응)

emotion, styled component에서 직관적으로 반응형 대응이 가능함 (네 제 라이브러리 홍보 맞습니다 ㅎ)

- [https://github.com/Brew-Brew/css-in-js-media](https://github.com/Brew-Brew/css-in-js-media)

```typescript
import media from 'css-in-js-media'

export const exampleClass = css`
  color: red;
  ${media('>desktop')} {
    font-size: 15px;
  }
  ${media('<=desktop', '>tablet')} {
    font-size: 20px;
  }
  ${media('<=tablet', '>phone')} {
    font-size: 25px;
  }
  ${media('<=phone')} {
    font-size: 30px;
  }
`
```

## References

- https://punits.dev/blog/zero-runtime-css-in-js/
- https://so-so.dev/web/css-in-js-whats-the-defference/
- https://dev.to/developertharun/9-things-to-learn-from-facebook-s-new-tech-stack-2020-in-terms-of-atomic-css-javascript-2d5e
