exports.onCreateNode = ({ node, boundActionCreators }) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return
  }
  const { createNodeField } = boundActionCreators

  createNodeField({
    node,
    name: 'data',
    value: JSON.stringify(node.frontmatter),
  })
}
