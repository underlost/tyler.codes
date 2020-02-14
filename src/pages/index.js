import React from 'react'
import PropTypes from 'prop-types'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import SEO from '../components/seo'
import LinkButton from '../components/LinkButton'

const IndexPage = ({ data }) => {
  //const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges
  return (
    <Layout>
      <SEO title="Tyler Codes Sometimes." />
      <section id="index" className={`site-section hidden`}>
        <h2 className={`sr-only`}>Home</h2>

        <nav className={`site-nav`}>
          <ul className={`list-nav list-unstyled mb-0`}>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              const slug = node.fields.slug
              const website = node.frontmatter.website
              const alt = node.frontmatter.alt
              const layout = node.frontmatter.layout
              return <LinkButton key={node.fields.slug} slug={slug} layout={layout} title={title} website={website} alt={alt} icon={node.frontmatter.icon} />
            })}
          </ul>
        </nav>
      </section>
    </Layout>
  )
}

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.node.isRequired,
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___weight], order: DESC }, filter: { fields: { sourceInstanceName: {} } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            layout
            title
            alt
            website
            icon
            weight
          }
        }
      }
    }
  }
`
