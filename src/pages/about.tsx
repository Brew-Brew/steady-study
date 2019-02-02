import * as React from "react";
import { Header, Container, Segment } from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import { github, mail, mrt, plating, tistory } from "../assets/icons";
import styled, { keyframes } from "styled-components";

const InfoWrapper = styled.div`
  margin: 10px;
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
    link: "",
  },
  {
    img: mail,
    label: "E-mail: zx6658@gmail.com",
    link: "",
  },
  {
    img: tistory,
    label: "Ideveloper's Software Blog",
    link: "",
  },
];

const careerInfo = [
  {
    date: "2018.08 ~ ing",
    description: "travel tech",
    img: mrt,
    label: "myrealtrip",
    task:
      "offer information page renewal and migration (ruby on rails => react)",
  },
  {
    date: "2018.01 ~ 2018.08",
    description: "food tech",
    img: plating,
    label: "plating",
    task: "b2b chef service site, plating react site",
  },
];

const AboutPage = () => {
  return (
    <Container>
      <Segment vertical>
        <Header as="h1">
          <Header.Content>Hi I'm Ideveloper</Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <InfoTitle>My Info</InfoTitle>
        {abooutInfo.map((info) => {
          return (
            <InfoWrapper>
              <ImgIcon src={info.img} />
              <IconLabel>{info.label}</IconLabel>
            </InfoWrapper>
          );
        })}
        <div />
      </Segment>
      <Segment vertical>
        <InfoTitle>My Career</InfoTitle>
        {careerInfo.map((info) => {
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
    </Container>
  );
};

export default withLayout(AboutPage);
