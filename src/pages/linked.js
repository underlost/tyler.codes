import React from 'react'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import SEO from '../components/seo'
import LinksList from '../components/LinksList'
import PostsList from '../components/PostsList'

const LinkedPage = () => (
  <Layout>
    <SEO title={`Link Archive`} description={`Previous links to other online profiles.`} keywords={`Tyler Rilling`} />
    <section id="index" className={`site-section hidden`}>
      <h1 className={`h3 mb-2 text-capitolize`}>Link List Archive</h1>
      <p className={`lead`}>Previous links to other online profiles.</p>
      <nav className={`site-nav`}>
        <LinksList />
      </nav>
    </section>
  </Layout>
)

export default LinkedPage
