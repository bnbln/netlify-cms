import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function elementsQuery(values) {
  var Wasser = values.filter((card) => card.frontmatter.color === "Wasser");
  var Feuer = values.filter((card) => card.frontmatter.color === "Feuer");
  var Erde = values.filter((card) => card.frontmatter.color === "Erde");
  var Luft = values.filter((card) => card.frontmatter.color === "Luft");
  var elemente = [Feuer, Wasser, Erde, Luft]
  return elemente
}

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
            <div>
              {group.map(tag => (
                <div key={tag.fieldValue} style={{
                  marginBottom: 50
                }}>
                  <Link to={`/arkana/${kebabCase(tag.fieldValue)}/`} style={{ display: "block" }}>
                    <Typography variant="h5" gutterBottom align="center">
                      {tag.fieldValue} ({tag.totalCount})
                    </Typography>
                  </Link>
                  
                  <Grid container justify="center"
                    alignItems="center" spacing={2}>
                    {console.log(elementsQuery(tag.nodes), tag.nodes)}  
                    {tag.fieldValue === "Kleine Arkana" ?
                      elementsQuery(tag.nodes).map((item, i) => 
                        item.length !== 0 ?
                          <Grid item xs={12}>
                            <Link to={`/colors/${kebabCase(item[0].frontmatter.color)}/`} style={{ display: "block" }}>
                            <Typography variant="h6" gutterBottom align="center">
                              {item[0].frontmatter.color}
                              </Typography>
                            </Link>
                          <Grid container justify="center" alignItems="center" spacing={2}>
                              {item.map((card, i) => (
                                <Grid key={card.fields.slug} item xs={6} sm={4} md={3} lg={2} xl={1}>
                                  <Link to={card.fields.slug}>
                                    <img
                                      alt={card.frontmatter.title}
                                      style={{
                                        width: "100%",
                                        marginBottom: -8
                                      }}
                                      src={card.frontmatter.image !== null ? card.frontmatter.image.childImageSharp.fluid.src : card.frontmatter.image}
                                    ></img>
                                  </Link>
                                </Grid>
                              )
                              )}
                          </Grid>
                        </Grid>
                          : null)
                    : tag.nodes.map(card => (
                      <Grid key={card.fields.slug} item xs={6} sm={4} md={3} lg={2} xl={1}>
                        <Link to={card.fields.slug}>
                          <img
                            alt={card.frontmatter.title}
                            style={{
                              width: "100%",
                              marginBottom: -8
                            }}
                            src={card.frontmatter.image !== null ? card.frontmatter.image.childImageSharp.fluid.src : card.frontmatter.image}
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
