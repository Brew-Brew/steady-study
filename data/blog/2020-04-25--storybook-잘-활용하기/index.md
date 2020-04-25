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

Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular.

It makes building stunning UIs organized and efficient.

storybook 사용관련해서는 x , 어떻게 잘 활용할지에 대해서 내용 추가

---

## addon 관련

#### storybook viewport addon

- https://github.com/storybookjs/storybook/tree/master/addons/viewport
- defaultViewport 적용하기
- 다양한 viewport 설정할수 있게 configuration 하기

#### storybook knobs addon

- https://github.com/storybookjs/storybook/tree/master/addons/knobs

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
