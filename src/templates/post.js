import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import SEO from '../components/seo'
import LinkButton from '../components/LinkButton'
import Image from '../components/Image'

const BlogPostTemplate = ({ data }) => {
  const post = data.mdx
  const shortcodes = { Link, LinkButton, Image }

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.alt || post.excerpt}
        keywords={post.frontmatter.keywords}
      />

      <h1 className={`h3 mb-2 text-capitolize`}>{post.frontmatter.title}</h1>
      <p className={`lead`}>{post.frontmatter.description}</p>

      <MDXProvider components={shortcodes}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>

      <hr />
    </Layout>
  )
}

export default BlogPostTemplate

BlogPostTemplate.propTypes = {
  data: PropTypes.node.isRequired,
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      excerpt
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
        icon
      }
    }
  }
`
