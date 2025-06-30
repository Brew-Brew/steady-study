import {
  github,
  mail,
  mrt,
  plating,
  blog,
  linkedin,
  woowa,
  verticah,
} from '../assets/icons';

export const bottomContent = [
  {
    buttonContent: '글 보기',
    icon: 'book',
    link: '/blog/',
    text: '기술/일상 생각을 정리한 글',
  },
  {
    buttonContent: '이력서 보기',
    icon: 'search',
    link: '/about/',
    text: '경험들을 정리한 이력서',
  },
  {
    buttonContent: '깃헙 방문',
    icon: 'github',
    link: 'https://github.com/Brew-Brew/',
    text: '깃헙 페이지 구경하기',
  },
];

export const abooutInfo = [
  {
    img: github,
    label: 'Github',
    link: 'https://github.com/Brew-Brew',
  },
  {
    img: mail,
    label: 'E-mail: zx6658@gmail.com',
    link: 'mailto:zx6658@gmail.com?subject=Hi ideveloper',
  },
  {
    img: blog,
    label: "Ideveloper's Software Blog",
    link: 'https://ideveloper2.dev/',
  },
  {
    img: linkedin,
    label: 'Linkedin',
    link: 'https://www.linkedin.com/in/seungkyu-lee-965b53149/',
  },
];

export const mottoInfo = [
  '기회라는게 확실하면 모든사람이 잡는다.불확실성을 새로운경험과 교환하자',
  '비교는 비참해지고 교만해진다.',
  '쉬운선택은 어려운삶을 만들고 어려운 선택은 쉬운 삶을 만든다.',
  '거시적으로는 인내하고, 미시적으론 속도를 내자.',
  '실패를 두려워하지말자 실패는 실행에 옮겨봤다는 뜻이기 때문이다.',
];

export const pressInfo = [
  {
    title: '동국대, 해커톤 행사 성황',
    content:
      '동국대 총장상(소셜 이노베이터상)은 스마트폰 스쿨(대표:중앙대 이승규)팀의 ‘실버세대 교육용 스마트폰 튜토리얼 서비스’가 수상했다...',
    ref: '출처 : 한국대학신문(http://news.unn.net)',
    link: 'http://news.unn.net/news/articleView.html?idxno=178310',
  },
  {
    title: '[신입사원 다이어리]신입 개발자도 다양한 여행 프로젝트 주도해요',
    content:
      '마이리얼트립 웹플랫폼개발팀에서 프론트엔드 개발을 담당하고 있는 1년 차 신입입니다. 프론트엔드 개발자는 웹 사이트에서 사용자가 직접 경험하는 ...',
    ref: '출처 : 아시아경제',
    link: 'http://view.asiae.co.kr/news/view.htm?idxno=2019040911064367430',
  },
];

export const careerInfo = [
  {
    date: '2022.12 ~ ing',
    description: 'FinTech',
    img: github,
    label: '버티카 (Verticah)',
    img: verticah,
    imgAlt: 'VERTICAH',
    task: [
      {
        title: `<a href="https://clobe.ai">CLOBE(구 레베뉴마켓)</a> 서비스 개발`,
        skills: [
          'react',
          'typescript',
          'next.js',
          'react-query',
          'zustand',
          'turborepo',
          'emotion.js',
          'aws',
        ],
        description: [
          {
            title: 'CLOBE(구 레베뉴마켓) 초기 구축/설계/개발/운영',
            content: [
              '유일한 프론트엔지니어로 기업 자금관리/조달을 도와 기업의 성장을 도와주는 CLOBE(구 레베뉴마켓) 초기 구축/설계/개발/운영',
              'Turborepo를 활용한 모노레포 환경 개발 및 CI/CD 구축 (github actions)',
              'SSR + ECS 기반 대고객 서비스 운영 / SSG + S3 + CloudFront 기반 어드민 서비스 운영',
            ],
          },
          {
            title: '성능 최적화를 위한 기여',
            content: [
              '서비스 Light house 성능 점수를 64점에서 90점으로 향상',
              '서비스 내 주요액션(재무데이터 라벨링 과정)의 INP(Interaction to Next Paint)를 CPU 성능 4분의 1 기준의 디바이스라 가정했을때 1.5초~4초에서 360ms ~ 540ms정도로 개선',
            ],
          },
          {
            title: '프로덕트 방향성과 팀 생산성 향상을 위한 기여',
            content: [
              'Playwright 기반 E2E 테스트 도입으로 서비스 안정성과 회귀 테스트 자동화 체계 구축',
              'Swagger 기반 API 명세에서 TypeScript 타입 자동 추출 크롬 확장 도구 개발',
              'Figma 플러그인 개발(이미지 S3 업로드 자동화, svg react 컴포넌트 추출), 운영 효율성과 콘텐츠 관리 편의성 개선',
              '디자이너 합류 후 디자인 시스템 정립 및 협업 방식 개선에 참여하여, 디자이너-개발자 간 소통 효율화',
              '백엔드 개발자들도 프론트엔드 개발에 쉽게 참여할 수 있도록 cursor rule 등 코드 컨벤션을 정립, 코드 일관성을 확보하고 개발 및 QA 과정에서 소요되는 시간을 줄이기 위해 노력함',
              '개발 외에도 팀의 일하는 방식과 프로덕트 방향성에 기여할 수 있는 다양한 방법을 주도적으로 실험 및 개선',
            ],
          },
        ],
      },
    ],
  },
  {
    date: '2020.03 ~ 2022.08',
    description: 'Food Tech',
    img: woowa,
    label: '우아한 형제들',
    skills: ['react', 'typescript'],
    task: [
      {
        title: 'B마트/배민스토어 통합 웹뷰 환경 개발',
        description: [
          {
            title: '웹뷰 개발환경에서의 여러 비즈니스 대응 (설계/개발/운영)',
            content: [
              '기존 vue환경의 페이지들을 react 환경으로 이관',
              "<a href='https://ideveloper2.dev/blog/2020-08-22--%EC%83%81%ED%83%9C-%ED%8C%A8%ED%84%B4-state-pattern-%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-deep-link-%ED%9A%A8%EA%B3%BC%EC%A0%81%EC%9C%BC%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-aka-deep-link-manager/'>앱스킴, 인터페이스 효과적으로 관리하는 App Protocol Manager 개발</a>",
              "추천 화면 대응을 위해 <a href='https://ideveloper2.dev/blog/2021-05-02--a-b-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%B6%95/'>A/B 테스트 컴포넌트 개발</a>",
            ],
          },
        ],

        skills: ['react', 'next.js', 'typescript', 'redux', 'emotion.js'],
      },
      {
        title: 'B마트 프로모션 페이지 제작 builder 및 프로모션 페이지들 개발',
        description: [
          {
            title:
              '마케터 분들이 프로모션(이벤트) 페이지 제작에 사용하는 builder 개발 및 기능 추가 / 개선',
            content: [
              '섹션, 그룹, 아이템, 액션등의 레이어를 나눠 모델을 설계해 개발하여 다양한 프로모션 페이지 대응가능하도록 개선',
              '매달 개발자가 개발했던 이벤트 페이지들을 마케터분들이 제작가능하도록 설계하여 시스템화/자동화로 마케팅 효율 증대',
              '마케팅팀에 요구사항에 따른 여러 사용성 개선 및 기능 추가 (스와이퍼 제작 기능, 쿠폰발급, 딥링크 이동..etc)',
            ],
          },
          {
            title: '다양한 프로모션 페이지 개발',
            content: [
              '신규고객 유입 및 기존고객 재구매 유도, 기획자/디자이너와 함께 요구사항을 정립해가며 복잡한 요구사항을 협의하여 이벤트 페이지 개발',
            ],
          },
        ],

        skills: ['react', 'typescript', 'mobx'],
      },
      {
        title: 'B마트 v1 디자인 시스템 개발',
        description: [
          {
            title: '초기의 B마트 디자인 시스템 개발',
            content: [
              "<a href='https://ideveloper2.dev/blog/2020-05-17--rollup-ts-%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0/'>rollup, ts, react 기반 디자인 시스템 개발</a>",
              "<a href='https://ideveloper2.dev/blog/2021-02-27--%EC%A0%A0%ED%82%A8%EC%8A%A4-%EB%B0%B0%ED%8F%AC-%ED%9B%84-%EC%8A%AC%EB%9E%99%EC%9C%BC%EB%A1%9C-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%B2%84%EC%A0%84-%EC%95%8C%EB%9E%8C-%EB%B0%9B%EA%B8%B0/'>젠킨스 연동으로 배포 방식 개선 및 슬랙알람 연동 (버전, 배포 성공/실패여부)</a>",
              "<a href='https://ideveloper2.dev/blog/2021-01-24--%EC%8B%9C%EA%B0%81%EC%A0%81-%ED%9A%8C%EA%B7%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-visual-regression-test/'>시각적 회귀테스트 도입으로 디자인시스템 개발 안정성 확보</a>",
            ],
          },
        ],

        skills: [
          'react',
          'typescript',
          'rollup.js',
          'emotion.js',
          'docz',
          'loki',
        ],
      },
      {
        title: '팀 문화를 만들어 나감',
        description: [
          {
            title: '하나의 팀으로써 유기적으로 협업하고 공유하는 문화',
            content: [
              "<a href='https://techblog.woowahan.com/6851'>신규 입사자 온보딩 프로세스 정립 및 온보딩 프로젝트 기획 및 문서화</a>",
              '하나의 서비스를 함께 만들어간다는 생각을 바탕으로 한 지속적으로 공유하는 문화',
              "팀 내 정보공유 채널 생성 제안 및 <a href='https://ideveloper2.dev/blog/2022-01-25--emotion%EC%9C%BC%EB%A1%9C-%ED%8C%8C%EC%95%85%ED%95%B4%EB%B3%B4%EB%8A%94-css-in-js%EC%9D%98-%EC%9D%B4%EB%AA%A8%EC%A0%80%EB%AA%A8/'>기술 관련 아티클</a> 공유 -> 전사 프론트엔트 공유채널로 확장(지식/기술공유)",
              '매주 빠짐없이 주간 회고를 주도함 (배포 일정 체크/ 이슈 체크 / 논의)',
              '코드리뷰를 통해 동료가 작업하는 도메인과 코드작성 의도파악,히스토리 파악, 더나은 프로덕트를 만들기 위한 필수 불가결한 과정이라 생각하며 함께하고 있음 (PR 템플릿 생성..etc)',
            ],
          },
        ],

        skills: ['soft skill'],
      },
    ],
  },
  {
    date: '2018.08 ~ 2020.02',
    description: 'Travel Tech',
    img: mrt,
    label: 'myrealtrip',
    skills: ['react', 'typescript', 'webpack', 'next.js', 'ruby on rails'],
    task: [
      {
        title: '마이리얼트립 웹 전반 설계/개발/운영 ',
        description: [
          {
            title: '협업 문화',
            content: [
              "<a href='https://medium.com/myrealtrip-product/frontend-cowork-9cdb125da1ef'>사내 협업문화를 만들어가며 유기적으로 일하는 업무 프로세스들 구축</a>",
            ],
          },
          {
            title: 'css-in-js media 라이브러리 제작',
            content: [
              "<a href='https://github.com/Brew-Brew/css-in-js-media'>emotion, styled component 같은 css-in-js 라이브러리들을 활용할때 반응형을 쉽게 대응하기 위해 만든 유틸을 라이브러리로 제작</a>",
            ],
          },
        ],
        participant: '3명',
        skills: ['typescript', 'next.js', 'emotion.js', 'react', 'context api'],
      },
      {
        title: '웹 상품 상세페이지 ruby on rails -> react 마이그레이션',
        description: [
          {
            title: '웹 상품 상세페이지 리뉴얼',
            content: [
              '기존 ruby on rails 레거시 파악후 제거하여 react로 전환',
              '커머스에서 중요한 상세 페이지를 react로 마이그레이션함으로써, 묵혀뒀던 백로그들 추가가 용이해짐',
            ],
          },
        ],

        participant: '1명',
        skills: ['react'],
      },
    ],
  },
  {
    date: '2018.01 ~ 2018.08',
    description: 'Food Tech',
    img: plating,
    label: 'plating',
    skills: ['react', 'webpack', 'node.js'],
    task: [
      {
        title: '플레이팅 서비스 개발/운영',
        description: [
          {
            title:
              '셰프 음식을 집으로 전달해주는 B2C 서비스였고, 개발/운영을 담당했습니다',
          },
        ],

        skills: ['react', 'redux', 'redux-saga'],
      },
    ],
  },
];

export const skillInfo = [
  {
    description: [
      '꼼꼼히 요구사항과 기획을 파악하며 완벽히 개발을 진행하려 노력 합니다.',
      '개발 직군이나 비 개발 직군 모두 전문성을 바탕으로 업무를 진행하고 있으므로 항상 다른 팀에 귀 기울이며 열린 마음으로 서로가 이해 할 수 있는 말로 대화하려 노력 중입니다.',
      '본인의 일이 아니더라도 문제 상황에 적극적으로 도움을 주려 노력합니다.',
      '혼자 빛나는 사람보다는, 함께할때 더 빛나는 사람이 되고 싶습니다. 협업을 중요시 하고, 팀내에서의 협업 뿐 아니라, 타팀과의 소통을 위해 노력합니다.',
      '상황에 대한 공유 및 정리능력이 뛰어납니다.',
      '새로운 기술에 호기심을 갖고, 적극적으로 탐구합니다.',
      '코드 리뷰에 대해 매우 긍정적이며, 함께 더 좋은 서비스를 만드는 힘은 리뷰에서 나온다 생각하며, 의견을 주저없이 제시합니다.',
    ],
    title: 'Soft Skills',
  },
  {
    description: [
      'web vitals에 대해 이해하고, 최적화를 할 수 있습니다.',
      '크로스 브라우징에 대응할 수 있습니다.',
    ],
    title: 'Web',
  },
  {
    description: [
      '번들 사이즈 분석 및, 번들 사이즈 최적화를 할 수 있습니다.',
      'hook을 사용해 비즈니스 로직을 적절히 분리해 낼수 있습니다.',
      '여러 라이브러리들을 활용해 상태관리에 대해 적절한 상황에 사용할 수 있습니다.',
    ],
    title: 'React',
  },

  {
    description: [
      'ES2015 이후의 자바스크립트 문법에 익숙합니다.',
      'typescript를 사용하며 적절한 타입을 활용할 수  있습니다.',
    ],
    title: 'Javascript/Typescript',
  },
];

export const awardsInfo = [
  {
    title: "우아한형제들 사내 해커톤 '우아톤' 최우수상 - 2020",
    from: '우아한형제들',
    content:
      "개인화 된 컨텐츠를 배민 메인 홈에서 제공하는 프로젝트 '응답하라 배민' 제작 - UI개발 담당",
  },
  {
    title: '글로벌 전문 개발자 (파트 부문) - 2019',
    from: '공개SW개발자센터(KOSSLab)',
    content:
      '국내외 공개 sw 프로젝트 개발에 참여할수있는 개발자 육성 및 지원프로그램 ',
  },
  {
    title: '오픈소스 컨트리뷰톤 과학기술정보통신부장관상 - 2018',
    from: '정보통신산업진흥원',
    content:
      '여러 컨트리뷰션 주제중, 크로미움 프로젝트에 2인멘토, 약 10여명의 구성된 팀의 구성원으로써 컨트리뷰트를 하는 프로젝트였습니다.',
  },
  {
    title: '멋쟁이사자처럼 5기/ 6기 운영진 - 2017~2018',
    from: '멋쟁이 사자처럼 중앙대',
    content:
      '5기/6기 활동을 했으며, 6기에는 운영진 활동을 통해 퇴근 후 참여하며, 웹 관련 지식 공유에 힘썼습니다.',
  },
  {
    title: '오픈소스 컨트리뷰톤 우수상- 2017',
    from: '정보통신산업진흥원',
    content:
      '덤블도어 교수님이라는 node.js기반의 오픈소스 슬랙 챗봇 프로젝트이며 게이미피케이션요소를 추가한 챗봇을 만드는 프로젝트였습니다. 백엔드 팀장을 맡았습니다.',
  },
  {
    title: '동국대 멋쟁이사자처럼 해커톤 동국대 총장상- 2017',
    from: '동국대 융합소프트웨어교육원',
    content:
      '실버세대를 위한 스마트폰 튜토리얼 웹사이트라는 아이디어로 떠올려, 팀을꾸려 팀장으로써 팀을 모으고 ruby on rails를 기반으로 서비스를 제작, 개발하였었습니다.',
  },
  {
    title: '중앙대 always-on공모전 장려상 - 2017',
    from: '중앙대학교',
    content:
      '일반인을 위한 사물인터넷 이벤트 제작 웹과 하드웨어의 중간다리 역할을 하는 api서버를 node.js기반으로 개발하였습니다.',
  },
  {
    title: '거점 포트폴리오경진대회 최우수상 - 2017',
    from: '고려대학교',
    content: '',
  },
  {
    title: '포트폴리오 경진대회 창의ict공과대학장상 - 2017',
    from: '중앙대학교',
    content: '',
  },
];

export const contributionInfo = [
  {
    from: 'ant-design / ant-design',
    list: [
      {
        title: 'type: seperate type of button onclick event with more detail',
        link: 'https://github.com/ant-design/ant-design/pull/52654',
      },
      {
        title: "doc: update Table component's selectedRowKeys wrong type",
        link: 'https://github.com/ant-design/ant-design/pull/17990',
      },
    ],
  },
  {
    from: 'reduxjs / redux',
    list: [
      {
        title: 'feat: arrange import section of combineReducers',
        link: 'https://github.com/reduxjs/redux/pull/3914',
      },
    ],
  },
  {
    from: 'facebook / create-react-app',
    list: [
      {
        title: 'Suggest `reactstrap` instead of `react-bootstrap`',
        link: 'https://github.com/facebook/create-react-app/pull/4703',
      },
    ],
  },
  {
    from: 'facebook / react',
    list: [
      {
        title: 'Remove irrelevant suggestion of a legacy method from a warning',
        link: 'https://github.com/facebook/react/pull/13169',
      },
    ],
  },
  {
    from: 'reactjs / reactjs.org',
    list: [
      {
        title: 'Fix node engines',
        link: 'https://github.com/reactjs/reactjs.org/pull/1002',
      },
      {
        title: "Fix Issue about addons.md's Wrong links",
        link: 'https://github.com/reactjs/reactjs.org/pull/1023',
      },
    ],
  },
  {
    from: 'Lemoncode /react-by-sample',
    list: [
      {
        title: 'fix: fix wrong links in readme and update readme examples',
        link: 'https://github.com/Lemoncode/react-by-sample/pull/177',
      },
    ],
  },
  {
    from: 'kentcdodds / kentcdodds.com',
    list: [
      {
        title: 'doc: add korean translation of useMemo and useCallback',
        link: 'https://github.com/kentcdodds/kentcdodds.com/pull/200',
      },
    ],
  },
  {
    from: 'emotion-js / emotion',
    list: [
      {
        title:
          'add `css-in-js media library` to readme ecosystem (add my library : https://github.com/Brew-Brew/css-in-js-media)',
        link: 'https://github.com/emotion-js/emotion/pull/1441',
      },
    ],
  },
  {
    from: 'styled-components / awesome-styled-components',
    list: [
      {
        title: "doc: add 'css-in-js-media' to helpers",
        link:
          'https://github.com/styled-components/awesome-styled-components/pull/122',
      },
    ],
  },
  {
    from: 'storybookjs / storybook',
    list: [
      {
        title:
          'doc: update readme of addon viewport about configure section more accurately',
        link: 'https://github.com/storybookjs/storybook/pull/10605',
      },
    ],
  },
];

export const storyInfo = [
  {
    title: '“첫번째 프론트엔드 엔지니어”로 합류하면 어떤 일들을 해야할까?',
    link:
      'https://medium.com/verticah/%EC%B2%AB%EB%B2%88%EC%A7%B8-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4-%EB%A1%9C-%ED%95%A9%EB%A5%98%ED%95%98%EB%A9%B4-%EC%96%B4%EB%96%A4-%EC%9D%BC%EB%93%A4%EC%9D%84-%ED%95%B4%EC%95%BC%ED%95%A0%EA%B9%8C-78c7d891e3a5',
    description:
      '스타트업 첫번째 프론트 엔지니어로 합류해 어떻게 일해왔는지에 대해 작성한 글',
  },
  {
    title: '학생에서 개발자가 되기까지 (feat:병역특례를 마무리하며)',
    link:
      'https://ideveloper2.dev/blog/2020-02-18--%ED%95%99%EC%83%9D%EC%97%90%EC%84%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EB%90%98%EA%B8%B0%EA%B9%8C%EC%A7%80-feat-%EB%B3%91%EC%97%AD%ED%8A%B9%EB%A1%80%EB%A5%BC-%EB%A7%88%EB%AC%B4%EB%A6%AC%ED%95%98%EB%A9%B0/',
    description:
      '병역특례 기간을 회고한 글이고, 그 기간동안 학생에서 개발자가 된 후 어떻게 성장하였고 어떠한점들을 느꼈는지 작성한 글',
  },
  {
    title: '마이리얼트립 프론트엔드팀은 어떻게 협업하고 있을까?',
    link: 'https://medium.com/myrealtrip-product/frontend-cowork-9cdb125da1ef',
    description:
      '협업에 관한 생각들, 그리고 어떻게 사내 협업문화를 만들어나갔는지 사내 기술블로그에 작성한 글',
  },
  {
    title: '1년차 병아리 개발자 2018년 회고',
    link: 'https://ideveloper2.tistory.com/165',
    description:
      '회사에서 개발자로 일하기 시작하며, 개발자라는 타이틀을 가지고 본인의 생각을 정리하며 1년을 회고한 글',
  },
  {
    title: '일일커밋 6개월 회고',
    link: 'https://ideveloper2.tistory.com/153',
    description:
      '꾸준함을 바탕으로 일일커밋 6개월을 진행하고 느꼇던 생각들, 그리고 어떻게 일일커밋 6개월을 하였는지에 대해 정리 한 글',
  },
];
