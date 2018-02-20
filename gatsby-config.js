module.exports = {
  siteMetadata: {
    title: 'Gatsby schema definition demo',
  },
  pathPrefix: `/gatsby-schema-demo`,
  mapping: {
    'MarkdownRemark.frontmatter.mapping': `LocalFile`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
    },
  ],
}
