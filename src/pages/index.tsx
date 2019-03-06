import * as React from "react";
import { Link } from "gatsby";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import colors from "../constant/colors";
import {
  Button,
  Segment,
  Container,
  Grid,
  Header,
  Icon
} from "semantic-ui-react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { pulse, fadeInDown } from "react-animations";

const contentEnum = {
  first: "home__first"
};

const pulseAnimation = keyframes`${pulse}`;
const BouncyText = styled.h1`
  animation: 1s ${pulseAnimation} infinite;
  font-size: 50px;
`;

const MainWrapper = styled.div`
  margin-top: 200px;
`;

const fadeAnimation = css`
  animation: 1.5s ${keyframes`${fadeInDown}`};
`;
const SubWrapper = styled.div`
  padding: 50px;
  text-align: center;
`;

const Wrapper = styled.div`
  ${({ contentsVisible }) => contentsVisible && fadeAnimation}
`;

const bottomContent = [
  {
    buttonContent: "Let's study",
    icon: "book",
    text: "See how I think",
    link: "/blog/"
  },
  {
    buttonContent: "go to page",
    icon: "search",
    text: " See who am I",
    link: "/about/"
  },
  {
    buttonContent: "contact",
    icon: "phone",
    text: " Contact me",
    link: "https://github.com/zx6658/"
  }
];

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

interface Props {
  location: { pathname: string };
}

interface State {}

class IndexPage extends React.Component<Props, State> {
  state = {
    contentsVisible: false
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
      ref: React.createRef()
    }
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
      { threshold: 0.2 }
    );
    Object.values(this.contents).forEach(tab => {
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
    entries.forEach(element => {
      if (element.isIntersecting) {
        this.setState({ contentsVisible: true });
      }
    });
  };

  render() {
    const { location } = this.props;

    return (
      <div>
        <Globals />
        {/* Master head */}
        <Segment
          vertical
          inverted
          textAlign="center"
          className="masthead"
          style={{ background: `${colors.mainColor}` }}
        >
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
              <article>
                <div className="blue" />
                <div className="green" />
              </article>
              <Header inverted as="h2">
                I am Ideveloper
              </Header>
              <Header inverted as="h3">
                :) Idea + Developer
              </Header>
              <Button primary size="huge" style={{ marginTop: "50px" }}>
                Welcome to my blog
              </Button>
            </Container>
          </MainWrapper>
        </Segment>
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
                      <p>I have no fear about learning new technology</p>
                      <p>I am good at dealing with error situation</p>
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
                  {bottomContent.map(content => {
                    return (
                      <Grid.Column
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: " 200px",
                          justifyContent: "center"
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
                            style={{ background: colors.mainColor }}
                          >
                            {content.buttonContent}
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
