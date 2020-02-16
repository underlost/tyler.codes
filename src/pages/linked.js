import React from 'react'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import SEO from '../components/seo'
import LinksList from '../components/LinksList'
import PostsList from '../components/PostsList'

const LinkedPage = () => (
  <Layout>
    <SEO
      title={`Link Archive`}
      description={`Previous links to other profiles.`}
      keywords={`Tyler Rilling`}
    />
    <section id="index" className={`site-section hidden`}>
      <h2 className={`sr-only`}>Link List Archive</h2>

      <nav className={`site-nav`}>
        <LinksList />
        <PostsList />
      </nav>
    </section>
  </Layout>
)

export default LinkedPage
