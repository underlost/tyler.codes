import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogPostTemplate = () => {
  const post = this.props.data.markdownRemark
  const { previous, next } = this.props.pageContext

  return (
    <Layout location={this.props.location}>
      <SEO title={post.frontmatter.title} description={post.frontmatter.alt || post.excerpt} />

      <h1 className={`h3 mb-2`}>{post.frontmatter.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <hr />

      <ul
        className={`list-unstyled`}
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        alt
      }
    }
  }
`
