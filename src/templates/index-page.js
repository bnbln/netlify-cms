import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Illustration from "../../static/img/Illustration_Cards.svg"


import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
    <Grid container
      direction="row"
      justify="center"
      alignItems="center" style={{
        paddingRight: 0
      }}>
      <Grid item xs={12}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center" style={{
            height: "100vh",
            boxShadow: "-63px 30px 113px 70px black",
            zIndex: 100,
            position: "relative"
          }}>
          <Grid item xs={11} md={6} style={{ textAlign: "center" }}>
            <Illustration style={{ maxWidth: "100%" }} />
          </Grid>
          <Grid item xs={11} sm={6} md={4} >

            <Logo />
            <h1>{title}</h1>
            <b>{subheading}</b>
            {/* <Search values={this.props.query.tarot.deck} /> */}

          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
        width: "100%",
        height: "100vh"
      }} />
      <Grid item xs={12} style={{
        height: "100vh",
        zIndex: 150,
        color: "white"
      }}>
        <Grid container justify="center"
          alignItems="center" style={{
            padding: "10rem 0px"
          }}>
          <Grid item xs={10} md={7} >
            {/* mainpitch.url */}
            {/* <Link to={"./deck/"} style={{ color: "white" }}>
              <Typography variant="h2" gutterBottom>
                {mainpitch.title}
              </Typography>
            </Link> */}
            <Typography variant="h2" gutterBottom>
              Die Kleine Arkana
            </Typography>
            <Typography variant="h2" gutterBottom>
              Elemente
            </Typography>
            <Typography variant="h2" gutterBottom>
              Legetechniken
            </Typography>

          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={10}>
            <h1 className="title"></h1>
            <h3 className="has-text-weight-semibold is-size-2">
              {heading}
            </h3>
            <p>{description}</p>
            <Features gridItems={intro.blurbs} />
            <BlogRoll />
          </Grid>
        </Grid>
      </Grid>

  </Grid>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        links={frontmatter.links}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
  
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
