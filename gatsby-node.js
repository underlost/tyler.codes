const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/post.js`)
  return graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___weight], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                permalink
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.posts.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'permalink')
    ) {
      slug = `/${node.frontmatter.permalink}`
      createNodeField({ node, name: 'slug', value: slug })
      // Adds the name of "gatsby-source-filesystem" as field (in this case "projects" or "pages")
      createNodeField({ node, name: 'sourceInstanceName', value: fileNode.sourceInstanceName })
    }
  }
}
