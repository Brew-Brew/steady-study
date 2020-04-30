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

# Storybook 잘 활용하기

Storybook은 UI 컴포넌트 개발을 할때 뛰어난 UI를 체계적이고 효율적으로 구축 할 수 있도록 도와주는 유용한 tool입니다.
이 포스팅에서는 storybook 사용관련해서는 설명하지 않고 , 어떻게 잘 활용할지에 대해서 포스팅하겠습니다.

---

## addon 관련

storybook에서는 다양한 기능들을 활용할 수 있게 공식적으로 addon들을 제공하고 있습니다. 그 중 유용하게 사용한
몇가지 addon들을 소개해 드리겠습니다.

![image](https://user-images.githubusercontent.com/26598542/80657473-a4b58400-8abe-11ea-814c-fcb1d96667bd.png)

#### storybook viewport addon

프론트엔드 개발을 하다보면, 다양한 반응형에 대응을 해야할 때가 있습니다. 따라서, 스토리북을 활용하여 개발을 할때에도 이러한 반응형 UI에 따른, 컴포넌트의 스토리를 확인해야 할 경우들이 있는데요.

이 때 유용하게 사용할 수 있는 addon이 [viewport addon](https://github.com/storybookjs/storybook/tree/master/addons/viewport) 입니다.

**설정방법**

```javascript
module.exports = {
  addons: ["@storybook/addon-viewport/register"],
};
```

**사용방법**

제공하는 기능은 아래와 같습니다.

- storybook defaultViewport 적용하기
- 개별 컴포넌트 story별 viewport 적용하기
- 다양한 viewport 설정할수 있게 configuration 하기
- 나만의 viewport 넣기

**defaultViewport 적용하기**

```javascript
import { addParameters } from "@storybook/react";

addParameters({
  viewport: {
    viewports: newViewports, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: "someDefault",
  },
});
```

**개별 컴포넌트 story별 viewport 적용하기**

전체 프로젝트에 적용하지 않고, 데스크탑에서 쓰는 컴포넌트라면 데스크탑 viewport를, 모바일에서만 쓰는 컴포넌트라면 모바일 viewport를 적용할수도 있게 됩니다.

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

**다양한 viewport 설정할수 있게 configuration 하기**

맨처음, storybook viewport addon을 설정하게 되면 [이곳](https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts) 에 있는 MINIMAL_VIEWPORTS 들만 보여지게 됩니다.

```javascript
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

`.storybook/preview.js`

```javascript
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

나만의 viewport 넣기

#### storybook knobs addon

[knobs addon](https://github.com/storybookjs/storybook/tree/master/addons/knobs)은 다양한 input들을 동적으로 넣어주어 컴포넌트와 상호작용 할 수 있도록 도와주는 addon입니다.

**설정방법**

`.storybook/main.js 파일`

```javascript
module.exports = {
  addons: ["@storybook/addon-knobs/register"],
};
```

**사용**

text, boolean, number, number bound by range, color, object, array , select , radio 등등 다양한 knobs를 지원하여 다양한 값들을 토대로 UI 컴포넌트를 테스트해볼 수 있게 됩니다.

---

## customize 관련

#### hierarchy 설정하기

- https://storybook.js.org/docs/basics/writing-stories/#story-hierarchy

추가 팁 => root 이름 노출하기
preview.js 파일에 아래와 같이 설정해주기

```javascript
addParameters({
  options: {
    showRoots: true,
  },
});
```

#### Storybook custom ui 테마 설정하기

- https://storybook.js.org/docs/configurations/theming/#create-a-theme-quickstart

#### storybook 영역 height full로 맞추기

- storybook 영역 height full로 맞추기

---

#### etc

- storybook 관련 같이 보면 좋을 글
  - https://jbee.io/tool/storybook-intro/
