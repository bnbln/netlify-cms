import React, { useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import Lottie from '../components/Lottie'
import Search from '../components/Search'
import Slider from '../components/Slider'


import logo from "../components/logo.json";


import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'

import Deck from '../components/SpringDeck'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isMounted: false
    }
    this.onComplete = this.onComplete.bind(this)
  }
  componentDidMount() {
  this.setState({isMounted: true})
  }
  onComplete(e) {
    this.setState({
      loading: e
    })
    console.log("it works", e)
  }
  render() {
    return (
      <Grid container
        direction="row"
        justify="center"
        alignItems="center" style={{
          paddingRight: 0
        }}>
        <Grid item xs={12}>
          <Hidden mdUp>
            <Grid container
              direction="row"
              justify="center"
              alignItems="flex-start"
              className="panelShadow"
              style={{
                zIndex: 100,
                position: "relative"
              }}>
              <Grid item xs={11} md={4} style={{ textAlign: "center" }}>
                <Lottie data={logo} onComplete={this.onComplete} />
                <Search />
              </Grid>
            </Grid>
          </Hidden>

          <Hidden smDown >
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              className="panelShadow"
              style={{
                zIndex: 100,
                position: "relative",
                overflowX: "hidden"
              }}>
              <Grid item xs={11} md={4} style={{ textAlign: "center" }}>
                <Lottie data={logo} onComplete={this.onComplete} />
              </Grid>
              <Grid item xs={11} sm={6} md={4} >
                <div style={{
                  width: "100%",
                  height: "75vh",
                  position: "relative",
                }}><Deck data={this.props.all} /></div>
                {/* <div style={{display: "none"}}>
              <h1>{title}</h1>
              <b>{subheading}</b>
            </div> */}
                {/* <Search /> */}
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item xs={12} style={{
        }}>
          <Hidden>
          <Grid container justify="center"
            className="withSecondaryBackgroundColor panelShadow"
            alignItems="center" style={{
              width: "100%",
              overflow: "hidden",
              padding: 0,
              position: "relative",
              zIndex: 50

            }}>

            <Grid item xs={9}>
              <Slider />
            </Grid>
            </Grid>
          </Hidden>
        </Grid>


        <Grid item xs={12}
          className="withColor panelShadow"
          style={{
            zIndex: 50,
          }}>
          <Grid container justify="center"
            alignItems="center" style={{
              padding: "10rem 0px"
            }}>
            <Grid item xs={10} md={7} >
              {this.props.links.map((item, i) =>
                <Link key={"links-" + i} to={"/" + item.url + "/"} className="withColor">
                  <Typography variant="h3" gutterBottom>
                    {item.title}
                  </Typography>
                </Link>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}
          className="withSecondaryBackgroundColor panelShadow"
          style={{
            backgroundImage: `url(${
              !!this.props.image.childImageSharp ? this.props.image.childImageSharp.fluid.src : this.props.image
              })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`,
            backgroundSize: "cover"
          }} />

        {/* <Grid item xs={12}>
        <Grid container justify="center"
          alignItems="center">
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
      </Grid> */}

      </Grid>
    )
  }


}


// import Features from '../components/Features'
// import BlogRoll from '../components/BlogRoll'
var loading = true

function onComplete (e) {
  return e
  console.log(e)
}

onComplete("a")
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  links,
  description,
  intro,
  all
}) => (

    <App
      image={image}
      title={title}
      heading={heading}
      subheading={subheading}
      links={links}
      description={description}
      intro={intro}
      all={all}
      />
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

      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        links={frontmatter.links}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        all={data.allMarkdownRemark.edges}
      />
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
        links {
                    title
                    url
                  }
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