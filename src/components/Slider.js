import React, { Component } from 'react';
import {
  navigate,
  graphql,
  StaticQuery
} from "gatsby";
import PropTypes from "prop-types"
import Grid from '@material-ui/core/Grid';
import Img from "gatsby-image"


class Slider extends Component {
  _isMounted = false;

  constructor(props) {
    super(props)
    this.state = {
      scroll: null
    }
    this.scroll = this.scroll.bind(this)
  }

  componentDidMount() {
        window.addEventListener('scroll',this.scroll, false);
        window.addEventListener('resize',this.scroll, false); 

  }

  scroll(e) {
    this.setState({
      scroll: e.currentTarget.pageYOffset
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll",
      this.scroll, false);
    window.removeEventListener("resize", this.scroll , false);
  }

  render() {
    return (
      <Grid container justify="flex-end" spacing={3} style={{
        height: "130vh",
        width: "100%",
        overflow: "hidden"
      }}>
        {[this.props.values.slice(0, 49), this.props.values.slice(3, 29), this.props.values.slice(5, 69), this.props.values.slice(0, 10)].map((item, index) =>
          <Grid item key={"Grid-" + index} className={"animationcontainer-" + index} xs={6} sm={4} md={3} style={{
            transform: "translateY(" + (-380 + (60 * (index + 1)) + (-this.state.scroll / (index + 1))) + "px)",
          }}>
            <Grid container direction="column" spacing={3}>
              {item.map((item, i) =>
                item.node.frontmatter.image !== null ?
                  <Grid item key={"div-" + item.node.fields.slug} xs={12} onClick={() => navigate(item.node.fields.slug + "/")}
                    style={{height: "fit-content"}}
                  >
                    <div
                      style={{
                        background: "white",
                        backgroundImage: "url(" + item.node.frontmatter.image.childImageSharp.fluid.src + ")",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: 7,
                        width: "100%",
                        height:"fit-content",
                        cursor: "pointer",
                        // position: "relative"

                      }}>
                      <img src={item.node.frontmatter.image.childImageSharp.fluid.src} alt={item.name} style={{ width: "100%", height: "auto", opacity: 0 }} />

                  {/* <Img fluid={item.node.frontmatter.image.childImageSharp.fluid} alt={item.name}
                        onLoad={() => this.setState({ loaded: true })} /> */}
                    </div>
                  </Grid>
                  : null
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query SliderQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "deck-page"}}}, sort: {fields: frontmatter___id}) {
            edges {
              node {
                frontmatter {
                  title
                  id
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
    `}
    render={values => <Slider values={values.allMarkdownRemark.edges} />}
  />
)
Slider.propTypes = {
  values: PropTypes.array.isRequired,
}