import * as React from "react";
import { Header, Container, Segment } from "semantic-ui-react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { fadeInDown } from "react-animations";

import { withLayout } from "../components/Layout";
import { mainColor } from "../constant/colors";
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
  color: ${mainColor};
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
  background: ${mainColor};
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
    task:
      "offer information page renewal and migration (ruby on rails => react)"
  },
  {
    date: "2018.01 ~ 2018.08",
    description: "food tech",
    img: plating,
    label: "plating",
    task: "b2b chef service site, plating react site"
  }
];

const skillInfo = [
  {
    description: ["Overall-test1", "Overall-test2"],
    title: "Overall"
  },
  {
    description: ["react-test1", "react-test2"],
    title: "React"
  },
  {
    description: ["HTML-test1", "HTML-test2"],
    title: "HTML/CSS"
  },
  {
    description: ["Javascript-test1", "Javascript-test2"],
    title: "Javascript"
  },
  {
    description: ["Communication-test1", "Communication-test2"],
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
                <li>{info.task}</li>
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
