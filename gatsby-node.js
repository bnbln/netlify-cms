const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })    
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}




exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions;

  const postsOfAuthors = {};
  // iterate thorugh all markdown nodes to link books to author
  // and build author index
  const markdownNodes = getNodes()
    .filter(node => node.internal.type === "MarkdownRemark")
    .forEach(node => {
      if (node.frontmatter.related) {
        const authorNode = node.frontmatter.related.map((item, i) =>
          getNodes().find(
            node2 => 
              node2.internal.type === "MarkdownRemark" &&
                node2.frontmatter.title === item
          )
        )
        if (authorNode) {
          function filterMyNodes(item) {
            const fields = {
              id: item.id,
              fields: {
                slug: item.fields.slug,
              },
              frontmatter: {
                image: item.frontmatter.image,
                title: item.frontmatter.title
              }
              
            }
            return fields
          }
          var items = [];
          authorNode.forEach((item, i) => {
            items.push(filterMyNodes(item))
          })
          console.log(items)

          
          // console.log(authorNode[0].frontmatter.image, authorNode[0].frontmatter.title, authorNode[0].fields.slug);
          // const items = authorNode.map((item, i) => 
          //   ({"image": item.frontmatter.image,
          //   "title": item.frontmatter.title,
          //   "slug": item.fields.slug})
          // )
          
          createNodeField({
            node,
            name: "relation",
            value: items
          });
        }
      }
    });

  // Object.entries(postsOfAuthors).forEach(([authorNodeId, postIds]) => {
  //   createNodeField({
  //     node: getNode(authorNodeId),
  //     name: "posts",
  //     value: postIds,
  //   });
  // });
};