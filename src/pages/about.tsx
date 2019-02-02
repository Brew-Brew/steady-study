import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import { github, mail, tistory } from "../assets/icons";
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
    label: "Tistory blog",
    link: "",
  },
];

const AboutPage = () => {
  return (
    <Container>
      <Segment vertical>
        <Header as="h2">
          <Header.Content>Hi I'm Ideveloper</Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
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
    </Container>
  );
};

export default withLayout(AboutPage);
