---
title: 시각적 회귀 테스트 (Visual Regression Test)
createdDate: "2021-01-24"
updatedDate: "2021-01-24"
author: Ideveloper
tags:
  - frontend
  - test
image: visual.png
draft: false
---

## 시각적 회귀 테스트란?

작년 많은 프론트엔드 컨퍼런스에서, 시각적 회귀테스트 관련 세션들이 유독 많이들 등장했다. 이는 유닛테스트, 통합테스트 등등으로 해결되지 않았던 UI의 안정성 확보를 위해 좋은 서비스를 유저들에게 전달하기 위해서 제일 말단에 있는 테스트인 시각적 회귀테스트를 진행함으로써 렌더링된 UI 이미지들을 캡쳐하고 또 비교함으로써 프로덕을 안정성있게 유지해 나가는데에 필요했을 것이라고 생각이 들었다.

이러한 시각적 회귀테스트는 처음엔 개념이 생소했기 때문에 여러가지 알아본 내용들을 글에 적어보려한다.

![스크린샷 2021-01-14 오후 3 31 05](https://user-images.githubusercontent.com/26598542/105618915-50aeb480-5e30-11eb-8307-d27a6cdfcbe3.png)

---

## 시각적 회귀 테스트는 왜 필요할까?

여러 포스팅 글들을 살펴보았을때 많은 이유들이 있었지만, 아래 3가지 정도로 압축해보았다.

**functional vs design 관점**

- 많은 사람들이 기능적 회귀 테스트를 할때 이러한 기능의 테스트가 시각적 요소의 테스트까지 보장한다고 착각한다

**Visual Changelog 관점**

- 여러가지 컴포넌트 라이브러리들이나 디자인시스템에서 체인지 로그들을 보관하거나 비교함으로써 시각적 변화들을 기록할수 있다는 점이 있다. 또 버그의 증거를 찾을수 있다.

**e2e 테스트와 비교 관점**

- 클래스가 존재하는지 유무를 판단하는것은 해당 레이아웃이 제대로 보여지는지 혹은 깨졌는지 등등을 파악하기가 어려움

![_2020-12-20__9 37 40](https://user-images.githubusercontent.com/26598542/105618890-ff9ec080-5e2f-11eb-9023-a49a0ecdc785.png)

- https://speakerdeck.com/line_devday2020/visual-regression-testing-with-cypress 에서 발췌한 발표 내용중 하나

---

## 시각적 테스트는 어떻게 진행되는가 ? 혹은 그 과정

시각적 회귀테스트의 과정을 설명한 그림이 있었는데 이는 아래와 같고, 요약하면 아래와 같다.

1. 시나리오를 작성한다.
   - 어떠한 것을 캡쳐할지
   - 어디에 스크린샷을 보관할지
   - 어떠한 user interaction을 그 시나리오가 다루는지
2. 앞서 작성한 시나리오를 테스팅 툴로 캡쳐한다.
3. 툴은 최근에 캡쳐한 스크린샷을 기존것들과 비교하는 알고리즘을 수행한다. 비교에서의 차이점을 기록한 리포트를 작성한다.
4. 리포트를 분석하고 변화가 필요하다면 수정후 step2를 다시수행
5. 모든 필요한 변화가 끝나면 미래의 테스트를 위해 참조한 스크린샷 이미지들로 업데이트를 수행해야 한다.

![Untitled (2)](https://user-images.githubusercontent.com/26598542/105618895-104f3680-5e30-11eb-85e1-9a825922d8c4.png)

그리고 이러한 시각적 회귀테스트는 로컬디바이스에서 수행시 폰트 혹은 세세한 UI들이 다를수 있기 때문에 동일한 환경에서 테스트를 하는게 좋기 때문에 jenkins 같은 CI server를 연동해 많이들 테스트한다고 한다. 또 이러한 ci server를 연동하며, 아래와 같은 파이프라인을 카카오에서는 구축했다고도 한다.

![_2020-12-07__1 07 11](https://user-images.githubusercontent.com/26598542/105618896-11806380-5e30-11eb-8fe3-56553baeca07.png)

- [UI 테스트를 위한 여정](https://tv.kakao.com/channel/3693125/cliplink/414129351) 영상에서 발췌

---

## 관련 tool

시각적 회귀테스트를 구축하는 방법에는 크게 두가지 방법이 있었는데, 시각적회귀테스트의 core한 기능들을 지원하는 **오픈소스**를 활용해 자체 파이프라인을 구축하는방법과, 시각적 회귀테스트의 모든 파이프라인은 제작되어있고 이를 적용만 하면 되는 **솔루션**들을 활용하는 방법이 있었다.

`오픈소스`

대부분 cypress를 활용하거나 storybook을 활용하거나의 둘중 하나로 갈리는듯 하였다. 따라서 이러한 라이브러리들을 기존에 사용하고 있었다면 모르겠지만, 플러그인 활용을 위해 cypress, storybook등의 라이브러리를 다시 설치해야하는것에 대한 부담은 있을 것 같다는 생각이 들었다.

- 라인은 cypress
- 카카오는 storybook

아래 오픈소스들은 이미지 캡쳐,비교정도 해주는것이 대부분이라 아래 오픈소스들을 활용하더라도 위에 공유한 이미지에 해당하는 시각적 회귀테스트 파이프라인은 알아서 구축을 해야할듯 싶었다. 물론 그에 비해 아래 소개할 솔루션들에는 이러한 파이프라인들이 이미 만들어져있고, 적용만 하면 되었다.

그리고 이러한 오픈소스들에 대한 간략한 설명을 해보면 아래와 같고, 더 자세히 알아보려면 깃헙 repo에 들어가 보는것을 추천한다.

**BackstopJS (garris/BackstopJS)**

- 스타는 많음
- maintain은 계속되고 있는듯함
- CI상에서 연동해서 report를 받아볼수 있음
- 젠킨스 연동 https://github.com/garris/BackstopJS#test-report-integration-with-a-build-system-like-jenkinstravis
- 가이드문서가 친절하진 않음
- 관련 예시문서들도 많이 있진 않음
- cypress, storybook등과의 디펜던시는 없음
- init - test -approve 의 flow를 가짐

**Loki (oblador/loki)**

- maintain 되고 있긴함 (backstopjs 만큼은 아님)
- storybook 과 디펜던시가 있음
- backstopjs보다는 문서가 친절함 https://loki.js.org/getting-started.html
- aims to have easy setup, no to low maintenance cost, reproducible tests independent of which OS they are run on, runnable on CI and support all platforms storybook does.
- init - test - update - approve 의 flow를 가짐
- CI server에서 돌릴수 있음 https://loki.js.org/continuous-integration.html

**cypress**

https://docs.cypress.io/plugins/#visual-testing 시각적 회귀테스트들을 위한 여러 플러그인들이 존재했고 옆 링크를 가면 확인이 가능하다. 그중 대표적인 것은 아래 두가지 정도인듯 하였다.

- cypress visual regression
- cypress-image-snapshot

**storybook**

storybook도 시각적 회귀테스트를 위한 플러그인들이 존재했고 그중 대표적인 것이 아래와 같다.

- addon-storyshots - Basic StoryShots api
- addon-storyshots-puppeteer - Integration of StoryShots with puppeteer

`돈 내야하는 솔루션 (Free plan도 있음)`

- 시각적 회귀테스트 솔루션들의 대표적인 것들은 아래와 같고, 위 오픈소스들과 달리 위에서 소개한 아키텍쳐/시스템이 (PR올렸을때 regression test를 돌면서 변경된 코드에 대한 이미지 캡쳐 및 비교, PR리뷰 연동) 모두 구성되어있어 연동이 수월할듯 하였다.
- free plan 은 모두 매달 5000장까지 무료로 시각적 회귀테스트를 위한 캡쳐를 제공을 한다.
- 대부분 제공하는 기능들은 비슷했던 것 같다.

**Percy**

- shopify 디자인 시스템에서 사용
  - https://percy.io/Shopify/polaris-react/builds/8386060?utm_campaign=Shopify&utm_content=polaris-react&utm_source=github_status_public
  - https://percy.io/Shopify/polaris-react/builds-next/8366198/unchanged/475821309?browser=chrome&viewLayout=side-by-side&viewMode=new&width=1280
- 다른 외부시스템들과의 지원 많이 지원함
- 깃랩과의 연동
- 젠킨스와 같은 CI server 연동
- 컴포넌트/페이지 별 테스트
- 슬랙 연동
- ..etc

**Chromatic (storybook maintainer가 만든것)**

- storybook dependency
- 한달 5000장 스냅샷
  ci 연동 (젠킨스)
- gitlab 연동
- slack 연동
- ..etc

**[chromatic 과 percy 비교]**

위에 소개한 솔루션들을 비교한글도 있었는데 참고용으로 링크를 올리면 아래와 같다.

https://www.chromatic.com/compare/percy

---

## 고민들 / 고려해야 할 것들

그리고 이러한 시각적 회귀테스트를 하기위해 생길수 있는 고민들 혹은 고려해야 할것들이 있을것 같아 생각해서 정리를 해보았는데 이는 아래와 같다.

`고민들`

- full 페이지를 테스트해야할지 아니면 개별 컴포넌트(디자인시스템)을 테스트해야할지
- 테스트 시나리오는 어떤걸 작성해야하고 어떤 이점을 얻을지
  - 코드로직이나 UI변경에 따른 두려움이 없어지도록 시나리오를 유효한 시나리오로 잘 작성할 필요가 있음

`고려해야 할 것들`

- 테스트에 대한 가이드, 자동화 프로세스를 잘 정립해야함
- 의도적인 UI 변경에 대한 예외사항도 고려해야함 (ex 한 페이지에서의 UI/UX 개편)
- 정말로 이 테스트가 필요한지에 대한 고려 필요함
  - 카카오컨퍼런스에선 아래와 같은 기준들로 판단했다고 소개했음
    - 1. 내 서비스 UI문제가 생기면 다른 서비스에 영향을 주는가?
    - 2. 구축,운영에 들이는 노력보다 얻을수 있는 이점 큰가?

---

## Known issues

그리고 아래는 시각적 회귀테스트들을 구축하며 알려진 known issue들이다.

- platform에 따라 다르게 스냅샷 찍힘 (**이러한 이슈들은 로컬 디바이스 대신 CI server 에서 돌리는것으로 다들 해결하는 듯 하다**)
  - mac / window (다른폰트)
  - 앱기준으로는 aos/ios
- gif 포함된 경우 테스트 어려움
- UI변경에 아주 민감한테스트

---

## 시각적 회귀테스트 관련 참고하면 좋을 링크

- [Keeping a React Design System consistent](https://techblog.commercetools.com/keeping-a-react-design-system-consistent-f055160d5166)
- [Visual Regression Testing](https://medium.com/loftbr/visual-regression-testing-eb74050f3366)
- [실용적인 프론트엔드 테스트 전략 (2)](https://ui.toast.com/weekly-pick/ko_20190116#%EC%B6%94%EA%B0%80-%EC%8B%9C%EA%B0%81%EC%A0%81-%ED%9A%8C%EA%B7%80-%ED%85%8C%EC%8A%A4%ED%8A%B8)
- [Visual Regression Testing](https://baseweb.design/blog/visual-regression-testing/)
- [Guide To Visual Regression Testing With Visual Testing Tools](https://www.softwaretestinghelp.com/visual-validation-testing/)

---

## 마치며

시각적 회귀테스트를 통해, 코드로 작성되는 UI레벨의 제일 마지막 단계에서의 프로덕 안정성을 확보할수있는 유효한 테스트라는 생각이 많이 들었다. 다만 무작정 도입하는게 아니라, 여러가지들을 고려하며 구축,운영에 들어가는 노력 대비 테스트가 유효한지 충분한 고민이 필요하고, 유효한 테스트 시나리오들을 생각하고, 또 이러한 파이프라인을 잘 구축해야 이러한 효과들을 크게 얻을수 있을거라는 생각이 들었다.
