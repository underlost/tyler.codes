import React from 'react'
import Fade from 'react-reveal/Fade'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ImageAbout from '../components/image-about'

class AboutPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="About This Site" />

        <h1 className={'h3 mb-2'}>About this site</h1>

        <p className={'lead'}>
          This site serves as a link list of various relevant sites and projects I'm involved with.
        </p>

        <ImageAbout />

        <p className={'mt-4'}>
          Sites like Instagram only provide a single link in your bio. I built this site as a way to easily link to blog
          posts, ands anything recent or interesting I might want to share on Instargram and other sites, with out the
          need to always update the profile link.
        </p>
        <p>
          For more information about myself, make sure to check out my personal site,{' '}
          <a href="https://underlost.net">underlost.net</a>.
        </p>
      </Layout>
    )
  }
}

export default AboutPage
