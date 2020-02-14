import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <section id="error404" className={`content-section fadeRight`}>
      <div className={`layout-single-column`}>
        <h1 className={`h1 headline`}>404.</h1>
        <p>Sorry, I can&apos;t find what you&apos;re looking for.</p>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
