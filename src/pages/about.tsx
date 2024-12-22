import * as React from "react";
import media from "css-in-js-media";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

import { withLayout } from "../components/Layout";
import Tag from "../components/Tag/Tag";
import colors from "../constant/colors";
import GlobalFontStyle from "../util/globalFont";
import {
  abooutInfo,
  careerInfo,
  skillInfo,
  mottoInfo,
  pressInfo,
  awardsInfo,
  contributionInfo,
  storyInfo,
} from "../constant/data";

const fadedAnimation = keyframes`${fadeIn}`;

const InfoContent = styled.div`
  margin-top: 10px;
  border: 3px solid rgb(33, 150, 243);
  padding: 10px;
  border-radius: 20px;
  padding: 20px;
  & > li {
    list-style: none;
    font-size: 16px;
    margin-bottom: 10px;
  }
  & > p {
    margin-top: 10px;
  }
`;

const InfoDescription = styled.p`
  font-weight: bold;
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
  margin-bottom: 10px;
`;

const Print = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: rgb(33, 150, 243);
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  ${media("<=tablet")} {
    position: fixed;
    right: 5px;
    top: 5px;
  }
`;

const AboutPage = () => {
  return (
    <Container>
      <GlobalFontStyle />
      <Segment vertical>
        <Header as="h1" style={{ position: "relative" }}>
          <Title>
            <FadedText>
              😀<span style={{ margin: "1rem" }}>I'm Ideveloper</span>
            </FadedText>
          </Title>
          <Print className="no-print" onClick={() => window.print()}>
            <Icon name="print" />
            이력서 프린트
          </Print>
        </Header>
      </Segment>
      <Segment>
        <InfoTitle> 🙋‍♂️ My Info</InfoTitle>
        {abooutInfo.map((info) => {
          return (
            <a href={info.link} target="_blank" rel="noopener noreferrer">
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
        <InfoTitle>🏢 My Career</InfoTitle>
        {careerInfo.map((info) => {
          return (
            <InfoWrapper>
              <div style={{display: 'flex',alignItems:'center',gap:4}}>
               <CompanyIcon src={info.img} style={{margin:0}}/>
               {info.imgAlt ? <p>{info.imgAlt}</p>:""}
              </div>
              <p style={{ margin: "0" }}>
                ({info.date}) {info.description}
              </p>

              <ul style={{ padding: "0", margin: "0" }}>
                {info.task.map((task) => {
                  return (
                    <InfoContent>
                      <li><div dangerouslySetInnerHTML={{
                                        __html:task.title,
                                      }}
                                    /></li>
                      {task.skills.map((skill) => (
                        <Tag content={skill} />
                      ))}
                      {task.participant && <p>참여인원: {task.participant}</p>}
                      {task.description &&
                        task.description.map((d) => (
                          <>
                            <InfoDescription>{d.title}</InfoDescription>
                            <ul>
                              {d.content?.map((content) => {
                                return (
                                  <li>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: content,
                                      }}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </>
                        ))}
                    </InfoContent>
                  );
                })}
              </ul>
            </InfoWrapper>
          );
        })}
        <div />
      </Segment>
      <Segment>
        <InfoTitle>📖 My Story</InfoTitle>
        {storyInfo.map((story) => {
          return (
            <InfoWrapper>
              <a href={story.link} target="_blank">
                {story.title}
              </a>
              <p> - {story.description}</p>
            </InfoWrapper>
          );
        })}
      </Segment>
      <Segment>
        <InfoTitle>💻 Skills</InfoTitle>
        {skillInfo.map((info) => {
          return (
            <InfoWrapper>
              <h3>{info.title}</h3>
              <ul>
                {info.description.map((description) => {
                  return <li>{description}</li>;
                })}
              </ul>
            </InfoWrapper>
          );
        })}
        <div />
      </Segment>
      <Segment>
        <InfoTitle>👨🏼‍💻 Contributions</InfoTitle>
        {contributionInfo.map((info) => {
          return (
            <React.Fragment>
              <InfoWrapper>
                <Tag content={info.from} />
                {info.list.map((content) => {
                  return (
                    <React.Fragment>
                      <h4>- {content.title}</h4>
                      <a href={content.link}>{content.link}</a>
                    </React.Fragment>
                  );
                })}
              </InfoWrapper>
              <br />
            </React.Fragment>
          );
        })}
        <div />
      </Segment>
      <Segment>
        <InfoTitle>📰 Press release</InfoTitle>
        {pressInfo.map((info) => {
          return (
            <InfoWrapper
              style={{ borderBottom: `1px solid ${colors.mainColor}` }}
            >
              <h3>{info.title}</h3>
              <a>{info.link}</a>
              <p>{info.ref}</p>
              <p>{info.content}</p>
              <br />
            </InfoWrapper>
          );
        })}
      </Segment>
      <Segment>
        <InfoTitle>💙 Mottos</InfoTitle>
        {mottoInfo.map((motto) => {
          return <li>{motto}</li>;
        })}
        <div />
      </Segment>
      <Segment>
        <InfoTitle>🏆 Awards / Activity</InfoTitle>
        {awardsInfo.map((award) => {
          return (
            <React.Fragment>
              <h3>{award.title}</h3>
              <h5>{award.from}</h5>
              <p>{award.content}</p>
              <hr />
            </React.Fragment>
          );
        })}
        <div />
      </Segment>
    </Container>
  );
};

export default withLayout(AboutPage);
