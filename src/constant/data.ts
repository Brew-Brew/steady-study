import { github, mail, mrt, plating, tistory } from "../assets/icons";

export const bottomContent = [
  {
    buttonContent: "Let's study",
    icon: "book",
    link: "/blog/",
    text: "See how I think",
  },
  {
    buttonContent: "Go to page",
    icon: "search",
    link: "/about/",
    text: " See who am I",
  },
  {
    buttonContent: "Contact me",
    icon: "phone",
    link: "https://github.com/zx6658/",
    text: " Contact me",
  },
];

export const abooutInfo = [
  {
    img: github,
    label: "Github",
    link: "https://github.com/zx6658",
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
];

export const mottoInfo = [
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
    date: "2018.08 ~ ing",
    description: "travel tech",
    img: mrt,
    label: "myrealtrip",
    skills: ["react", "webpack", "next.js", "ruby on rails"],
    task: [
      "offer information page renewal and migration (ruby on rails => react)",
      "hotel meta search project with react",
    ],
  },
  {
    date: "2018.01 ~ 2018.08",
    description: "food tech",
    img: plating,
    label: "plating",
    skills: ["react", "webpack", "node.js"],
    task: ["b2b chef service site, plating react site"],
  },
];

export const skillInfo = [
  {
    description: [
      "본인의 일이 아니더라도 문제 상황에 적극적으로 도움을 주려 노력합니다",
      "열린 마인드로 합의에 도달할수 있도록 대화를 이끌어나갑니다.",
    ],
    title: "Overall",
  },
  {
    description: [
      "상황에 맞게 렌더링 최적화를 할 수 있습니다.",
      "번들 사이즈 분석 및, 번들 사이즈 최적화를 할 수 있습니다.",
    ],
    title: "React",
  },
  {
    description: [
      "시맨틱 마크업을 준수하려 노력합니다",
      "Sass 등 CSS Preprocessor를 사용할 수 있습니다.",
      "BEM등의 CSS 방법론을 적용할 수 있습니다.",
      "크로스 브라우징에 대응할 수 있습니다.",
    ],
    title: "HTML/CSS",
  },
  {
    description: ["ES2015 이후의 자바스크립트 문법에 익숙합니다."],
    title: "Javascript",
  },
  {
    description: [
      "직위 및 포지션에 관계없이 적절한 의견이면 의견을 주저없이 제시합니다.",
      "항상 본인의 의견을 주장하지 않고, 다른사람의 의견을 듣도록 노력합니다.",
    ],
    title: "Communication",
  },
];
