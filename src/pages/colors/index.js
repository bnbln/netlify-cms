import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
    <Layout>
      {console.log(group)}
      <section className="section">
        <Helmet title={`Elemente | ${title}`} />
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <h1 className="title is-size-2 is-bold-light">Colors</h1>
              <ul className="taglist">
                {group.map(tag => (
                  <li key={tag.fieldValue}>
                    <Link to={`/colors/${kebabCase(tag.fieldValue)}/`}>
                      {tag.fieldValue} ({tag.totalCount})
                  </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )

export default TagsPage

export const tagPageQuery = graphql`
  query ColorsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000, filter: {frontmatter: {templateKey: {eq: "color-page"}}}) {
    group(field: frontmatter___title) {
      fieldValue
      totalCount
      nodes {
        frontmatter {
          templateKey
        }
      }
    }
  }
  }
`
