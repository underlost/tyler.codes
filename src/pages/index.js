import React from 'react'
import { Link, graphql } from 'gatsby'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import SEO from '../components/seo'
import LinkButton from '../components/link-button'

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout>
        <SEO title="@underlost" />
        <section id="index" className={'site-section hidden'}>
          <h2 className={'sr-only'}>Home</h2>

          <nav className={'site-nav'}>
            <ul className={'list-nav list-unstyled'}>
                {posts.map(({ node }) => {

                  const title = node.frontmatter.title || node.fields.slug
                  const website = node.frontmatter.website
                  const alt = node.frontmatter.alt

                  return <LinkButton title={title} website={website} alt={alt} icon={node.frontmatter.icon} />
                })}

                <li className={'d-block mb-2'}>
                  <Link className={'btn btn-primary btn-block text-left'} to="/about/">
                    <span>
                      <FontAwesomeIcon icon={faInfoCircle} fixedWidth />
                    </span>{' '}
                    About
                  </Link>
                </li>
            </ul>
          </nav>
        </section>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___weight], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
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
