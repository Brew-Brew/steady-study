const isBrowser = typeof window !== "undefined";
isBrowser ? require("intersection-observer") : undefined;

import media from "css-in-js-media";
import * as React from "react";
import { isMobile } from "react-device-detect";
import { Link, graphql } from "gatsby";
import { get } from "lodash";

import { MarkdownRemarkConnection, MarkdownRemark } from "../graphql-types";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, menuItems } from "../components/Layout";
import colors from "../constant/colors";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Comment,
  Card,
} from "semantic-ui-react";
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
  margin: 5vw;
  ${media("<=tablet")} {
    margin: 10vw;
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
  text-align: center;
  color: white;
  padding-bottom: 50px;
`;

const CardWrapper = styled.div`
  display: flex;
  margin: 0px 5vw;
  justify-content: space-around;
  ${media("<=tablet")} {
    flex-direction: column;
    align-items: center;
  }
`;

interface Props {
  location: { pathname: string };
  data: {
    tags: MarkdownRemarkConnection;
    posts: MarkdownRemarkConnection;
    postsCount: MarkdownRemarkConnection;
  };
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
    const { data, location } = this.props;

    const posts = isMobile ? [data.posts.edges[0]] : data.posts.edges;
    const Posts = (
      <CardWrapper>
        <br />
        {posts.map(({ node }: { node: MarkdownRemark }) => {
          const {
            frontmatter,
            timeToRead,
            fields: { slug },
            excerpt,
          } = node;
          const avatar =
            "https://user-images.githubusercontent.com/26598542/149338165-87547759-ef2f-43a3-823a-05f5f52f2214.png";
          const cover = get(frontmatter, "image.children.0.fixed", {});

          const extra = (
            <Comment.Group>
              <Comment>
                <Comment.Avatar src={avatar} srcSet={avatar} />
                <Comment.Content>
                  <Comment.Author style={{ fontWeight: 400 }}>
                    {"ideveloper"}
                  </Comment.Author>
                  <Comment.Metadata style={{ margin: 0 }}>
                    {frontmatter.updatedDate} - {timeToRead} min read
                  </Comment.Metadata>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          );

          const description = (
            <Card.Description>
              {excerpt}
              <br />
              <Link to={slug}>Read more…</Link>
            </Card.Description>
          );

          return (
            <Link to={slug} style={{ width: "300px", height: "300px" }}>
              <Card
                key={slug}
                fluid
                image={cover}
                header={frontmatter.title}
                extra={extra}
                description={description}
                style={{ height: "100%" }}
              />
            </Link>
          );
        })}
      </CardWrapper>
    );

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0px 5vw",
            }}
          >
            <h1>최근 포스팅글</h1>
            <a href="/blog" style={{ color: "white" }}>
              <span>더보러 가기</span>
              <Icon name="chevron right" />
            </a>
          </div>
          {Posts}
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
                      <p>
                        When an opportunity is certain, everyone wants to have
                        it.
                      </p>
                      <p>Exchange uncertainty for new experiences</p>
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

export const pageQuery = graphql`
  query MainBlog {
    # Get posts
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      limit: 4
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            updatedDate(formatString: "DD MMMM, YYYY")
            image {
              children {
                ... on ImageSharp {
                  fixed(width: 700, height: 100) {
                    src
                    srcSet
                  }
                }
              }
            }
            author {
              id
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(width: 35, height: 35) {
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default withLayout(IndexPage);
