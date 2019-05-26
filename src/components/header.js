import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"

const Header = () => {
  const data = useStaticQuery(query)
  const siteTitle = data.site.siteMetadata.title

  return (
    <header id="info" className={"site-header fadeTop mb-3 mt-3 mt-md-5"}>
      <h1 className={"h1 mb-4"}><Link to="/" rel="home">{siteTitle}</Link></h1>
    </header>
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
