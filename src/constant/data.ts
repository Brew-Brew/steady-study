import {
  github,
  mail,
  mrt,
  plating,
  tistory,
  linkedin,
  woowa,
} from "../assets/icons";

export const bottomContent = [
  {
    buttonContent: "글 보기",
    icon: "book",
    link: "/blog/",
    text: "기술/일상 생각을 정리한 글",
  },
  {
    buttonContent: "이력서 보기",
    icon: "search",
    link: "/about/",
    text: "경험들을 정리한 이력서",
  },
  {
    buttonContent: "깃헙 방문",
    icon: "github",
    link: "https://github.com/Brew-Brew/",
    text: "깃헙 페이지 구경하기",
  },
];

export const abooutInfo = [
  {
    img: github,
    label: "Github",
    link: "https://github.com/Brew-Brew",
  },
  {
    img: mail,
    label: "E-mail: zx6658@gmail.com",
    link: "mailto:zx6658@gmail.com?subject=Hi ideveloper",
  },
  {
    img: tistory,
    label: "Ideveloper's Software Blog",
    link: "https://ideveloper2.tistory.com/",
  },
  {
    img: linkedin,
    label: "Linkedin",
    link: "https://www.linkedin.com/in/%EC%8A%B9%EA%B7%9C-%EC%9D%B4-965b53149/",
  },
];

export const mottoInfo = [
  "기회라는게 확실하면 모든사람이 잡는다.불확실성을 새로운경험과 교환하자",
  "비교는 비참해지고 교만해진다.",
  "쉬운선택은 어려운삶을 만들고 어려운 선택은 쉬운 삶을 만든다.",
  "거시적으로는 인내하고, 미시적으론 속도를 내자.",
  "실패를 두려워하지말자 실패는 실행에 옮겨봤다는 뜻이기 때문이다.",
];

export const pressInfo = [
  {
    title: "동국대, 해커톤 행사 성황",
    content:
      "동국대 총장상(소셜 이노베이터상)은 스마트폰 스쿨(대표:중앙대 이승규)팀의 ‘실버세대 교육용 스마트폰 튜토리얼 서비스’가 수상했다...",
    ref: "출처 : 한국대학신문(http://news.unn.net)",
    link: "http://news.unn.net/news/articleView.html?idxno=178310",
  },
  {
    title: "[신입사원 다이어리]신입 개발자도 다양한 여행 프로젝트 주도해요",
    content:
      "마이리얼트립 웹플랫폼개발팀에서 프론트엔드 개발을 담당하고 있는 1년 차 신입입니다. 프론트엔드 개발자는 웹 사이트에서 사용자가 직접 경험하는 ...",
    ref: "출처 : 아시아경제",
    link: "http://view.asiae.co.kr/news/view.htm?idxno=2019040911064367430",
  },
];

export const careerInfo = [
  {
    date: "2020.03 ~ 2022.08",
    description: "Food Tech",
    img: woowa,
    label: "우아한 형제들",
    skills: ["react", "typescript"],
    task: [
      {
        title: "B마트/배민스토어 통합 웹뷰 환경 개발",
        description: [
          {
            title: "웹뷰 개발환경에서의 여러 비즈니스 대응",
            content: [
              "<a href='https://ideveloper2.dev/blog/2021-05-02--a-b-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%B6%95/'>A/B 테스트 컴포넌트 개발</a>",
              "추천 UI 영역 개발",
              "장바구니,상품상세,주문내역,주문상세,쿠폰/이벤트지면..etc",
            ],
          },
          {
            title: "설계 / 성능 개선 / 테스트",
            content: [
              "<a href='https://ideveloper2.dev/blog/2020-08-22--%EC%83%81%ED%83%9C-%ED%8C%A8%ED%84%B4-state-pattern-%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-deep-link-%ED%9A%A8%EA%B3%BC%EC%A0%81%EC%9C%BC%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-aka-deep-link-manager/'>앱스킴, 인터페이스 효과적으로 관리하는 App Protocol Manager 개발</a>",
              "로그를 쉽게 관리하는 App Log Manager 개발",
              "api, 모델 테스트 코드 커버리지 확보",
              "기존 (vue + csr)환경의 페이지들을 신규 통합 프론트(react + ssr) 환경으로 옮기면서 기술 부채 해결 + 렌더링 성능 개선",
            ],
          },
        ],

        skills: ["react", "next.js", "typescript", "redux", "emotion.js"],
      },
      {
        title: "배달의민족 통합 주문 페이지 B마트/배민스토어 페이지 개발",
        description: [
          {
            title: "배달의 민족 주문페이지 내 B마트/배민스토어 주문페이지",
            content: [
              "주요 결제 연관 로직 추가 및 test 코드 작성 => 비즈니스 로직 안정성 확보",
              "컴포넌트 / 모델 구조 개선 =>  코드 가독성 확보",
              "다양한 연관 부서팀(결제,주문,..etc)과의 커뮤니케이션을 통해 개발 및 일정 협의",
            ],
          },
        ],

        skills: ["react", "typescript", "styled-components"],
      },

      {
        title: "B마트 프로모션 페이지 제작 builder 및 프로모션 페이지들 개발",
        description: [
          {
            title:
              "마케터 분들이 프로모션(이벤트) 페이지 제작에 사용하는 builder 개발 및 기능 추가 / 개선",
            content: [
              "섹션, 그룹, 아이템, 액션등의 레이어를 나눠 모델을 설계해 개발하여 다양한 프로모션 페이지 대응가능하도록 개선",
              "매달 개발자가 개발했던 이벤트 페이지들을 마케터분들이 제작가능하도록 설계하여 시스템화/자동화로 마케팅 효율 증대",
              "마케팅팀에 요구사항에 따른 여러 사용성 개선 및 기능 추가 (스와이퍼 제작 기능, 쿠폰발급, 딥링크 이동..etc)",
              "이미지 업로드 기능 s3, cloudfront 연동하도록 개선",
            ],
          },
          {
            title: "다양한 프로모션 페이지 개발",
            content: [
              "신규고객 유입 및 기존고객 재구매 유도, 기획자/디자이너와 함께 요구사항을 정립해가며 복잡한 요구사항을 협의하여 이벤트 페이지 개발",
            ],
          },
        ],

        skills: ["react", "typescript", "mobx"],
      },
      {
        title: "B마트 v1 디자인 시스템 개발",
        description: [
          {
            title: "초기의 B마트 디자인 시스템 개발",
            content: [
              "<a href='https://ideveloper2.dev/blog/2020-05-17--rollup-ts-%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0/'>rollup, ts, react 기반 디자인 시스템 개발</a>",
              "<a href='https://ideveloper2.dev/blog/2021-02-27--%EC%A0%A0%ED%82%A8%EC%8A%A4-%EB%B0%B0%ED%8F%AC-%ED%9B%84-%EC%8A%AC%EB%9E%99%EC%9C%BC%EB%A1%9C-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%B2%84%EC%A0%84-%EC%95%8C%EB%9E%8C-%EB%B0%9B%EA%B8%B0/'>젠킨스 연동으로 배포 방식 개선 및 슬랙알람 연동 (버전, 배포 성공/실패여부)</a>",
              "<a href='https://ideveloper2.dev/blog/2021-01-24--%EC%8B%9C%EA%B0%81%EC%A0%81-%ED%9A%8C%EA%B7%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-visual-regression-test/'>시각적 회귀테스트 도입으로 디자인시스템 개발 안정성 확보</a>",
            ],
          },
        ],

        skills: [
          "react",
          "typescript",
          "rollup.js",
          "emotion.js",
          "docz",
          "loki",
        ],
      },
      {
        title: "팀 문화를 만들어 나감",
        description: [
          {
            title: "하나의 팀으로써 유기적으로 협업하고 공유하는 문화",
            content: [
              "신규 입사자 온보딩 프로세스 정립 및 온보딩 프로젝트 기획 및 문서화",
              "내 작업뿐만 아니라, 동료의 작업까지도 항상 챙기며, 일정 체크에도 힘써 줌으로써 도움이 될수 있는 동료가 되기 위해 항상 노력함",
              "하나의 서비스를 함께 만들어간다는 생각을 바탕으로 한 지속적으로 공유하는 문화",
              "팀 내 정보공유 채널 생성 제안 및 <a href='https://ideveloper2.dev/blog/2022-01-25--emotion%EC%9C%BC%EB%A1%9C-%ED%8C%8C%EC%95%85%ED%95%B4%EB%B3%B4%EB%8A%94-css-in-js%EC%9D%98-%EC%9D%B4%EB%AA%A8%EC%A0%80%EB%AA%A8/'>기술 관련 아티클</a> 공유 -> 전사 프론트엔트 공유채널로 확장(지식/기술공유)",
              "매주 빠짐없이 주간 회고를 주도함 (배포 일정 체크/ 이슈 체크 / 논의)",
              "코드리뷰를 통해 동료가 작업하는 도메인과 코드작성 의도파악,히스토리 파악, 더나은 프로덕트를 만들기 위한 필수 불가결한 과정이라 생각하며 함께하고 있음 (PR 템플릿 생성..etc)",
            ],
          },
        ],

        skills: ["soft skill"],
      },
    ],
  },
  {
    date: "2018.08 ~ 2020.02",
    description: "Travel Tech",
    img: mrt,
    label: "myrealtrip",
    skills: ["react", "typescript", "webpack", "next.js", "ruby on rails"],
    task: [
      {
        title: "마이리얼트립 전체 신규 웹 front 환경 구축 ",
        description: [
          {
            title: "css-in-js media 라이브러리 제작",
            content: [
              "<a href='https://github.com/Brew-Brew/css-in-js-media'>emotion, styled component 같은 css-in-js 라이브러리들을 활용할때 반응형을 쉽게 대응하기 위해 만든 유틸을 라이브러리로 제작</a>",
            ],
          },
          {
            title: "마이리얼트립 전체 신규 웹 front 구축",
            content: [
              "rails 기반 웹 -> ts + next.js + emotion.js 조합 신규 웹",
              "cypress e2e테스트를 통한 안정성있는 프로덕개발을 위한 노력",
              "상태관리 및 설계단 참여",
            ],
          },
        ],
        participant: "3명",
        skills: ["typescript", "next.js", "emotion.js", "react", "context api"],
      },
      {
        title: "호텔메타서치 프로젝트",
        description: [
          {
            title:
              "기존: 부킹닷컴 링크로연결 -> 개선: 각 호텔 사이트들의 상품들을 리스트페이지, 상세페이지에서 확인할수 있도록 개선",
            content: [
              "웹뷰 대응 및 신규 인터페이스 협의 및 개발",
              "UI 컴포넌트 제작",
              "상태관리 및 설계단 참여",
            ],
          },
        ],
        participant: "2명",
        skills: ["react", "context api"],
      },
      {
        title: "웹 상품 상세페이지 view ruby on rails -> react 리뉴얼",
        description: [
          {
            title: "웹 상품 상세페이지 리뉴얼",
            content: [
              "기존 ruby on rails 레거시 파악후 제거 -> react로 전환",
              "사이트 내 중요페이지를 react로 마이그레이션 -> 추후 기능 추가 용이",
              "더 나은 유저경험 전달",
            ],
          },
        ],

        participant: "1명",
        skills: ["react"],
      },

      {
        title: "브레이즈 이벤트 삽입",
        description: [
          {
            title: "브레이즈 이벤트 삽입",
            content: [
              "브레이즈 스크립트 웹, 웹뷰 삽입",
              "마케팅 팀에서 캠페인 제작을 위한 웹 페이지내 유저 스토리별 이벤트 삽입(회원가입~구매 등등 user 이벤트일어나는 부분)",
            ],
          },
        ],

        participant: "1명",
        skills: ["react"],
      },
      {
        title: "서스테이닝 이슈들, 성능개선",
        description: [
          {
            title: "서스테이닝 이슈들, 성능개선",
            content: [
              "bundle analyzer 도입 제의및 적용을 통해 성능개선의 초석을 다짐",
              "자잘한 기존 rails 페이지들 개선하면서 react로 전환",
              "협력업체들(naver, 마케팅스크립트 대행사..etc)과의 커뮤니케이션을 통한 페이지 개선작업들",
              "sustaining 이슈들을 대응하면서 사업,운영팀에 기여",
            ],
          },
        ],

        participant: "팀 전원",
        skills: ["ruby on rails", "react", "react hook"],
      },
    ],
  },
  {
    date: "2018.01 ~ 2018.08",
    description: "Food Tech",
    img: plating,
    label: "plating",
    skills: ["react", "webpack", "node.js"],
    task: [
      {
        title:
          "React 기반의  신규런칭  서비스  관련(b2b 회사용  도시락  판매  사이트)",
        participant: "2명, (본인, 인턴)",
        description: [
          {
            title: "React 기반의  신규런칭  서비스 설계/개발/운영",
            content: [
              "웹사이트  프로젝트  설계 및 일정 매니징",
              "기존 api 수정",
              "프론트 페이지들 개발",
            ],
          },
        ],

        skills: ["react", "redux", "redux-saga", "node.js"],
      },
      {
        title: "React 기반의 배송현황 확인 웹",
        participant: "1명",
        description: [
          {
            title:
              "각 지역마다 pos 프로그램 일일이 들어가서 확인해야 했던 운영팀의 효율 증가",
            content: ["큰 상태관리는 필요없었으므로 react만으로 구현"],
          },
        ],
        skills: ["react"],
      },
      {
        title:
          "서울지역만 되던 새벽배송 -> 전지역  새벽배송  확장  (node.js  기존  중앙  api  수정)",
        participant: "1명",
        description: [
          {
            title:
              "서울지역만 되던 새벽배송 -> 전지역  새벽배송  확장  (node.js  기존  중앙  api  수정)",
            content: [
              "매출 증대에 기여",
              "기존 legacy 코드들의 다른 서비스들과의 dependency 분석 후 개발",
            ],
          },
        ],
        skills: ["node.js"],
      },
    ],
  },
];

export const skillInfo = [
  {
    description: [
      "꼼꼼히 요구사항과 기획을 파악하며 완벽히 개발을 진행하려 노력 합니다.",
      "개발 직군이나 비 개발 직군 모두 전문성을 바탕으로 업무를 진행하고 있으므로 항상 다른 팀에 귀 기울이며 열린 마음으로 서로가 이해 할 수 있는 말로 대화하려 노력 중입니다.",
      "본인의 일이 아니더라도 문제 상황에 적극적으로 도움을 주려 노력합니다.",
      "혼자 빛나는 사람보다는, 함께할때 더 빛나는 사람이 되고 싶습니다. 협업을 중요시 하고, 팀내에서의 협업 뿐 아니라, 타팀과의 소통을 위해 노력합니다.",
      "상황에 대한 공유 및 정리능력이 뛰어납니다.",
      "새로운 기술에 호기심을 갖고, 적극적으로 탐구합니다.",
      "코드 리뷰에 대해 매우 긍정적이며, 함께 더 좋은 서비스를 만드는 힘은 리뷰에서 나온다 생각하며, 의견을 주저없이 제시합니다.",
    ],
    title: "Soft Skills",
  },
  {
    description: [
      "여러 기법을 활용해 불필요한 렌더링을 막고, 렌더링 최적화를 할 수 있습니다.",
      "번들 사이즈 분석 및, 번들 사이즈 최적화를 할 수 있습니다.",
      "hook을 사용해 비즈니스 로직을 적절히 분리해 낼수 있습니다.",
      "redux, context api등의 상태관리에 대해 적절한 상황에 사용할 수 있습니다.",
      "next.js를 활용해 ssr에 대응 할 수 있습니다.",
    ],
    title: "React",
  },
  {
    description: [
      "웹표준을 지키려 노력합니다.",
      "Sass 등 CSS Preprocessor를 사용할 수 있고, css module을 활용할 수 있습니다.",
      "css-in-js (styled-component , emotion) 기법을 활용할 수 있습니다",
      "BEM등의 CSS 방법론을 적용할 수 있습니다.",
      "크로스 브라우징에 대응할 수 있습니다.",
    ],
    title: "HTML/CSS",
  },
  {
    description: [
      "ES2015 이후의 자바스크립트 문법에 익숙합니다.",
      "babel, webpack 등의 사용에 익숙합니다.",
      "typescript를 사용하며 적절한 타입을 활용할 수  있습니다.",
    ],
    title: "Javascript/Typescript",
  },
];

export const awardsInfo = [
  {
    title: "우아한형제들 사내 해커톤 '우아톤' 최우수상 - 2020",
    from: "우아한형제들",
    content:
      "개인화 된 컨텐츠를 배민 메인 홈에서 제공하는 프로젝트 '응답하라 배민' 제작 - UI개발 담당",
  },
  {
    title: "글로벌 전문 개발자 (파트 부문) - 2019",
    from: "공개SW개발자센터(KOSSLab)",
    content:
      "국내외 공개 sw 프로젝트 개발에 참여할수있는 개발자 육성 및 지원프로그램 ",
  },
  {
    title: "오픈소스 컨트리뷰톤 과학기술정보통신부장관상 - 2018",
    from: "정보통신산업진흥원",
    content:
      "여러 컨트리뷰션 주제중, 크로미움 프로젝트에 2인멘토, 약 10여명의 구성된 팀의 구성원으로써 컨트리뷰트를 하는 프로젝트였습니다.",
  },
  {
    title: "멋쟁이사자처럼 5기/ 6기 운영진 - 2017~2018",
    from: "멋쟁이 사자처럼 중앙대",
    content:
      "5기/6기 활동을 했으며, 6기에는 운영진 활동을 통해 퇴근 후 참여하며, 웹 관련 지식 공유에 힘썼습니다.",
  },
  {
    title: "오픈소스 컨트리뷰톤 우수상- 2017",
    from: "정보통신산업진흥원",
    content:
      "덤블도어 교수님이라는 node.js기반의 오픈소스 슬랙 챗봇 프로젝트이며 게이미피케이션요소를 추가한 챗봇을 만드는 프로젝트였습니다. 백엔드 팀장을 맡았습니다.",
  },
  {
    title: "동국대 멋쟁이사자처럼 해커톤 동국대 총장상- 2017",
    from: "동국대 융합소프트웨어교육원",
    content:
      "실버세대를 위한 스마트폰 튜토리얼 웹사이트라는 아이디어로 떠올려, 팀을꾸려 팀장으로써 팀을 모으고 ruby on rails를 기반으로 서비스를 제작, 개발하였었습니다.",
  },
  {
    title: "중앙대 always-on공모전 장려상 - 2017",
    from: "중앙대학교",
    content:
      "일반인을 위한 사물인터넷 이벤트 제작 웹과 하드웨어의 중간다리 역할을 하는 api서버를 node.js기반으로 개발하였습니다.",
  },
  {
    title: "거점 포트폴리오경진대회 최우수상 - 2017",
    from: "고려대학교",
    content: "",
  },
  {
    title: "포트폴리오 경진대회 창의ict공과대학장상 - 2017",
    from: "중앙대학교",
    content: "",
  },
];

export const contributionInfo = [
  {
    from: "reduxjs / redux",
    list: [
      {
        title: "feat: arrange import section of combineReducers",
        link: "https://github.com/reduxjs/redux/pull/3914",
      },
    ],
  },
  {
    from: "facebook / create-react-app",
    list: [
      {
        title: "Suggest `reactstrap` instead of `react-bootstrap`",
        link: "https://github.com/facebook/create-react-app/pull/4703",
      },
    ],
  },
  {
    from: "facebook / react",
    list: [
      {
        title: "Remove irrelevant suggestion of a legacy method from a warning",
        link: "https://github.com/facebook/react/pull/13169",
      },
    ],
  },
  {
    from: "reactjs / reactjs.org",
    list: [
      {
        title: "Fix node engines",
        link: "https://github.com/reactjs/reactjs.org/pull/1002",
      },
      {
        title: "Fix Issue about addons.md's Wrong links",
        link: "https://github.com/reactjs/reactjs.org/pull/1023",
      },
    ],
  },
  {
    from: "Lemoncode /react-by-sample",
    list: [
      {
        title: "fix: fix wrong links in readme and update readme examples",
        link: "https://github.com/Lemoncode/react-by-sample/pull/177",
      },
    ],
  },
  {
    from: "kentcdodds / kentcdodds.com",
    list: [
      {
        title: "doc: add korean translation of useMemo and useCallback",
        link: "https://github.com/kentcdodds/kentcdodds.com/pull/200",
      },
    ],
  },
  {
    from: "ant-design / ant-design",
    list: [
      {
        title: "doc: update Table component's selectedRowKeys wrong type",
        link: "https://github.com/ant-design/ant-design/pull/17990",
      },
    ],
  },
  {
    from: "emotion-js / emotion",
    list: [
      {
        title:
          "add `css-in-js media library` to readme ecosystem (add my library : https://github.com/Brew-Brew/css-in-js-media)",
        link: "https://github.com/emotion-js/emotion/pull/1441",
      },
    ],
  },
  {
    from: "styled-components / awesome-styled-components",
    list: [
      {
        title: "doc: add 'css-in-js-media' to helpers",
        link:
          "https://github.com/styled-components/awesome-styled-components/pull/122",
      },
    ],
  },
  {
    from: "storybookjs / storybook",
    list: [
      {
        title:
          "doc: update readme of addon viewport about configure section more accurately",
        link: "https://github.com/storybookjs/storybook/pull/10605",
      },
    ],
  },
];

export const storyInfo = [
  {
    title: "“첫번째 프론트엔드 엔지니어”로 합류하면 어떤 일들을 해야할까?",
    link:
      "https://medium.com/verticah/%EC%B2%AB%EB%B2%88%EC%A7%B8-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4-%EB%A1%9C-%ED%95%A9%EB%A5%98%ED%95%98%EB%A9%B4-%EC%96%B4%EB%96%A4-%EC%9D%BC%EB%93%A4%EC%9D%84-%ED%95%B4%EC%95%BC%ED%95%A0%EA%B9%8C-78c7d891e3a5",
    description:
      "스타트업 첫번째 프론트 엔지니어로 합류해 어떻게 일해왔는지에 대해 작성한 글",
  },
  {
    title: "학생에서 개발자가 되기까지 (feat:병역특례를 마무리하며)",
    link:
      "https://ideveloper2.dev/blog/2020-02-18--%ED%95%99%EC%83%9D%EC%97%90%EC%84%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EB%90%98%EA%B8%B0%EA%B9%8C%EC%A7%80-feat-%EB%B3%91%EC%97%AD%ED%8A%B9%EB%A1%80%EB%A5%BC-%EB%A7%88%EB%AC%B4%EB%A6%AC%ED%95%98%EB%A9%B0/",
    description:
      "병역특례 기간을 회고한 글이고, 그 기간동안 학생에서 개발자가 된 후 어떻게 성장하였고 어떠한점들을 느꼈는지 작성한 글",
  },
  {
    title: "마이리얼트립 프론트엔드팀은 어떻게 협업하고 있을까?",
    link: "https://medium.com/myrealtrip-product/frontend-cowork-9cdb125da1ef",
    description:
      "협업에 관한 생각들, 그리고 어떻게 사내 협업문화를 만들어나갔는지 사내 기술블로그에 작성한 글",
  },
  {
    title: "1년차 병아리 개발자 2018년 회고",
    link: "https://ideveloper2.tistory.com/165",
    description:
      "회사에서 개발자로 일하기 시작하며, 개발자라는 타이틀을 가지고 본인의 생각을 정리하며 1년을 회고한 글",
  },
  {
    title: "일일커밋 6개월 회고",
    link: "https://ideveloper2.tistory.com/153",
    description:
      "꾸준함을 바탕으로 일일커밋 6개월을 진행하고 느꼇던 생각들, 그리고 어떻게 일일커밋 6개월을 하였는지에 대해 정리 한 글",
  },
];
