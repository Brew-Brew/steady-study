import {
  github,
  mail,
  mrt,
  plating,
  tistory,
  linkedin,
  woowabros,
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
    label: "E-mail: zx6658@naver.com",
    link: "mailto:zx6658@naver.com?subject=Hi ideveloper",
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
  "Comparison becomes miserable and arrogant..",
  "An easy choice makes a difficult life, and a difficult choice makes an easy life.",
  "Be patient macroscopically, and speed up microscopically.",
  "Don't be afraid to fail, because failure means you've put it into practice.",
];

export const pressInfo = [
  {
    title: "Dongguk University, Hackathon Event Success",
    content:
      "The Dongguk University President’s Award (Social Innovator Award) was awarded to the ‘Silver Generation Education Smartphone Tutorial Service’ of the Smartphone School (CEO: Lee Seung-gyu, Chung-Ang University) team....",
    ref: "Reference : http://news.unn.net",
    link: "http://news.unn.net/news/articleView.html?idxno=178310",
  },
  {
    title:
      "[New Employee Diary] New developers also lead various travel projects",
    content:
      "I am a first-year freshman in charge of front-end development in the My Real Trip web platform development team. A front-end developer is a user-experienced user on a website. ...",
    ref: "Reference : Asian Economy",
    link: "http://view.asiae.co.kr/news/view.htm?idxno=2019040911064367430",
  },
];

export const careerInfo = [
  {
    date: "2020.03 ~ 2022.08",
    description: "Food Tech",
    img: woowabros,
    label: "Woowa Bros",
    skills: ["react", "typescript"],
    task: [
      {
        title:
          "Bmart /Baemin Store (Korean Quick commerce service) Webview development",
        description: [
          {
            title:
              "Various business responses in the webview development environment",
            content: [
              "<a href='https://ideveloper2.dev/blog/2021-05-02--a-b-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%B6%95/'>A/B test component development</a>",
              "Recommendation UI area development",
              "Shopping cart, product details, order history, order details, coupon/event page..etc",
            ],
          },
          {
            title: "Design / Improve Performance / Test",
            content: [
              "<a href='https://ideveloper2.dev/blog/2020-08-22--%EC%83%81%ED%83%9C-%ED%8C%A8%ED%84%B4-state-pattern-%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-deep-link-%ED%9A%A8%EA%B3%BC%EC%A0%81%EC%9C%BC%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-aka-deep-link-manager/'>Development of App Protocol Manager to effectively manage app schemes and interfaces</a>",
              "Develop 'App Log Manager' to manage logs easily",
              "api, test code coverage",
              "Resolving technical debt + improving rendering performance by moving pages from the existing (vue + csr) environment to the new integrated front (react + ssr) environment",
            ],
          },
        ],

        skills: ["react", "next.js", "typescript", "redux", "emotion.js"],
      },
      {
        title:
          "Woowa Bros integrated order page development(Bmart, Baemin store)",
        description: [
          {
            title: "Woowa Bros integrated order page",
            content: [
              "Add key payment related logic and write test code => Secure business logic stability",
              "Component / model structure improvement => code readability",
              "Development and schedule consultation through communication with various related department teams (payment, order, ..etc)의",
            ],
          },
        ],

        skills: ["react", "typescript", "styled-components"],
      },

      {
        title:
          "Bmart promotion page development and make builder what makes these promotion pages",
        description: [
          {
            title:
              "Builder development and function addition/improvement used by marketers to create promotion (event) pages",
            content: [
              "Design and develop models by dividing layers such as sections, groups, items, and actions to improve the ability to respond to various promotion pages",
              "Increase marketing efficiency through systemization/automation by designing event pages developed by developers every month so that marketers can produce them",
              "Various usability improvements and functions added to the marketing team according to the requirements (swipe production function, coupon issuance, deep link movement..etc)",
              "Improved image upload function to link s3 and cloudfront",
            ],
          },
          {
            title: "Development of various promotional pages",
            content: [
              "Develop an event page by influencing new customers, inducing repurchase of existing customers, and negotiating complex requirements while establishing requirements with planners/designers",
            ],
          },
        ],

        skills: ["react", "typescript", "mobx"],
      },
      {
        title: "Bmart v1 design system development",
        description: [
          {
            title: "Development of early B-mart design system",
            content: [
              "<a href='https://ideveloper2.dev/blog/2020-05-17--rollup-ts-%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0/'>rollup, ts, react based design system development</a>",
              "<a href='https://ideveloper2.dev/blog/2021-02-27--%EC%A0%A0%ED%82%A8%EC%8A%A4-%EB%B0%B0%ED%8F%AC-%ED%9B%84-%EC%8A%AC%EB%9E%99%EC%9C%BC%EB%A1%9C-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%B2%84%EC%A0%84-%EC%95%8C%EB%9E%8C-%EB%B0%9B%EA%B8%B0/'>Improving the distribution method by interworking with Jenkins and interworking with Slack Alarm (version, distribution success/failure)</a>",
              "<a href='https://ideveloper2.dev/blog/2021-01-24--%EC%8B%9C%EA%B0%81%EC%A0%81-%ED%9A%8C%EA%B7%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-visual-regression-test/'>Secure design system development stability by introducing visual regression test</a>",
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
        title: "Creating a team culture",
        description: [
          {
            title: "A culture of organic collaboration and sharing as a team",
            content: [
              "Establishment of onboarding process for new hires and planning and documentation of onboarding project",
              "I always take care of not only my work, but also the work of my colleagues, and always try to be a helpful colleague by checking the schedule.",
              "A culture of continuous sharing based on the idea of ​​creating a single service together",
              "Proposal to create an information sharing channel within the team and information sharing <a href='https://ideveloper2.dev/blog/2022-01-25--emotion%EC%9C%BC%EB%A1%9C-%ED%8C%8C%EC%95%85%ED%95%B4%EB%B3%B4%EB%8A%94-css-in-js%EC%9D%98-%EC%9D%B4%EB%AA%A8%EC%A0%80%EB%AA%A8/'>(example article)</a>",
              "Leading weekly retrospectives every week (check distribution schedule/check issues/discuss)",
              "Through code review, we are working together, thinking that it is an essential process for understanding the domain and code writing intentions of colleagues, understanding history, and making better products (PR template creation..etc)",
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
        title: "My Real Trip new web version develop",
        description: [
          {
            title: "css-in-js media library develop",
            content: [
              "<a href='https://github.com/Brew-Brew/css-in-js-media'>When using css-in-js libraries such as emotion and styled component, the utility created to easily respond to responsiveness is produced as a library.</a>",
            ],
          },
          {
            title: "My Real Trip new web version develop",
            content: [
              "rails based web -> new web combining ts + next.js + emotion.js",
              "Efforts to develop stable products through cypress e2e test",
              "State management and design team participation",
            ],
          },
        ],
        participant: "3",
        skills: ["typescript", "next.js", "emotion.js", "react", "context api"],
      },
      {
        title: "hotel meta search web page develop",
        description: [
          {
            title:
              "prev: Linked to Booking.com Link -> Improvement: Improved so that the products of each hotel site can be checked on the list page and detail page",
            content: [
              "Web view response and new interface consultation and development",
              "UI component develop",
              "State management and participation in the design team",
            ],
          },
        ],
        participant: "2",
        skills: ["react", "context api"],
      },
      {
        title: "web offer detail page (ruby on rails -> react renewal )",
        description: [
          {
            title: "web offer detail page (ruby on rails -> react renewal )",
            content: [
              "ruby on rails legacy remove -> convert to react",
              "important page of service's react migration -> make easily to add new feature",
              "offer improved use experiences",
            ],
          },
        ],

        participant: "1",
        skills: ["react"],
      },

      {
        title: "braze event add",
        description: [
          {
            title: "braze event add",
            content: [
              "braze event script add to web and webview",
              "Insertion of events for each user story in the web page for the marketing team to create a campaign (the part where user events occur, such as membership sign-up, purchase, etc.)",
            ],
          },
        ],

        participant: "1",
        skills: ["react"],
      },
      {
        title: "dealing with sustaining issue,performance improvement ",
        description: [
          {
            title: "dealing with sustaining issue,performance improvement",
            content: [
              "Established the foundation for performance improvement through proposal and application of bundle analyzer",
              "Switching to react while improving small existing rails pages",
            ],
          },
        ],

        participant: "all frontend team member",
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
          "React-based new launch service related (b2b company lunchbox sales site)",
        participant: "1",
        description: [
          {
            title:
              "React-based new launch service design/development/operation",
            content: [
              "Website project design and schedule management",
              "Modify existing api",
            ],
          },
        ],

        skills: ["react", "redux", "redux-saga", "node.js"],
      },
      {
        title: "React-based delivery status check web",
        participant: "1",
        description: [
          {
            title:
              "Increase the efficiency of the operation team, which had to go and check the pos program in each region one by one",
            content: [
              "No big state management was needed, so it was implemented only with react.",
            ],
          },
        ],
        skills: ["react"],
      },
      {
        title:
          "Early morning delivery that used to be only in Seoul area -> Expand early morning delivery to all areas (modified the existing central api in node.js)",
        participant: "1",
        description: [
          {
            title:
              "Early morning delivery that used to be only in Seoul area -> Expand early morning delivery to all areas (modified the existing central api in node.js)",
            content: [
              "Contribute to increase sales",
              "Developed after analyzing dependency with other services of existing legacy codes",
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
      "I try to thoroughly understand the requirements and plans and proceed with the perfect development.",
      "Both development and non-development positions are working on the basis of their expertise, so we are always listening to other teams and trying to communicate with each other in a language we can understand with an open mind.",
      "Even if it is not my job, I actively try to help in the problem situation.",
      "Rather than a person who shines alone, I want to become a person who shines more when we are together. We value collaboration and strive not only for collaboration within the team, but also for communication with other teams.",
      "Excellent ability to share and organize situations.",
      "curious about new technologies and actively explore them.",
      "I am very positive about code reviews, and we believe that the power to create a better service together comes from reviews, and we do not hesitate to give our opinions.",
    ],
    title: "Soft Skills",
  },
  {
    description: [
      "I can prevent unnecessary rendering and optimize rendering.",
      "I can analyze bundle size and optimize bundle size.",
      "I can properly separate business logic using hooks.",
      "I can use in appropriate situations for state management such as redux, context api, etc.",
      "I can use next.js to respond to ssr.",
    ],
    title: "React",
  },
  {
    description: [
      "strive to comply with web standards.",
      "I can use CSS preprocessors such as Sass, and I can utilize the css module.",
      "I can use css-in-js (styled-component , emotion) ",
      "I can deal with cross browsing",
    ],
    title: "HTML/CSS",
  },
  {
    description: [
      "Familiar with JavaScript syntax after ES2015.",
      "familiar with using babel, webpack, etc.",
      "I can use typescript and can utilize the appropriate type.",
    ],
    title: "Javascript/Typescript",
  },
];

export const awardsInfo = [
  {
    title: "Woowa Bros in-house hackathon 'Wooahton' Grand Prize - 2020",
    from: "Woowa Bros",
    content:
      "Produced 'Reply Baemin', a project that provides personalized content on Baemin's main home - UI development",
  },
  {
    title: "Global Professional Developer (Part Division) - 2019",
    from: "(KOSSLab)",
    content:
      "Developer development and support program that can participate in domestic and overseas open sw project development ",
  },
  {
    title:
      "Open Source Contribution Award by the Minister of Science, Technology, Information and Communication - 2018",
    from: "Information and Communication Industry Promotion Agency",
    content:
      "Among the various contribution topics, it was a project to contribute to the Chromium project as a member of a team of about 10 people and 2 mentors.",
  },
  {
    title: "Open Source Contribution Excellence Award- 2017",
    from: "Information and Communication Industry Promotion Agency",
    content:
      "Professor Dumbledore is an open source Slack chatbot project based on node.js, and it was a project to create a chatbot with gamification elements added. I was the backend team leader.",
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
    title:
      "From Student to Developer (feat: Concluding Military Service Special)",
    link:
      "https://ideveloper2.dev/blog/2020-02-18--%ED%95%99%EC%83%9D%EC%97%90%EC%84%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EB%90%98%EA%B8%B0%EA%B9%8C%EC%A7%80-feat-%EB%B3%91%EC%97%AD%ED%8A%B9%EB%A1%80%EB%A5%BC-%EB%A7%88%EB%AC%B4%EB%A6%AC%ED%95%98%EB%A9%B0/",
    description:
      "This is an article about the special military service period, and how I grew and felt after becoming a developer from a student during that period.",
  },
  {
    title: "How is My Real Trip front-end team working together?",
    link: "https://medium.com/myrealtrip-product/frontend-cowork-9cdb125da1ef",
    description:
      "An article written on an in-house technical blog about ideas about collaboration and how to create an in-house collaboration culture",
  },
  {
    title: "1st year developer 2018 retrospective",
    link: "https://ideveloper2.tistory.com/165",
    description:
      "An article about a year in which I started working as a developer at a company and organized my thoughts with the title of developer",
  },
  {
    title: "Daily Commit 6 Months Retrospective",
    link: "https://ideveloper2.tistory.com/153",
    description:
      "A summary of the thoughts I had after 6 months of daily commits based on consistency, and how I did 6 months of daily commits.",
  },
];
