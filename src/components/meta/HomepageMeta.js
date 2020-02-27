import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'
import url from 'url'
import ImageMeta from './ImageMeta'

const HomepageMeta = ({ settings, canonical, title, description, keywords, image, type }) => {
  settings = settings.site.siteMetadata
  const social = settings.social
  const publisherLogo = url.resolve(settings.siteUrl, settings.siteIcon)
  let shareImage = image ||  _.get(settings, `cover_image`, null)
  shareImage = shareImage ? url.resolve(settings.siteUrl, shareImage) : null
  description = description || settings.description
  keywords = keywords || settings.keywords
  title = `${title ||  settings.title} // ${settings.title}`

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": type,
    url: canonical,
    image: shareImage ?
      {
        "@type": `ImageObject`,
        url: shareImage,
        width: settings.shareImageWidth,
        height: settings.shareImageHeight,
      } : undefined,
    publisher: {
      "@type": `Organization`,
      name: settings.title,
      logo: {
        "@type": `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": settings.siteUrl,
    },
    description,
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {social.twitter && <meta name="twitter:site" content={`https://twitter.com/${social.twitter.replace(/^@/, ``)}/`} />}
        {social.twitter && <meta name="twitter:creator" content={social.twitter} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  )
}

HomepageMeta.propTypes = {
  settings: PropTypes.shape({
    siteIcon: PropTypes.object,
    siteUrl: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    site: PropTypes.object.isRequired,
    siteIcon: PropTypes.object,
    keywords: PropTypes.array,
    shareImageWidth: PropTypes.integer,
    shareImageHeight: PropTypes.integer,
    social: PropTypes.shape({
      twitter: PropTypes.string,
    }),
  }).isRequired,
  canonical: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array,
  image: PropTypes.string,
  type: PropTypes.oneOf([`WebSite`, `Series`, `post`]).isRequired,
}

const HomepageMetaQuery = props => (
  <StaticQuery
    query={graphql`
            query SettingsHomepageMeta {
                site {
                  buildTime(locale: "")
                  siteMetadata {
                    author {
                      name
                    }
                    logo
                    siteIcon
                    description
                    keywords
                    siteUrl
                    title
                    shareImageWidth
                    shareImageHeight
                    social {
                      github
                      instagram
                      keybase
                      twitter
                    }
                  }
                }
            }
        `}
    render={data => <HomepageMeta settings={data} {...props} />}
  />
)

export default HomepageMetaQuery
