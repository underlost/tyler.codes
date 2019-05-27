import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(query)

  return (
    <footer className={'site-footer'}>
      <small className={'copyright'}>
        Copyright &copy; 2002–2019. <br />
        Last <a href="https://github.com/underlost/tyler.codes/">updated {data.site.buildTime}</a>.
      </small>
    </footer>
  )
}
export default Footer

const query = graphql`
  query Info {
    site {
      buildTime(formatString: "DD/MM/YYYY")
    }
  }
`
