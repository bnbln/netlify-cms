import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
    <Layout>
      <Helmet title={`Deck | ${title}`} />
      <Grid container
        direction="row"
        justify="center"
        alignItems="center" style={{
          paddingRight: 0,
          marginTop: 50
        }}>
        <Grid item xs={10}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center" style={{
              // boxShadow: "-63px 30px 113px 70px black",
              position: "relative",
            }}>
            <Typography variant="h1" gutterBottom align="center">
              Deck
            </Typography>
            

          </Grid>
        </Grid>
        </Grid>
    </Layout>
  )

export default TagsPage

export const tagPageQuery = graphql`
  query SystemQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "deck-page"}}}, sort: {fields: frontmatter___id}) {
    group(field: frontmatter___arkana) {
      fieldValue
      totalCount
      nodes {
        frontmatter {
          templateKey
          title
          color
          image {
          childImageSharp {
            fluid(maxWidth: 400, quality: 100) {
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
