import React from 'react'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import SEO from '../components/seo'
import LinksList from '../components/LinksList'
import PostsList from '../components/PostsList'

const ArchivePage = () => (
  <Layout>
    <SEO title="Tyler Codes Post Archive" />
    <section id="index" className={`site-section hidden`}>
      <h2 className={`h3 mb-2 text-lowercase`}>Archive</h2>

      <nav className={`site-nav`}>
        <PostsList />
      </nav>
    </section>
  </Layout>
)

export default ArchivePage