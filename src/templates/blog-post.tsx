import * as React from 'react'
import { Link } from 'gatsby'
import { get } from 'lodash'
import { Header, Container, Segment, Icon, Label, Button, Grid, Card, Image, Item, Comment } from 'semantic-ui-react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { MarkdownRemark, ImageSharp, MarkdownRemarkConnection, Site } from '../graphql-types'
import BlogTitle from '../components/BlogTitle'
import { DiscussionEmbed } from 'disqus-react'
import { withLayout, LayoutProps } from '../components/Layout'
import GlobalFontStyle from '../util/globalFont'

const Wrapper = styled.div`
  p {
    line-height: 2rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 13px;
  }
  img {
    max-width: 100%;
  }
`

interface BlogPostProps extends LayoutProps {
  data: {
    post: MarkdownRemark
    recents: MarkdownRemarkConnection
    site: Site
  }
}

const BlogPostPage = (props: BlogPostProps) => {
  const { frontmatter, html, timeToRead } = props.data.post

  const tags = props.data.post.frontmatter.tags.map((tag) => (
    <Label key={tag}>
      <Link to={`/blog/tags/${tag}/`}>{tag}</Link>
    </Label>
  ))

  const recents =
    props.data.recents &&
    props.data.recents.edges.map(({ node }) => {
      const recentAvatar =
        'https://user-images.githubusercontent.com/26598542/149338165-87547759-ef2f-43a3-823a-05f5f52f2214.png'
      const recentCover = get(node, 'frontmatter.image.children.0.fixed', {})
      const extra = (
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={recentAvatar} srcSet={recentAvatar} />
            <Comment.Content>
              <Comment.Author style={{ fontWeight: 400 }}>{'ideveloper'}</Comment.Author>
              <Comment.Metadata style={{ margin: 0 }}>{node.timeToRead} min read</Comment.Metadata>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      )

      return (
        <div key={node.fields.slug} style={{ paddingBottom: '1em' }}>
          <Card as={Link} to={node.fields.slug} image={recentCover} header={node.frontmatter.title} extra={extra} />
        </div>
      )
    })

  const cover = get(frontmatter, 'image.children.0.fixed', {})
  const avatar = 'https://user-images.githubusercontent.com/26598542/149338165-87547759-ef2f-43a3-823a-05f5f52f2214.png'

  return (
    <Container>
      <Helmet>
        <meta name='title' content={frontmatter.title} />
        <meta property='og:image' content={cover.src} />
      </Helmet>
      <GlobalFontStyle />
      <BlogTitle />
      <Segment vertical style={{ border: 'none' }}>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src={avatar} srcSet={avatar} circular />
            <Item.Content>
              <Item.Description>{'ideveloper'}</Item.Description>
              <Item.Meta>{'Front end Developer who steadily study '}</Item.Meta>
              <Item.Extra>
                {frontmatter.updatedDate} - {timeToRead} min read
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Header as='h1'>{frontmatter.title}</Header>
      </Segment>
      <Image {...cover} fluid />
      <Wrapper>
        <Segment
          vertical
          style={{ border: 'none' }}
          dangerouslySetInnerHTML={{
            __html: html
          }}
        />
      </Wrapper>
      <Segment vertical>{tags}</Segment>
      {props.data.site && props.data.site.siteMetadata && props.data.site.siteMetadata.disqus && (
        <Segment vertical>
          <DiscussionEmbed shortname={props.data.site.siteMetadata.disqus} config={{}} />
        </Segment>
      )}
      <Segment vertical>
        <Grid padded centered>
          {recents}
        </Grid>
      </Segment>
    </Container>
  )
}

export default withLayout(BlogPostPage)

export const pageQuery = graphql`
  query TemplateBlogPost($slug: String!) {
    site: site {
      siteMetadata {
        disqus
      }
    }

    postsCount: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      totalCount
    }

    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      fields {
        slug
      }
      frontmatter {
        tags
        author {
          id
          bio
          twitter
          avatar {
            children {
              ... on ImageSharp {
                fixed(width: 80, height: 80, quality: 100) {
                  src
                  srcSet
                }
              }
            }
          }
        }
        title
        updatedDate(formatString: "MMM D, YYYY")
        image {
          children {
            ... on ImageSharp {
              fixed(width: 900, height: 300, quality: 100) {
                src
                srcSet
              }
            }
          }
        }
      }
    }
    recents: allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } }, fileAbsolutePath: { regex: "/blog/" } }
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            image {
              children {
                ... on ImageSharp {
                  fixed(width: 300, height: 100) {
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
                    fixed(width: 36, height: 36) {
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
`
