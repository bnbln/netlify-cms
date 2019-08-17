import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const TagsPage = ({
  data: {
    allMarkdownRemark: { edges },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
    <Layout>
      {console.log(edges)}
      <Helmet title={`Legesysteme | ${title}`} />
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
              Legesysteme
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
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "system-page"}}}, sort: {fields: frontmatter___id}) {
    edges {
      node {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
  }  
`
