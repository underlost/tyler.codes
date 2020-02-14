import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import LinkButton from './LinkButton'

const PostsList = () => {
  const data = useStaticQuery(query)

  return (
    <ul className={`list-nav list-unstyled mb-0`}>
      {data.allMdx.edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const website = node.fields.slug
        const alt = node.frontmatter.alt

        return <LinkButton key={node.fields.slug} title={title} website={website} alt={alt} icon={node.frontmatter.icon} />
      })}
    </ul>
  )
}

const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___weight], order: DESC }, filter: { fields: { sourceInstanceName: { eq: "posts" } } }) {
      edges {
        node {
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

export default PostsList
