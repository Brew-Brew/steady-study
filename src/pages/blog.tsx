import * as React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";
import styled, { keyframes } from "styled-components";
import { Grid, Card, Container, Segment, Comment } from "semantic-ui-react";
import { fadeIn } from "react-animations";
import GlobalFontStyle from "../util/globalFont";
import { MarkdownRemarkConnection, ImageSharp } from "../graphql-types";
import BlogTitle from "../components/BlogTitle";
import TagsCard from "../components/TagsCard/TagsCard";
import BlogPagination from "../components/BlogPagination/BlogPagination";
import { get } from "lodash";
import { withLayout, LayoutProps } from "../components/Layout";
import { MarkdownRemark } from "../graphql-types";
import "prismjs/themes/prism-tomorrow.css";

const fadedAnimation = keyframes`${fadeIn}`;

const FadeWrapper = styled.div`
  animation: 1s ${fadedAnimation};
  margin: 20px;
`;

interface BlogProps extends LayoutProps {
  data: {
    tags: MarkdownRemarkConnection;
    posts: MarkdownRemarkConnection;
    postsCount: MarkdownRemarkConnection;
  };
  pageContext: {
    tag?: string; // only set into `templates/tags-pages.tsx`
  };
}

const BlogPage = (props: BlogProps) => {
  const { data, location } = props;
  const tags = data.tags.group;
  const posts = data.posts.edges;
  const { pathname } = location;
  const pageCount = Math.ceil(data.postsCount.totalCount / 5);

  // TODO export posts in a proper component
  const Posts = (
    <Container>
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
          <FadeWrapper>
            <Link to={slug}>
              <Card
                key={slug}
                fluid
                image={cover}
                header={frontmatter.title}
                extra={extra}
                description={description}
              />
            </Link>
          </FadeWrapper>
        );
      })}
    </Container>
  );

  return (
    <Container>
      {/* Title */}
      <GlobalFontStyle />
      <BlogTitle />
      {/* Content */}
      <Segment vertical>
        <Grid padded style={{ justifyContent: "space-around" }}>
          <div style={{ maxWidth: 600 }}>
            {Posts}
            <Segment vertical textAlign="center">
              <BlogPagination
                Link={Link}
                pathname={pathname}
                pageCount={pageCount}
              />
            </Segment>
          </div>
          <div>
            <TagsCard Link={Link} tags={tags} tag={props.pageContext.tag} />
          </div>
        </Grid>
      </Segment>
    </Container>
  );
};

export default withLayout(BlogPage);

export const pageQuery = graphql`
  query PageBlog {
    # Get tags
    tags: allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }

    postsCount: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      totalCount
    }

    # Get posts
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      limit: 5
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
