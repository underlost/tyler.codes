import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Bounce from 'react-reveal/Bounce';

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
      <Bounce left>
      <div id="wrapper" className={'site-wrapper mx-auto px-2 px-md-4'}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main id="content" className={'site-content pb-2'}>
          {children}
        </main>
        <Footer />
      </div>
      </Bounce>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
