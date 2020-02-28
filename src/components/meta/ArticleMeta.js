import React from 'react'
import Helmet from "react-helmet"
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import _ from 'lodash'
import url from 'url'

import ImageMeta from './ImageMeta'

const ArticleMeta = ({ data, settings, canonical }) => {
  const post = data
  settings = settings.site.siteMetadata
  const social = settings.social
  const author = settings.author
  const publicTags = post.keywords
  //const publicTags = `"` + post.keywords.join(`","`) + `"`
  const primaryTag = post.primaryTag || publicTags[0] || ``
  const shareImage = post.feature_image ? post.feature_image : settings.cover_image
  const publisherLogo = (settings.siteIcon) ? url.resolve(settings.siteUrl, (settings.siteIcon)) : null

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": `Article`,
    author: {
      "@type": `Person`,
      name: author.name,
      image: author.image ? author.image : undefined,
      sameAs: author.sameAsArray ? author.sameAsArray : undefined,
    },
    keywords: publicTags.length ? publicTags.join(`, `) : undefined,
    headline: post.meta_title || post.title,
    url: canonical,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: shareImage ? {
      "@type": `ImageObject`,
      url: shareImage,
      width: settings.shareImageWidth,
      height: settings.shareImageHeight,
    } : undefined,
    publisher: {
      "@type": `Organization`,
      name: config.title,
      logo: {
        "@type": `ImageObject`,
        url: publisherLogo,
        width: 60,
        height: 60,
      },
    },
    description: post.meta_description || post.excerpt,
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl,
    },
  }

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />

        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title"
          content={ post.og_title || post.meta_title || post.title }
        />
        <meta property="og:description" content={ post.og_description || post.excerpt || post.meta_description } />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        {publicTags.map((keyword, i) => (<meta property="article:tag" content={keyword} key={i} />))}
        {author.facebookUrl && <meta property="article:author" content={author.facebookUrl} />}

        <meta name="twitter:title"
          content={ post.twitter_title || post.meta_title || post.title } />
        <meta name="twitter:description" content={ post.twitter_description || post.excerpt || post.meta_description } />
        <meta name="twitter:url" content={canonical} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={author.name} />
        {primaryTag && <meta name="twitter:label2" content="Filed under" />}
        {primaryTag && <meta name="twitter:data2" content={primaryTag} />}

        {social.twitter && <meta name="twitter:site" content={`https://twitter.com/${social.twitter.replace(/^@/, ``)}/`} />}
        {social.twitter && <meta name="twitter:creator" content={social.twitter} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  )
}

ArticleMeta.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    meta_title: PropTypes.string,
    meta_description: PropTypes.string,
    author: PropTypes.object.isRequired,
    feature_image: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
        visibility: PropTypes.string,
      })
    ),
    primaryTag: PropTypes.shape({
      name: PropTypes.string,
    }),
    og_title: PropTypes.string,
    og_description: PropTypes.string,
    twitter_title: PropTypes.string,
    twitter_description: PropTypes.string,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    siteUrl: PropTypes.string,
    siteIcon: PropTypes.object,
    cover_image: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.object,
    title: PropTypes.string,
    site: PropTypes.object.isRequired,
    shareImageWidth: PropTypes.integer,
    shareImageHeight: PropTypes.integer,
    siteMetadata: PropTypes.object.isRequired,
    social: PropTypes.shape({
      twitter: PropTypes.string,
    }),
  }).isRequired,
  canonical: PropTypes.string.isRequired,
}

const ArticleMetaQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettingsArticleMeta {
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
    render={data => <ArticleMeta settings={data} {...props} />}
  />
)

export default ArticleMetaQuery
