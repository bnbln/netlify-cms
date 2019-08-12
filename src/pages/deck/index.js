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
              height: "100vh",
              boxShadow: "-63px 30px 113px 70px black",
              zIndex: 100,
              color: "white",
              position: "relative",
            }}>
            <Typography variant="h1" gutterBottom align="center">
              Deck
            </Typography>
            <div>
              {group.map(tag => (
                <div key={tag.fieldValue} style={{
                  marginBottom: 50
                }}>
                  {console.log(tag.nodes)}
                  <Link to={`/arkana/${kebabCase(tag.fieldValue)}/`} style={{ display: "block" }}>
                    <Typography variant="h5" gutterBottom align="center">
                      {tag.fieldValue} ({tag.totalCount})
                    </Typography>
                  </Link>
                  <Grid container justify="center"
                    alignItems="center" spacing={2}>
                    {tag.nodes.map(card => (
                      <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
                        <Link to={card.fields.slug}>
                          <img
                            alt={card.frontmatter.title}
                            style={{
                              width: "100%",
                              marginBottom: -8
                            }}
                            src={!!card.frontmatter.image.childImageSharp ? card.frontmatter.image.childImageSharp.fluid.src : card.frontmatter.image}
                          ></img>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ))}
            </div>

          </Grid>
        </Grid>
        </Grid>
    </Layout>
  )

export default TagsPage

export const tagPageQuery = graphql`
  query ArkanaQuery {
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
          image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
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
