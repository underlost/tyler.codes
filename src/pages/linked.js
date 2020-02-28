import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import MetaData from '../components/meta/MetaData'
import LinksList from '../components/LinksList'

const LinkedPage = ({ location }) => (
  <>
    <MetaData location={location} type="website" title={`Link Archive`} keywords={[`Tyler Rilling`]} description={`Links to relevant profiles and articles`} />
    <Layout>
      <section id="index" className={`site-section hidden`}>
        <h1 className={`h3 mb-2 text-capitolize`}>Link List Archive</h1>
        <p className={`lead`}>Previous links to other online profiles.</p>
        <nav className={`site-nav`}>
          <LinksList />
        </nav>
      </section>
    </Layout>
  </>
)

LinkedPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default LinkedPage
