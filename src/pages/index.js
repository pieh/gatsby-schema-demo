import React from 'react'

class Index extends React.Component {
  render() {
    const rows = [
      'string',
      'int',
      'date',
      'arrayOfString',
      'arrayOfNumbers',
      'notUsedField',

      'customType',

      'mapping',

      'localFile',
      'union',
    ]

    const edges = this.props.data.allMarkdownRemark.edges

    const borderStyle = {
      border: '1px solid #ccc',
      padding: 5,
    }
    const dataCellStyle = {
      ...borderStyle,
      textAlign: 'center',
    }

    const imgUrl = require('./graphiql.png')

    return (
      <div
        style={{
          margin: '0 auto',
          fontFamily: 'sans-serif',
        }}
      >
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th />
              {edges.map(({ node }, index) => (
                <th key={`head_${index}`} style={borderStyle} colSpan="2">
                  {node.frontmatter.title}.md
                </th>
              ))}
            </tr>
            <tr>
              <th />
              <th style={borderStyle}>Output</th>
              <th style={borderStyle}>Input</th>
              <th style={borderStyle}>Output</th>
              <th style={borderStyle}>Input</th>
              <th style={borderStyle}>Output</th>
              <th style={borderStyle}>Input</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(row => {
              const cells = [
                <th style={borderStyle} key={`h${row}`}>
                  {row}
                </th>,
              ]

              edges.forEach(({ node }, index) => {
                cells.push(
                  <td style={dataCellStyle} key={`h${row}_${index}_1`}>
                    <pre>{JSON.stringify(node.frontmatter[row])}</pre>
                  </td>
                )
                const input = JSON.parse(node.fields.data)[row]
                cells.push(
                  <td style={dataCellStyle} key={`h${row}_${index}_2`}>
                    <pre>
                      {typeof input !== 'undefined'
                        ? JSON.stringify(input)
                        : 'undefined'}
                    </pre>
                  </td>
                )
              })
              return <tr key={`row_${row}`}>{cells}</tr>
            })}
          </tbody>
        </table>
        <div style={{ marginTop: 20 }}>
          <h3>GraphiQL</h3>
          <a href={imgUrl}>
            <img src={imgUrl} style={{ maxWidth: '100%', height: 'auto' }} />
          </a>
        </div>
      </div>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___title] }) {
      edges {
        node {
          fields {
            data
          }
          frontmatter {
            title
            string
            int
            date(formatString: "YYYY.MM.DD")
            arrayOfString
            arrayOfNumbers
            notUsedField
            customType {
              string
              int
              float
              bool
            }
            mapping {
              id
            }
            localFile {
              id
            }
            union {
              __typename
              ... on File {
                relativePath
              }
              ... on MarkdownRemark {
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`
