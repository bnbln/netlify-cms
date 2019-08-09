import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'
import { navigate } from "gatsby"


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: null,
      query: ""
    }
    this.handleChange = this.handleChange.bind(this)

  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.props.values)
    return (
      <div>
        <input
          placeholder="Karte suchen"
          name="query"
          value={this.state.query}
          onChange={(event) => this.handleChange(event)}
          style={{
            width: "calc(100% - 14px)",
            font: "100 14px monospace",
            background: "none",
            borderWidth: 0,
            borderBottomWidth: 0,
            color: "#fff",
            padding: 7,
            outlineWidth: 0,
            WebkitAppearance: "button-bevel"
          }}></input>
        {this.state.query !== "" ?
          <Grid container justify="flex-start" alignItems="center" style={{
            marginTop: 20,
            width: "100%",
            borderRadius: 5,
            overflowY: "scroll",
            overflowX: "hidden",
            scrollbarColor: "light",
            maxHeight: 400
          }}>
            {this.props.values.map((item, i) =>
              item.node.frontmatter.title.toUpperCase().includes(this.state.query.toUpperCase()) ?
                <Zoom in={true} key={i} className="listItem" style={{
                  transitionDelay: i + '0ms',
                  padding: "15px 0px",
                }}
                  onClick={() => navigate("/" + item.node.fields.slug + "/")}
                >
                  <Grid item xs={12}>
                    <Grid container spacing={3} justify="center" alignItems="center">
                      <Grid item xs={2}>
                        <div key={"row-" + i} style={{
                          backgroundImage: `url(${
                            !!item.node.frontmatter.image.childImageSharp ? item.node.frontmatter.image.childImageSharp.fluid.src : item.node.frontmatter.image
                            })`,
                          backgroundColor: "white",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          borderRadius: 5,
                          minHeight: 1,
                          width: "100%",
                          paddingTop: "150%"
                        }} />
                      </Grid>
                      <Grid item xs={9}>
                        <p style={{
                          fontSize: 20,
                          fontWeight: 100
                        }}>{item.node.frontmatter.title}</p>
                        <p>{item.node.frontmatter.color}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Zoom>
                : null
            )}
          </Grid>
          : null}
      </div>
    )
  }
}


export default Search


export const searchQuery = graphql`
  query SearchQuery {
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