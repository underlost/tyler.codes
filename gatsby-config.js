module.exports = {
  siteMetadata: {
    siteUrl: `https://tyler.codes`,
    title: `Tyler.Codes`,
    shortTitle: `Tyler.Codes`,
    logo: `images/logo.png`,
    cover_image: `images/bg_03.jpg`,
    siteIcon: `images/logo.png`,
    description: `Tyler Rilling makes things on the internet.`,
    keywords: [`Tyler Rilling`, `Seattle Web Developer`, `React Developer`, `Seattle Game Designer`, `Seattle Level Designer`],
    author: {
      name: `Tyler Rilling`,
      image: ``,
      sameAsArray: {},
    },
    social: {
      twitter: `@underlost`,
      instagram: `underlost`,
      github: `underlost`,
      keybase: `underlost`,
    },
    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523,
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`,
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-zopfli`,
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require(`node-sass`),
        precision: 8,
        includePaths: [`${__dirname}/src/sass/site.scss`],
        sourceComments: true,
        sourceMap: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/links`,
        name: `links`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tyler.Codes`,
        short_name: `Tyler.Codes`,
        start_url: `/`,
        background_color: `#e7e7e2`,
        theme_color: `#ff0052`,
        display: `minimal-ui`,
        icon: `static/images/logo_alt.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: ` UA-1247925-7`,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
}
