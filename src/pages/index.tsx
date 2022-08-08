const isBrowser = typeof window !== "undefined";
isBrowser ? require("intersection-observer") : undefined;

import media from "css-in-js-media";
import * as React from "react";
import { Link } from "gatsby";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, menuItems } from "../components/Layout";
import colors from "../constant/colors";
import { Button, Container, Grid, Header, Icon } from "semantic-ui-react";
import styled, { keyframes, css } from "styled-components";
import { pulse, fadeIn } from "react-animations";
import GlobalFontStyle from "../util/globalFont";
import { bottomContent } from "../constant/data";
import { me } from "../assets/images";

const contentEnum = {
  first: "home__first",
};

const pulseAnimation = keyframes`${pulse}`;
const BouncyText = styled.h1`
  animation: 1s ${pulseAnimation} infinite;
  font-size: 50px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MainWrapper = styled.div`
  margin-top: 5vw;
  ${media("<=tablet")} {
    margin-top: 10vw;
  }
`;

const flipAnimation = css`
  visibility: visible;
  animation: 1.5s ${keyframes`${fadeIn}`};
`;
const SubWrapper = styled.div`
  padding: 50px;
  text-align: center;
`;

const Wrapper = styled.div`
  visibility: hidden;
  ${({ contentsVisible }) => contentsVisible && flipAnimation};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  background: ${colors.mainColor};
  height: 80vh;
  ${media(">desktop")} {
    height: 67vh;
  }
  text-align: center;
  color: white;
`;

interface Props {
  location: { pathname: string };
}

interface State {}

class IndexPage extends React.Component<Props, State> {
  state = {
    contentsVisible: false,
  };

  intersectionObserver: {
    observe: (arg0: any) => void;
    disconnect: () => void;
  } = null;

  contents = {
    [contentEnum.first]: {
      id: contentEnum.first,
      intersectionRatio: 0,
      label: "메인",
      ref: React.createRef(),
    },
  };

  componentDidMount() {
    this.attachIntersectionObserver();
  }

  componentWillUnmount() {
    this.detachIntersectionObserver();
  }

  attachIntersectionObserver = () => {
    if (this.intersectionObserver) {
      return;
    }

    this.intersectionObserver = new window.IntersectionObserver(
      this.handleIntersectionChange,
      {
        threshold: 0.2,
      }
    );

    Object.values(this.contents).forEach((tab) => {
      this.intersectionObserver.observe(tab.ref.current);
    });
  };

  detachIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  handleIntersectionChange = (entries: any) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        this.setState({ contentsVisible: true });
      }
    });
  };

  render() {
    const { location } = this.props;

    return (
      <div>
        <GlobalFontStyle />
        <Main>
          <HeaderMenu
            Link={Link}
            pathname={location.pathname}
            items={menuItems}
            inverted
          />
          <MainWrapper>
            <Container text>
              <Icon name="book" size="huge" />
              <BouncyText>Steady Study</BouncyText>
              <ContentWrapper>
                <img src={me} style={{ width: "200px" }} />
                <div>
                  <h2>I am Ideveloper</h2>
                  <h3>:) Idea + Developer</h3>
                </div>
              </ContentWrapper>
            </Container>
          </MainWrapper>
        </Main>
        <Wrapper contentsVisible={this.state.contentsVisible}>
          <div
            id={contentEnum.first}
            ref={this.contents[contentEnum.first].ref}
          >
            <div>
              <Grid stackable verticalAlign="middle" className="container">
                <Grid.Row>
                  <Grid.Column>
                    <SubWrapper>
                      <Header>Hi I'm Ideveloper</Header>
                      <p>기술을 활용해,좋은제품을 통해</p>
                      <p>좋은 영향력을 많은 사람들에게</p>
                      <p>전달 하고 싶습니다</p>
                    </SubWrapper>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <div>
              <Grid
                columns="3"
                textAlign="center"
                divided
                relaxed
                stackable
                className="container"
              >
                <Grid.Row>
                  {bottomContent.map((content) => {
                    return (
                      <Grid.Column
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "200px",
                          justifyContent: "center",
                        }}
                      >
                        <Header icon>
                          <Icon name={content.icon} />
                          {content.text}
                        </Header>
                        <a href={content.link}>
                          <Button
                            primary
                            size="huge"
                            style={{
                              background: colors.mainColor,
                              color: "white",
                            }}
                          >
                            {content.buttonContent}
                            <Icon
                              name={content.icon}
                              style={{
                                width: "1em",
                                height: "1em",
                                marginLeft: ".5em",
                                verticalAlign: "middle",
                              }}
                            />
                          </Button>
                        </a>
                      </Grid.Column>
                    );
                  })}
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default withLayout(IndexPage);
