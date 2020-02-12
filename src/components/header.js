import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'
import Bounce from 'react-reveal/Bounce'

const Header = () => {
  const data = useStaticQuery(query)
  const siteTitle = data.site.siteMetadata.title

  return (
    <Bounce right>
      <header id="info" className={`site-header fadeTop mb-3 mt-3 mt-md-5`}>
        <h1 className={`h1 mb-4`}>
          <Link to="/" rel="home">
            {siteTitle}
          </Link>
        </h1>
      </header>
    </Bounce>
  )
}

export default Header

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
