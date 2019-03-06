import * as React from "react";
import { Header, Container, Segment } from "semantic-ui-react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { fadeInDown } from "react-animations";

import { withLayout } from "../components/Layout";
import colors from "../constant/colors";
import { github, mail, mrt, plating, tistory } from "../assets/icons";

const Globals = createGlobalStyle`
  body,h1,h2,h3,h4,h5,p,div {
    @font-face { 
    font-family: 'Godo'; 
    font-style: normal; 
    font-weight: 400; 
    src: url('//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoM.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoM.woff') format('woff'); } 
    @font-face { font-family: 'Godo'; font-style: normal; font-weight: 700; src: url('//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoB.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/corps/godo/Godo/GodoB.woff') format('woff'); } .godo * { font-family: 'Godo', sans-serif; }
    font-family: "Godo" !important;
  }
`;

const fadedAnimation = keyframes`${fadeInDown}`;
const FadedText = styled.h1`
  animation: 1s ${fadedAnimation};
`;

const Title = styled.div`
  color: ${colors.mainColor};
  text-align: center;
`;

const InfoWrapper = styled.div`
  margin: 10px;
  animation: 1s ${fadedAnimation};
`;

const ImgIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  vertical-align: middle;
`;

const IconLabel = styled.p`
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
`;

const InfoTitle = styled.h1`
  font-size: 600;
  font-size: 24px;
  margin-bottom: 30px;
  margin-top: 20px;
  background: ${colors.mainColor};
  color: white;
  padding: 10px;
`;

const CompanyIcon = styled.img`
  height: 24px;
  margin-right: 10px;
  vertical-align: middle;
`;

const abooutInfo = [
  {
    img: github,
    label: "Github",
    link: ""
  },
  {
    img: mail,
    label: "E-mail: zx6658@gmail.com",
    link: ""
  },
  {
    img: tistory,
    label: "Ideveloper's Software Blog",
    link: ""
  }
];

const careerInfo = [
  {
    date: "2018.08 ~ ing",
    description: "travel tech",
    img: mrt,
    label: "myrealtrip",
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
    task: ["b2b chef service site, plating react site"]
  }
];

const skillInfo = [
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

const AboutPage = () => {
  return (
    <Container>
      <Globals />
      <Segment vertical>
        <Header as="h1">
          <Title>
            <FadedText>
              Hi <span>I'm Ideveloper</span>
            </FadedText>
          </Title>
        </Header>
      </Segment>
      <Segment>
        <InfoTitle>My Info</InfoTitle>
        {abooutInfo.map(info => {
          return (
            <InfoWrapper>
              <ImgIcon src={info.img} />
              <IconLabel>{info.label}</IconLabel>
            </InfoWrapper>
          );
        })}
        <div />
      </Segment>
      <Segment>
        <InfoTitle>My Career</InfoTitle>
        {careerInfo.map(info => {
          return (
            <InfoWrapper>
              <CompanyIcon src={info.img} />
              <ul>
                <li>{info.date}</li>
                <li>{info.description}</li>
                {info.task.map(content => {
                  return <li>{content}</li>;
                })}
              </ul>
            </InfoWrapper>
          );
        })}
        <div />
      </Segment>
      <Segment>
        <InfoTitle>Skills</InfoTitle>
        {skillInfo.map(info => {
          return (
            <InfoWrapper>
              <h3>{info.title}</h3>
              <ul>
                {info.description.map(description => {
                  return <li>{description}</li>;
                })}
              </ul>
            </InfoWrapper>
          );
        })}
        <div />
      </Segment>
    </Container>
  );
};

export default withLayout(AboutPage);
