import * as React from "react";
import { Header, Container, Segment } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
import { fadeInDown } from "react-animations";

import { withLayout } from "../components/Layout";
import Tag from "../components/Tag/Tag";
import colors from "../constant/colors";
import GlobalFontStyle from "../util/globalFont";
import { abooutInfo, careerInfo, skillInfo } from "../constant/data";

const fadedAnimation = keyframes`${fadeInDown}`;

const SkillWrapper = styled.div`
  margin-top: 10px;
`;

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
  margin-left: -1rem;
  margin-right: -1rem;
  margin-top: -1rem !important;
  background: ${colors.mainColor};
  color: white;
  padding: 10px;
`;

const CompanyIcon = styled.img`
  height: 24px;
  margin-right: 10px;
  vertical-align: middle;
`;

const AboutPage = () => {
  return (
    <Container>
      <GlobalFontStyle />
      <Segment vertical>
        <Header as="h1">
          <Title>
            <FadedText>
              😀<span style={{ margin: "1rem" }}>I'm Ideveloper</span>
            </FadedText>
          </Title>
        </Header>
      </Segment>
      <Segment>
        <InfoTitle>My Info</InfoTitle>
        {abooutInfo.map(info => {
          return (
            <a href={info.link}>
              <InfoWrapper>
                <ImgIcon src={info.img} />
                <IconLabel>{info.label}</IconLabel>
              </InfoWrapper>
            </a>
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
              <SkillWrapper>
                {info.skills.map(skill => {
                  return <Tag content={skill} />;
                })}
              </SkillWrapper>

              <ul style={{ padding: "1rem" }}>
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
