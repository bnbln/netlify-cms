import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from "prop-types"
import { navigate } from "gatsby"


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: null,
      query: "",
      focus: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)

  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onBlur() {
    setTimeout(() => {
      if (this.state.focus) {
        this.setState({
          focus: false,
        });
      }
    }, 200);
  }
  onFocus() {
    if (!this.state.focus) {
      this.setState({
        focus: true,
      });
    }
  }

  render() {
    console.log(this.props.values)

    return (
      <div style={{ position: "relative" }} className="tarotSearch">
        <input
          type="search"
          placeholder="Karte suchen"
          name="query"
          value={this.state.query}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={(event) => this.handleChange(event)}
          autoComplete="off"
          className="withColor" />
        {this.state.query !== "" ?
          <Grid container
            justify="flex-start"
            alignItems="center"
            className="queryList" >
            {this.props.values.map((item, i) =>
              item.node.frontmatter.title.toUpperCase().includes(this.state.query.toUpperCase()) ?
                <Zoom in={true} key={i} className="listItem"
                  style={{ transitionDelay: i + '0ms' }}
                  onClick={() => navigate("/" + item.node.fields.slug + "/")}>
                  <Grid item xs={12}>
                    <Grid container spacing={3} justify="center" alignItems="center">
                      <Grid item xs={2}>
                        <div key={"row-" + i} className="imageContainer" style={{
                          backgroundImage: `url(${
                            item.node.frontmatter.image !== null ? item.node.frontmatter.image.childImageSharp.fluid.src : item.node.frontmatter.image
                            })`
                        }} />
                      </Grid>
                      <Grid item xs={9} className="textContainer">
                        <p style={{
                          fontSize: 20,
                          fontWeight: 100
                        }}>{item.node.frontmatter.title}</p>
                        <p>{item.node.frontmatter.color} {item.node.frontmatter.zodiac} {item.node.frontmatter.planets}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Zoom>
                : null
            )}
          </Grid>
          :
          this.state.focus === true ?
            <Grid container justify="flex-start" alignItems="center" className="queryList" >
              {this.props.values.map((item, i) =>
                <Zoom in={true} key={i} className="listItem" style={{ transitionDelay: i + '0ms' }}
                  onClick={() => navigate("/" + item.node.fields.slug + "/")}>
                  <Grid item xs={12}>
                    <Grid container spacing={3} justify="center" alignItems="center">
                      <Grid item xs={2}>
                        {item.node.frontmatter.image !== null ?
                            <div key={"row-" + i} className="imageContainer"
                            style={{ backgroundImage: `url(${item.node.frontmatter.image.childImageSharp.fluid.src})` }}
                            />
                        : null}
                      </Grid>
                      <Grid item xs={9} className="textContainer" >
                        <p style={{
                          fontSize: 20,
                          fontWeight: 100
                        }}>{item.node.frontmatter.title}</p>
                        <p>{item.node.frontmatter.color} {item.node.frontmatter.zodiac} {item.node.frontmatter.planets}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Zoom>
              )}
            </Grid>
            : null
        }
      </div>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query SearchQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "deck-page"}}}, sort: {fields: frontmatter___id}) {
            edges {
              node {
                frontmatter {
                  title
                  id
                  color
                  arkana
                  zodiac
                  planets
                  image {
                      childImageSharp {
                        fluid(maxWidth: 100, quality: 64) {
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
    render={values => <Search values={values.allMarkdownRemark.edges} />}
  />
)
Search.propTypes = {
  values: PropTypes.array.isRequired,
}
