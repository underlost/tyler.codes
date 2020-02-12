import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Bounce from 'react-reveal/Bounce'

import Header from './header'
import Footer from './footer'

//CSS
import '../sass/site.scss'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div id="wrapper" className={`site-wrapper mx-auto px-2 px-md-4`}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Bounce left>
          <main id="content" className={`site-content pb-2`}>
            {children}
          </main>
        </Bounce>
        <Footer />
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
