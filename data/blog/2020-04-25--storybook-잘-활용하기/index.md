---
title: storybook 잘 활용하기
createdDate: "2020-04-25"
updatedDate: "2020-04-25"
author: Ideveloper
tags:
  - frontend
  - react
image: storybook.png
draft: false
---

### 🎬 시작하기에 앞서

Storybook은 UI 컴포넌트 개발을 할때 뛰어난 UI를 체계적이고 효율적으로 구축 할 수 있도록 도와주는 유용한 tool입니다.
이 포스팅에서는 storybook 사용과 관련해서는 설명하지 않고,이미 사용하고 있는 storybook을 어떻게 잘 활용할지에 대한 몇가지 방법들에 대해 포스팅 하겠습니다.

## ![image](https://raw.githubusercontent.com/storybookjs/storybook/master/media/storybook-intro.gif)

---

## Addon 관련

storybook에서는 아래에서 볼수 있듯, 다양한 기능들을 활용할 수 있게 공식적으로 [addon](https://www.facebook.com/groups/TSKorea/permalink/2596844310559220/)들을 제공하고 있습니다. 그 중 유용하게 사용한
몇가지 addon들을 소개해 드리겠습니다.

![image](https://user-images.githubusercontent.com/26598542/80657473-a4b58400-8abe-11ea-814c-fcb1d96667bd.png)

### 📱 storybook viewport addon

![image](https://github.com/storybookjs/storybook/raw/master/addons/viewport/docs/viewport.png)

프론트엔드 개발을 하다보면, 다양한 반응형에 대응을 해야할 때가 있습니다. 따라서, 스토리북을 활용하여 개발을 할때에도 이러한 반응형 UI에 따른, 컴포넌트의 스토리를 확인해야 할 경우들이 있는데요. 이 때 유용하게 사용할 수 있는 addon이 [viewport addon](https://github.com/storybookjs/storybook/tree/master/addons/viewport) 입니다.

**설치**

```shell
npm i --save-dev @storybook/addon-viewport

yarn add -D @storybook/addon-viewport
```

**설정방법**

```javascript
module.exports = {
  addons: ["@storybook/addon-viewport/register"],
};
```

제공하는 기능은 아래와 같이 요약할 수 있습니다.

- 다양한 viewport 설정할수 있게 configuration 하기
- storybook defaultViewport 적용하기
- 개별 컴포넌트 story별 viewport 적용하기

**- 다양한 viewport 설정할수 있게 configuration 하기**

맨처음, storybook viewport addon을 설정하게 되면 [이곳](https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts) 에 있는 MINIMAL_VIEWPORTS 들만 보여지게 됩니다.

```javascript
//storybook/addons/viewport/src/defaults.ts
export const MINIMAL_VIEWPORTS: ViewportMap = {
  mobile1: {
    name: "Small mobile",
    styles: {
      height: "568px",
      width: "320px",
    },
    type: "mobile",
  },
  mobile2: {
    name: "Large mobile",
    styles: {
      height: "896px",
      width: "414px",
    },
    type: "mobile",
  },
  tablet: {
    name: "Tablet",
    styles: {
      height: "1112px",
      width: "834px",
    },
    type: "tablet",
  },
};
```

따라서, 좀 더 다양한 viewport에서 story들을 확인하고 싶다면 storybook에서 제공하는 INITIAL_VIEWPORTS를 활용해 수정해주어도 되고,

```javascript
// .storybook/preview.js

import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
```

아래와 같이 viewport 리스트를 custom해 넣어주어도 됩니다.

```javascript
import { addParameters } from "@storybook/react";

const customViewports = {
  kindleFire2: {
    name: "Kindle Fire 2",
    styles: {
      width: "600px",
      height: "963px",
    },
  },
  kindleFireHD: {
    name: "Kindle Fire HD",
    styles: {
      width: "533px",
      height: "801px",
    },
  },
};

addParameters({
  viewport: { viewports: customViewports },
});
```

**- defaultViewport 적용하기**

아래와 같이 default로 보여지고 싶은 viewport를 정해 넣어주기만 하면됩니다.
**유의할점**은 적용되어 있는 viewportList 내에서 적용을 해야한다는 점입니다.

맨 처음엔 [이곳](https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts)의 MINIMAL VIEWPORTS 로 리스트들이 적용되어 있어, 이 안에서 적용을 해주어야 하고, 만약 INITIAL_VIEWPORT를 viewports에 적용해 주었다면, iphonex, iphone6 등등 다양한 viewport를 default viewport로 적용이 가능해집니다.

```javascript
// storybook/preview.js

// 맨 처음 설정되어있는 viewport에서 default viewport 적용
import { addParameters } from "@storybook/react";

addParameters({
  viewport: {
    defaultViewport: "mobile1",
  },
});
```

![스크린샷 2020-05-01 오후 6 19 14](https://user-images.githubusercontent.com/26598542/80795746-598f9400-8bd8-11ea-81f4-e0624702ffcb.png)

```javascript
// 추가한 viewport가 있을때 default viewport 적용
import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: "iphonex",
  },
});
```

![스크린샷 2020-05-01 오후 6 18 52](https://user-images.githubusercontent.com/26598542/80795739-5694a380-8bd8-11ea-9df8-fcf3dde74a40.png)

**- 개별 컴포넌트 story별 viewport 적용하기**

전체 프로젝트에 적용하지 않고 각각의 story별로, 데스크탑에서 쓰는 컴포넌트라면 데스크탑 viewport를, 모바일에서만 쓰는 컴포넌트라면 모바일 viewport를 적용할수도 있게 됩니다. 물론,여기서도 역시 default viewport로 설정한 key가 적용한 viewport list에 있어야 합니다.

`개별 story 파일`

```javascript
export default {
  title: 'Stories',
  parameters: {
    viewport: { defaultViewport: 'iphone6' },
  };
};

export const myStory = () => <div />;
myStory.story = {
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
  },
};
```

### 🔧 storybook knobs addon

[knobs addon](https://github.com/storybookjs/storybook/tree/master/addons/knobs)은 다양한 input들을 동적으로 넣어주어 컴포넌트와 상호작용 할 수 있도록 도와주는 addon입니다. 또한 넘겨준 prop 에 따라 어떤 결과물을 보여주는지 바로바로 확인하고 싶을 때 Knobs 를 사용하면 매우 유용합니다.

**설치**

```shell
npm i --save-dev @storybook/addon-knobs

yarn add @storybook/addon-knobs --dev
```

**설정방법**

`.storybook/main.js 파일`

```javascript
module.exports = {
  addons: ["@storybook/addon-knobs/register"],
};
```

사용가능한 knobs들은 아래와 같은데요, [available knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs#available-knobs) section을 가시면 사용가능한 knobs들에 대한 더 자세한 설명을 볼 수 있습니다.

- text
- boolean
- number
- number bound by range
- color
- object
- array
- select
- radio

아래는 text와 object knobs를 사용하여 테스트한 예제입니다.

```javascript
import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs";

import Button from "./index";

export default {
  title: "DesignSystem|atoms/Button",
  decorators: [withKnobs],
  component: Button,
};

export const defaultButton = () => {
  const styleObj = object("style object", {
    backgroundColor: "#ffffff",
    color: "#000000",
  });

  return (
    <Button style={styleObj}>{text("버튼텍스트", "Hello Storybook")}</Button>
  );
};
```

아래 첨부한 예제에서 확인할수 있듯, 텍스트와 object가 동적으로 스토리북 상에서 바뀌는 것을 확인 할 수 있습니다.

![5월-01-2020 19-04-12](https://user-images.githubusercontent.com/26598542/80798153-a2e2e200-8bde-11ea-8663-795b988a6afa.gif)

이러한 다양한 knobs들을 토대로 UI 컴포넌트를 테스트 해볼 수 있게 되는데,
[Storybook 공식 knobs 예제 사이트](https://storybooks-official.netlify.app/?path=/story/addons-knobs-withknobs--tweaks-static-values)에 가시면 다양한 활용 예제들을 확인 할 수 있습니다.

### 📲 a11y addon

접근성은 장애가있는 사람을 포함하여 모든 사람이 앱을 이해하고 탐색하고 상호 작용할 수 있음을 의미합니다. 온라인에서는 탭 키 및 screen reader를 사용하여 사이트를 탐색하는 등의 콘텐츠에 액세스 할 수있는 방법등을 제공하는것을 의미하는데요, 이러한 접근성과 관련해 UI 컴포넌트들을 접근성있게 개발할수 있도록 도와주는 [a11y addon](https://github.com/storybookjs/storybook/tree/master/addons/a11y)이라는 addon이 있습니다. 이를 확인해 볼수 있는 간단한 예제와 함께 설명을 드리겠습니다.

**관련해서 읽어보면 좋을 글**

- https://medium.com/storybookjs/instant-accessibility-qa-linting-in-storybook-4a474b0f5347

```javascript
import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";

import Button from "./index";

export default {
  title: "DesignSystem|atoms/Button",
  decorators: [withKnobs, withA11y],
  component: Button,
};

export const accessible = () => <button>Accessible 버튼</button>;

export const inaccessible = () => (
  <button style={{ backgroundColor: "red", color: "darkRed" }}>
    Inaccessible 버튼
  </button>
);
```

accsible한 버튼은 accsessible 테스트를 통과 한 반면,
![스크린샷 2020-05-01 오후 7 26 08](https://user-images.githubusercontent.com/26598542/80799581-34078800-8be2-11ea-8f69-006d42f398bb.png)

아래와 같이 시각적으로 적절히 배경색과 글자색이 적용되지않은 버튼은 아래와 같은 경고가 뜨게 됩니다.

뜬 경고에 대해 간단히 간단히 요약하자면, 글꼴의 색과 문서의 배경 색이 어느 정도의 명도 대비를 지녀야 하는지에 대한 지침인데요, 화면에서 볼 수 있듯 배경색과 글꼴색이 적절히 대비되지 않아 시각적 접근성에 위배된다고 경고를 하게됩니다.

- [WCAG 2.0 지침이 전하는 전경색과 배경색 명도 대비 관련 글](https://naradesign.github.io/article/wcag-contrast.html)

![스크린샷 2020-05-01 오후 7 26 12](https://user-images.githubusercontent.com/26598542/80799583-34a01e80-8be2-11ea-8385-7471009f4bae.png)

따라서 배경색을 적절히 바꿔주면 아래와 같이 통과를 하게 됩니다.
![스크린샷 2020-05-01 오후 7 26 29](https://user-images.githubusercontent.com/26598542/80799585-3669e200-8be2-11ea-9a77-750bde087e2c.png)

위에서 설명한 간단한 시각적인 접근성 테스트 말고도, 이 addon을 사용하면 다양하게 접근성에 위배되는 사항들에 대해 테스트를 해볼수 있게 됩니다.

![스크린샷 2020-05-01 오후 7 47 09](https://user-images.githubusercontent.com/26598542/80800497-96618800-8be4-11ea-9cfb-6bb3eec6ce74.png)

---

## 🛠 Customize 관련

위와 같이 addon을 추가하는것 이외에도 다양하게 storybook을 custom 하는 방법들이 있는데요, 그 중 몇가지를 소개하면 아래와 같습니다.

### 스토리 hierarchy 설정하기

프로젝트의 구조를 잡듯이, storybook 내에서도 story들의 구조를 잡는 방법도 있습니다.

- https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy

**[folder 구조잡기]**

/ 를 사용해 폴더를 명시해줄수 있고, /를 계속 추가해주면 folder역시 계속 생기게 되어, 폴더구조를 정리할수 있습니다.

```javascript
export default {
  title: "atoms/Button",
  component: Button,
};
```

**[root 이름 노출]**

| 앞에 root에 해당하는 네이밍을 적어주면 됩니다.

```javascript
export default {
  title: "DesignSystem|atoms/Button",
  component: Button,
};
```

![스크린샷 2020-05-01 오후 5 47 16](https://user-images.githubusercontent.com/26598542/80794071-dd934d00-8bd3-11ea-9e44-b9ecb9087e57.png)

### Storybook custom UI 테마 설정하기

회사 내에서 혹은 사이드프로젝트 등에서도 storybook을 자주 활용하게 되는데, 프로젝트 성격에 맞게 storybook의 테마를 꾸밀수 있습니다.

- https://storybook.js.org/docs/configurations/theming/#create-a-theme-quickstart

**기본제공 테마 사용**

```javascript
//.storybook/preview.js
import { addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";

addParameters({
  options: {
    theme: themes.dark,
  },
});
```

**직접 theme 만들어 사용**

```javascript
//yourTheme
import { create } from "@storybook/theming/create";

export default create({
  base: "light",

  colorPrimary: "hotpink",
  colorSecondary: "deepskyblue",

  // UI
  appBg: "white",
  appContentBg: "silver",
  appBorderColor: "grey",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "black",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "silver",
  barSelectedColor: "black",
  barBg: "hotpink",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,

  brandTitle: "My custom storybook",
  brandUrl: "https://example.com",
  brandImage: "https://placehold.it/350x150",
});

//.storybook/preview.js
import { addons } from "@storybook/addons";
import yourTheme from "./yourTheme";

addons.setConfig({
  theme: yourTheme,
});
```

---

## Etc

위에서 설명한것 이외에도 storybook을 활용할 수 있는 방법은 무궁무진 합니다. 다른 좋은 사례들이 있으면 공유해주시면 감사하겠습니다 :)

**storybook 사용시 참고하면 좋을 글들**

- [Why You Should Always Use Storybook When Developing User Interfaces](https://levelup.gitconnected.com/why-you-should-always-use-storybook-when-developing-user-interfaces-4c69b93b2f65)
- [고통없는 UI 개발을 위한 Storybook](https://jbee.io/tool/storybook-intro/)
- [Storybook을 다양한 Addon과 함께 활용해보면서 사용법 정복하기](https://velog.io/@velopert/start-storybook)
- [효율적인 storybook 컴포넌트 구조 만들기](https://vallista.kr/2020/04/26/%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-Storybook-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%A1%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0/)
