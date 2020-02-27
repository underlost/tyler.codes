import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import url from 'url'
import ArticleMeta from './ArticleMeta'
import WebsiteMeta from './WebsiteMeta'
import HomepageMeta from './HomepageMeta'

/**
* MetaData will generate all relevant meta data information incl.
* JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
*
*/
const MetaData = ({ data, settings, title, description, keywords, image, location, isHome, type }) => {
  settings = settings.site.siteMetadata
  const canonical = url.resolve(settings.siteUrl, location.pathname)
  if (isHome){
    return (
      <HomepageMeta
        canonical={canonical}
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        type="WebSite"
      />
    )
  } else if (type==`article` ) {
    return (
      <ArticleMeta
        data={data}
        canonical={canonical}
      />
    )
  } else {
    title = title || settings.title
    description = description || settings.description
    image = image || null
    image = image ? url.resolve(settings.siteUrl, image) : null
    return (
      <WebsiteMeta
        data={data}
        canonical={canonical}
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        type="WebSite"
      />
    )
  }
}

MetaData.defaultProps = {
  data: {},
  isHome: false,
}

MetaData.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.shape({
    site: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array,
  image: PropTypes.string,
  isHome: PropTypes.bool,
}

const MetaDataQuery = props => (
  <StaticQuery
    query={graphql`
            query SettingsMetaData {
              site {
                buildTime(locale: "")
                siteMetadata {
                  description
                  siteUrl
                  title
                  social {
                    github
                    instagram
                    keybase
                    twitter
                  }
                  author {
                    name
                  }
                }
              }
            }
        `}
    render={data => <MetaData settings={data} {...props} />}
  />
)

export default MetaDataQuery
