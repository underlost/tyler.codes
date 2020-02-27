import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import MetaData from '../components/meta/MetaData'

import Layout from '../components/layout'
import LinkButton from '../components/LinkButton'

const IndexPage = ({ data, location }) => {
  //const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <>
      <MetaData
        location={location}
        type="website"
        title={`Tyler Rilling Codes. Sometimes.`}
        keywords={[`Tyler Rilling`, `Seattle Web Developer`, `React Developer`, `Seattle Game Designer`, `Seattle Level Designer`]}
        description={`Tyler Rilling is a web developer living in Seattle.`}
        isHome={true}
      />
      <Layout>
        <section id="index" className={`site-section hidden`}>
          <h1 className={`sr-only`}>Tyler Rilling Codes. Sometimes.</h1>

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
    </>
  )
}

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
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
