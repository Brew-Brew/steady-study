import { github, mail, mrt, plating, tistory } from "../assets/icons";

export const bottomContent = [
  {
    buttonContent: "Let's study",
    icon: "book",
    link: "/blog/",
    text: "See how I think"
  },
  {
    buttonContent: "go to page",
    icon: "search",
    link: "/about/",
    text: " See who am I"
  },
  {
    buttonContent: "contact",
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

export const careerInfo = [
  {
    date: "2018.08 ~ ing",
    description: "travel tech",
    img: mrt,
    label: "myrealtrip",
    skills: ["react", "webpack", "next.js", "ruby on rails"],
    task: [
      "offer information page renewal and migration (ruby on rails => react)",
      "hotel meta search project with react"
    ]
  },
  {
    date: "2018.01 ~ 2018.08",
    description: "food tech",
    img: plating,
    label: "plating",
    skills: ["react", "webpack", "node.js"],
    task: ["b2b chef service site, plating react site"]
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
