import { github, mail, mrt, plating, tistory } from "../assets/icons";

export const bottomContent = [
  {
    buttonContent: "Let's study",
    icon: "book",
    link: "/blog/",
    text: "See how I think"
  },
  {
    buttonContent: "Go to page",
    icon: "search",
    link: "/about/",
    text: " See who am I"
  },
  {
    buttonContent: "Contact me",
    icon: "phone",
    link: "https://github.com/zx6658/",
    text: " Contact me"
  }
];

export const abooutInfo = [
  {
    img: github,
    label: "Github",
    link: "https://github.com/zx6658"
  },
  {
    img: mail,
    label: "E-mail: zx6658@gmail.com",
    link: "mailto:zx6658@gmail.com?subject=Hi ideveloper"
  },
  {
    img: tistory,
    label: "Ideveloper's Software Blog",
    link: "https://ideveloper2.tistory.com/"
  }
];

export const mottoInfo = [
  "비교는 비참해지고 교만해진다.",
  "쉬운선택은 어려운삶을 만들고 어려운 선택은 쉬운 삶을 만든다.",
  "거시적으로는 인내하고, 미시적으론 속도를 내자.",
  "실패를 두려워하지말자 실패는 실행에 옮겨봤다는 뜻이기 때문이다."
];

export const pressInfo = [
  {
    title: "동국대, 해커톤 행사 성황",
    content:
      "동국대 총장상(소셜 이노베이터상)은 스마트폰 스쿨(대표:중앙대 이승규)팀의 ‘실버세대 교육용 스마트폰 튜토리얼 서비스’가 수상했다...",
    ref: "출처 : 한국대학신문(http://news.unn.net)",
    link: "http://news.unn.net/news/articleView.html?idxno=178310"
  },
  {
    title: "[신입사원 다이어리]신입 개발자도 다양한 여행 프로젝트 주도해요",
    content:
      "마이리얼트립 웹플랫폼개발팀에서 프론트엔드 개발을 담당하고 있는 1년 차 신입입니다. 프론트엔드 개발자는 웹 사이트에서 사용자가 직접 경험하는 ...",
    ref: "출처 : 아시아경제",
    link: "http://view.asiae.co.kr/news/view.htm?idxno=2019040911064367430"
  }
];

export const careerInfo = [
  {
    date: "2018.08 ~ ing",
    description: "Travel tech",
    img: mrt,
    label: "myrealtrip",
    skills: ["react", "typescript", "webpack", "next.js", "ruby on rails"],
    task: [
      {
        title: "호텔메타서치 프로젝트",
        content: [
          "기존: 부킹닷컴 링크로연결 -> 개선: 각 호텔 사이트들의 상품들을 리스트페이지, 상세페이지에서 확인할수 있도록 개선",
          "웹뷰 대응 및, 인터페이스 호환",
          "UI 컴포넌트 제작",
          "상태관리 및 설계단 참여"
        ],
        participant: "2명",
        skills: ["react", "context"]
      },
      {
        title: "웹 상품 상세페이지 ruby on rails -> react 리뉴얼",
        content: [
          "기존 ruby on rails 레거시 파악후 제거 -> react로 전환",
          "사이트 내 중요페이지를 react로 마이그레이션 -> 추후 기능 추가 용이",
          "더 나은 유저경험 전달"
        ],
        participant: "1명",
        skills: ["react"]
      },

      {
        title: "브레이즈 이벤트 삽입",
        content: [
          "브레이즈 스크립트 웹, 웹뷰 삽입",
          "마케팅 팀에서 캠페인 제작을 위한 웹 페이지내 유저 스토리별 이벤트 삽입(회원가입~구매 등등 user 이벤트일어나는 부분)"
        ],
        participant: "1명",
        skills: ["react", "redux"]
      },
      {
        title: "서스테이닝 이슈들, 성능개선",
        content: [
          "bundle analyzer 도입 제의및 적용을 통해 성능개선의 초석을 다짐",
          "자잘한 기존 rails 페이지들 개선하면서 react로 전환",
          "협력업체들(naver, 마케팅스크립트 대행사..etc)과의 커뮤니케이션을 통한 페이지 개선작업들",
          "sustaining 이슈들을 대응하면서 사업,운영팀에 기여"
        ],
        participant: "팀 전원",
        skills: ["ruby on rails", "react", "react-hook"]
      }
    ]
  },
  {
    date: "2018.01 ~ 2018.08",
    description: "Food tech",
    img: plating,
    label: "plating",
    skills: ["react", "webpack", "node.js"],
    task: [
      {
        title:
          "React 기반의  신규런칭  서비스  관련(b2b 회사용  도시락  판매  사이트)",
        participant: "2명, (본인, 인턴)",
        content: [
          "웹사이트  프로젝트  설계 및 일정 매니징",
          "기존 api 수정",
          "프론트 페이지들 개발"
        ],
        skills: ["react", "redux", "redux-saga", "node.js"]
      },
      {
        title: "플레이팅 웹사이트 (wordpress -> react) 추후 보수 작업",
        participant: "2명, (본인, 인턴)",
        content: [
          "추후 보수작업 및 react + redux + redux-saga를 활용한 주요 기능들 추가",
          "Google Analytics 삽입",
          "pm2 배포"
        ],
        skills: ["react", "redux", "redux-saga", "pm2", "Google Analytics"]
      },
      {
        title: "React 기반의 배송현황 확인 웹",
        participant: "1명",
        content: [
          "각 지역마다 pos 프로그램 일일이 들어가서 확인해야 했던 운영팀의 효율 증가",
          "큰 상태관리는 필요없었으므로 react만으로 구현"
        ],
        skills: ["react"]
      },
      {
        title: "React,Redux 기반 쉐프분들이 보는 고객 리뷰페이지",
        content: [
          "쉐프 분들과 고객과의 접점마련",
          "초기 react학습, redux학습용으로 제작했던 페이지"
        ],
        participant: "1명",
        skills: ["react", "redux"]
      },
      {
        title:
          "서울지역만 되던 새벽배송 -> 전지역  새벽배송  확장  (node.js  기존  중앙  api  수정)",
        participant: "1명",
        content: [
          "매출 증대에 기여",
          "기존 legacy 코드들의 다른 서비스들과의 dependency 분석 후 개발"
        ],
        skills: ["node.js"]
      }
    ]
  }
];

export const skillInfo = [
  {
    description: [
      "본인의 일이 아니더라도 문제 상황에 적극적으로 도움을 주려 노력합니다",
      "열린 마인드로 합의에 도달할수 있도록 대화를 이끌어나갑니다."
    ],
    title: "Overall"
  },
  {
    description: [
      "상황에 맞게 렌더링 최적화를 할 수 있습니다.",
      "번들 사이즈 분석 및, 번들 사이즈 최적화를 할 수 있습니다."
    ],
    title: "React"
  },
  {
    description: [
      "시맨틱 마크업을 준수하려 노력합니다",
      "Sass 등 CSS Preprocessor를 사용할 수 있습니다.",
      "BEM등의 CSS 방법론을 적용할 수 있습니다.",
      "크로스 브라우징에 대응할 수 있습니다."
    ],
    title: "HTML/CSS"
  },
  {
    description: ["ES2015 이후의 자바스크립트 문법에 익숙합니다."],
    title: "Javascript"
  },
  {
    description: [
      "직위 및 포지션에 관계없이 적절한 의견이면 의견을 주저없이 제시합니다.",
      "항상 본인의 의견을 주장하지 않고, 다른사람의 의견을 듣도록 노력합니다."
    ],
    title: "Communication"
  }
];

export const awardsInfo = [
  {
    title: "글로벌 전문 개발자 (파트 부문)",
    from: "공개SW개발자센터(KOSSLab)",
    content:
      "국내외 공개 sw 프로젝트 개발에 참여할수있는 개발자 육성 및 지원프로그램 "
  },
  {
    title: "오픈소스 컨트리뷰톤 과학기술정보통신부장관상",
    from: "정보통신산업진흥원",
    content:
      "여러 컨트리뷰션 주제중, 크로미움 프로젝트에 2인멘토, 약 10여명의 구성된 팀의 구성원으로써 컨트리뷰트를 하는 프로젝트였습니다."
  },
  {
    title: "오픈소스 컨트리뷰톤 우수상",
    from: "정보통신산업진흥원",
    content:
      "덤블도어 교수님이라는 node.js기반의 오픈소스 슬랙 챗봇 프로젝트이며 게이미피케이션요소를 추가한 챗봇을 만드는 프로젝트였습니다. 백엔드 팀장을 맡았습니다."
  },
  {
    title: "멋쟁이사자처럼 5기/ 6기 운영진",
    from: "멋쟁이 사자처럼 중앙대",
    content:
      "5기/6기 활동을 했으며, 6기에는 운영진 활동을 통해 퇴근 후 참여하며, 웹 관련 지식 공유에 힘썼습니다."
  },
  {
    title: "동국대 멋쟁이사자처럼 해커톤 동국대 총장상",
    from: "동국대 융합소프트웨어교육원",
    content:
      "실버세대를 위한 스마트폰 튜토리얼 웹사이트라는 아이디어로 떠올려, 팀을꾸려 팀장으로써 팀을 모으고 ruby on rails를 기반으로 서비스를 제작, 개발하였었습니다."
  },
  {
    title: "중앙대 always-on공모전 장려상",
    from: "중앙대학교",
    content:
      "일반인을 위한 사물인터넷 이벤트 제작 웹과 하드웨어의 중간다리 역할을 하는 api서버를 node.js기반으로 개발하였습니다."
  },
  {
    title: "거점 포트폴리오경진대회 최우수상",
    from: "고려대학교",
    content: ""
  },
  {
    title: "포트폴리오 경진대회 창의ict공과대학장상",
    from: "중앙대학교",
    content: ""
  }
];

export const contributionInfo = [
  {
    from: "facebook / create-react-app",
    list: [
      {
        title: "Suggest `reactstrap` instead of `react-bootstrap`",
        link: "https://github.com/facebook/create-react-app/pull/4703"
      }
    ]
  },
  {
    from: "facebook / react",
    list: [
      {
        title: "Remove irrelevant suggestion of a legacy method from a warning",
        link: "https://github.com/facebook/react/pull/13169"
      }
    ]
  },
  {
    from: "reactjs / reactjs.org",
    list: [
      {
        title: "Fix node engines",
        link: "https://github.com/reactjs/reactjs.org/pull/1002"
      },
      {
        title: "Fix Issue about addons.md's Wrong links",
        link: "https://github.com/reactjs/reactjs.org/pull/1023"
      }
    ]
  },
  {
    from: "Lemoncode /react-by-sample",
    list: [
      {
        title: "fix: fix wrong links in readme and update readme examples",
        link: "https://github.com/Lemoncode/react-by-sample/pull/177"
      }
    ]
  },
  {
    from: "kentcdodds / kentcdodds.com",
    list: [
      {
        title: "doc: add korean translation of useMemo and useCallback",
        link: "https://github.com/kentcdodds/kentcdodds.com/pull/200"
      }
    ]
  }
];
