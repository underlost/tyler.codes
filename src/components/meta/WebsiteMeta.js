import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'
import url from 'url'
import ImageMeta from './ImageMeta'

const WebsiteMeta = ({ data, settings, canonical, title, description, keywords, image, type }) => {
  settings = settings.site.siteMetadata
  const social = settings.social
  const publisherLogo = url.resolve(settings.siteUrl, (settings.logo || settings.siteIcon))
  let shareImage = image || data.feature_image || settings.cover_image
  shareImage = shareImage ? url.resolve(settings.siteUrl, shareImage) : null
  description = description || data.meta_description || data.description || settings.description
  title = `${title || data.meta_title || data.name || data.title} // ${settings.title}`

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

WebsiteMeta.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    meta_title: PropTypes.string,
    meta_description: PropTypes.string,
    name: PropTypes.string,
    feature_image: PropTypes.string,
    description: PropTypes.string,
    bio: PropTypes.string,
    profile_image: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    siteIcon: PropTypes.object,
    logo: PropTypes.string,
    cover_image: PropTypes.string,
    siteUrl: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    site: PropTypes.object.isRequired,
    siteIcon: PropTypes.object,
    keywords: PropTypes.array,
    shareImageWidth: PropTypes.string,
    shareImageHeight: PropTypes.string,
    social: PropTypes.shape({
      twitter: PropTypes.string,
    }),
    siteMetadata: PropTypes.object,
  }).isRequired,
  canonical: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array,
  image: PropTypes.string,
  type: PropTypes.oneOf([`WebSite`, `Series`]).isRequired,
}

const WebsiteMetaQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettingsWebsiteMeta {
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
    render={data => <WebsiteMeta settings={data} {...props} />}
  />
)

export default WebsiteMetaQuery
