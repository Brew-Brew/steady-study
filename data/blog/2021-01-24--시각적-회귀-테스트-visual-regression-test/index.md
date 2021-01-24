---
title: 시각적 회귀 테스트 (Visual Regression Test)
createdDate: "2021-01-24"
updatedDate: "2021-01-24"
author: Ideveloper
tags:
  - frontend
  - test
image: welcoming.png
draft: false
---

## 시각적 회귀 테스트는 왜 필요할까?

**e2e 테스트와 비교 관점**

- 클래스가 존재하는지 유무를 판단하는것은 해당 레이아웃이 제대로 보여지는지 혹은 깨졌는지 등등을 파악하기가 어려움

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd7d1668-5746-4992-92d1-0fa51c4a1463/_2020-12-20__9.37.40.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd7d1668-5746-4992-92d1-0fa51c4a1463/_2020-12-20__9.37.40.png)

**functional vs design 관점**

- 많은 사람들이 기능적 회귀 테스트를 할때 이러한 기능의 테스트가 시각적 요소의 테스트까지 보장한다고 착각한다

**Visual Changelog 관점**

- 여러가지 컴포넌트 라이브러리들이나 디자인시스템에서 체인지 로그들을 보관하거나 비교함으로써 시각적 변화들을 기록할수 있다는 점이 있다. 또 버그의 증거를 찾을수 있다.

**B마트 서비스 관점에서 어떠한 이점이 있을지 더 생각해보기 (중요!~!!!!!!!@!@!@!)**

- 디자인 시스템을 여러군데 사용하고 있어서 디자인시스템 변경시 깨지는 레이아웃 있는지 일괄체크
  - 이전에 Block, Modal 같은 레이아웃에 큰 영향 끼치는 컴포넌트들 리팩토링하고 디자인시스템 버전업을 시키고 일일히 확인했었음
  - 체크할 페이지
    - 각 페이지별 case를 정의해야 하긴 할듯함.
    - 장바구니페이지, 쿠폰모음 페이지 시범적으로?

## 시각적 테스트는 어떻게 진행되는가 ? 혹은 그 과정

1. 시나리오를 작성한다.
   - 어떠한 것을 캡쳐할지
   - 어디에 스크린샷을 보관할지
   - 어떠한 user interaction을 그 시나리오가 다루는지
2. 앞서 작성한 시나리오를 테스팅 툴로 캡쳐한다.
3. 툴은 최근에 캡쳐한 스크린샷을 기존것들과 비교하는 알고리즘을 수행한다. 비교에서의 차이점을 기록한 리포트를 작성한다.
4. 리포트를 분석하고 변화가 필요하다면 수정후 step2를 다시수행
5. 모든 필요한 변화가 끝나면 미래의 테스트를 위해 참조한 스크린샷 이미지들로 업데이트를 수행해야 한다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/44366336-373f-4ced-9770-168a9b799561/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/44366336-373f-4ced-9770-168a9b799561/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/748fc650-0ee8-40dc-b40a-44cc4c87c559/_2020-12-07__1.07.11.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/748fc650-0ee8-40dc-b40a-44cc4c87c559/_2020-12-07__1.07.11.png)

**테스트 시나리오 개략적으로 생각**

- PR이 올라왔을때 regression test 돌고 실패,성공에 대한 alarm
  - 실패시 관련 diff 이미지 링크
- 성공여부에 따라 merge가능여부 조절? (가능할지 모르겠음)
- merge

## 관련 tool

`오픈소스`

대부분 third party 라이브러리로 cypress를 활용하거나 storybook을 활용하거나의 둘중 하나로 갈리는듯

- (기존에 사용하고 있었다면 모르겠지만, 플러그인 활용을 위해 cypress, storybook등의 라이브러리를 다시 설치해야하는것에 대한 부담은 있음)

아래 오픈소스들은 이미지 캡쳐,비교정도 해주는것이 대부분. 따라서 아래 오픈소스들을 활용하더라도 위 도표에 있는 시스템을 구축해야할듯함

- 라인은 cypress
- 카카오는 storybook

**BackstopJS (garris/BackstopJS)**

- 스타는 많음 maintain은 계속되고 있는듯함
- CI상에서 연동해서 report를 받아볼수 있음
- 젠킨스 연동 https://github.com/garris/BackstopJS#test-report-integration-with-a-build-system-like-jenkinstravis
- 가이드문서가 친절하진 않음
- 관련 예시문서들도 많이 있진 않음
- cypress, storybook등과의 디펜던시는 없음
- init - test -approve

**Loki (oblador/loki)**

- maintain 되고 있긴함 (backstopjs 만큼은 아님)
- storybook 과 디펜던시가 있음
- backstopjs보다는 문서가 친절함 https://loki.js.org/getting-started.html
- aims to have easy setup, no to low maintenance cost, reproducible tests independent of which OS they are run on, runnable on CI and support all platforms storybook does.
- init - test - update - approve
- CI server에서 돌릴수 있음 https://loki.js.org/continuous-integration.html

**cypress**

- https://docs.cypress.io/plugins/#visual-testing
  Visual Testing

- cypress visual regression
- cypress-image-snapshot
  ..etc

**storybook**

Visual Testing with Storybook

- addon-storyshots - Basic StoryShots api
- addon-storyshots-puppeteer - Integration of StoryShots with puppeteer

`돈 내야하는 솔루션 (Free plan도 있음)`

- 위 오픈소스들과 달리 위에서 소개한 아키텍쳐/시스템이 (PR올렸을때 regression test를 돌면서 변경된 코드에 대한 이미지 캡쳐 및 비교, PR리뷰 연동) 모두 구성되어있어 연동이 수월할듯함
- free plan 은 모두 매달 5000장까지 무료로 제공

**Percy**

- shopify 디자인 시스템에서 사용
- https://percy.io/Shopify/polaris-react/builds/8386060?utm_campaign=Shopify&utm_content=polaris-react&utm_source=github_status_public
- https://percy.io/Shopify/polaris-react/builds-next/8366198/unchanged/475821309?browser=chrome&viewLayout=side-by-side&viewMode=new&width=1280
- https://percy.io/
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

`chromatic 과 percy 비교`

https://www.chromatic.com/compare/percy

## 시각적 회귀테스트 관련 참고링크

[Keeping a React Design System consistent](https://techblog.commercetools.com/keeping-a-react-design-system-consistent-f055160d5166)

[Visual Regression Testing](https://medium.com/loftbr/visual-regression-testing-eb74050f3366)

[실용적인 프론트엔드 테스트 전략 (2)](https://ui.toast.com/weekly-pick/ko_20190116#%EC%B6%94%EA%B0%80-%EC%8B%9C%EA%B0%81%EC%A0%81-%ED%9A%8C%EA%B7%80-%ED%85%8C%EC%8A%A4%ED%8A%B8)

[Visual Regression Testing](https://baseweb.design/blog/visual-regression-testing/)

[Guide To Visual Regression Testing With Visual Testing Tools](https://www.softwaretestinghelp.com/visual-validation-testing/)

## 고민들 / 고려해야 할 것들

- 풀페이지를 테스트해야할지 아니면 개별 컴포넌트(디자인시스템)을 테스트해야할지
  - 대부분 풀페이지 테스트를 함
    - 개별 컴포넌트만 테스트하면 그런 컴포넌트들이 조합될때 또다른 UI 이슈가 생겨서 그런듯..?
- 테스트 시나리오는 어떤걸 작성해야할지 또 커버리지는 어떻게 파악할지
- 테스트에 대한 가이드, 자동화 프로세스를 잘 정립해야함
- 의도적인 UI 변경에 대한 예외사항도 고려해야함
- 정말로 이 테스트가 필요한지에 대한 고려 필요함
  - 카카오컨퍼런스에선 아래와 같은 기준들로 판단함
    - 내 서비스 UI문제가 생기면 다른 서비스에 영향을 주는가? (yes, 디자인시스템 같이 쓰고있음)
    - 구축,운영에 들이는 노력보다 얻을수 있는 이점 큰가? (일단 그럴걸로 보고있음. 변경되는 UI에 대한 쉬운 감지..?, 다만 어떤 포인트들을 테스트할지가 매우 중요할것으로 보임)
      - 어떤걸 테스트하고 어떤 이점을 얻을지에 대해서도 면밀히 생각해야할것으로 보임.
      - 코드로직이나 UI변경에 따른 두려움이 없어질듯함.

## Known issues

- platform에 따라 다르게 스냅샷 찍힘
  - mac / window (다른폰트)
  - 앱기준으로는 안드/ios 다를듯
  - **이러한 이슈들은 로컬 디바이스 대신 CI server 에서 돌리는것으로 다들 해결하는듯함**
- gif 포함된 경우 테스트 어려움
- UI변경에 아주 민감한테스트

## 해야 될 순서 생각

- **우선 어떤것들을 얻을수 있을지, 어떤것들을 테스트해보면 좋을지 생각 및 논의**
  - pull page 테스트 할지, 디자인시스템만 테스트 할지
  - 테스트 시나리오 생각
- **기술 선정 및 검토**
  - 어떤 라이브러리 활용해서 테스트 진행할지
  - 구축할때 어떤것들이 필요할지 생각
    - CI server 어떻게 구축하고 어떤게 필요할지 (젠킨스,etc)
    - known issue들은 없는지
