import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import PostsList from '../components/PostsList'
import MetaData from '../components/meta/MetaData'

const ArchivePage = ({ location }) => (
  <>
    <MetaData location={location} type="website" title={`Post Archibe`} keywords={[`Tyler Rilling`]} description={`Previous posts, articles and case studies.`} />
    <Layout>
      <section id="index" className={`site-section hidden`}>
        <h1 className={`h3 mb-2 text-capitolize`}>Post Archive</h1>
        <p className={`lead`}>Previous posts, articles and case studies.</p>

        <nav className={`site-nav`}>
          <PostsList />
        </nav>
      </section>
    </Layout>
  </>
)

ArchivePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default ArchivePage
