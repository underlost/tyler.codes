import React from 'react'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import MetaData from '../components/meta/MetaData'
import LinkButton from '../components/LinkButton'
import Image from '../components/Image'

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const shortcodes = { Link, LinkButton, Image }
  const postMeta = {
    title: post.frontmatter.title,
    published_at: post.frontmatter.published_at,
    updated_at: post.frontmatter.updated_at,
    meta_title: post.frontmatter.meta_title,
    meta_description: post.frontmatter.meta_description,
    author: post.frontmatter.author,
    feature_image: post.frontmatter.feature_image,
    tags: post.frontmatter.tags,
    keywords: post.frontmatter.keywords,
    primaryTag: post.frontmatter.primaryTag,
    og_title: post.frontmatter.og_title,
    og_description: post.frontmatter.og_description,
    twitter_title: post.frontmatter.twitter_title,
    twitter_description: post.frontmatter.twitter_description,
    excerpt: post.frontmatter.excerpt,
  }

  return (
    <Layout>
      <MetaData data={postMeta} location={location} title={post.frontmatter.title} type={post.frontmatter.layout} />

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
  location: PropTypes.object.isRequired,
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
        keywords
        layout
      }
    }
  }
`
