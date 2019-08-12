import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Search from '../../components/Search'
import Grid from '@material-ui/core/Grid';



const SearchPage = ({
  data: {
    allMarkdownRemark,
    site: {
      siteMetadata: { title },
    },
  },
}) => (
    <Layout>
        <Helmet title={`Suche | ${title}`} />
      <Grid container justify="center"
        alignItems="center" style={{
          height: "100vh"
        }}>
        <Grid item xs={8} md={4}>
          <Search values={allMarkdownRemark.edges} />
        </Grid>
        </Grid>
    </Layout>
  )

export default SearchPage

export const tagPageQuery = graphql`
  query SearchSingleQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "deck-page"}}}) {
    edges {
      node {
        frontmatter {
          title
          color
          image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
        }
        fields {
          slug
        }
      }
    }
  }
  }
`