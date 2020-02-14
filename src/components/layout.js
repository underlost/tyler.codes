import React from 'react'
import PropTypes from 'prop-types'
import Bounce from 'react-reveal/Bounce'

import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => (
  <div id="wrapper" className={`site-wrapper mx-auto px-2 px-md-4`}>
    <Header />
    <Bounce up>
      <main id="content" className={`site-content pb-2`}>
        {children}
      </main>
      <Footer />
    </Bounce>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
