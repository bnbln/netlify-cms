import React, { Component } from 'react';
import { navigate } from "gatsby"

import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: null
    }
    this.scroll = this.scroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      this.scroll(e)
    });
    window.addEventListener('resize', (e) => {
      this.scroll(e)
    });
  }

  scroll(e) {
    this.setState({
      scroll: e.currentTarget.pageYOffset
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', (e) => {
      this.scroll(e)
    }, true);
    window.removeEventListener('resize', (e) => {
      this.scroll(e)
    }, true
    );
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
                <Grid item key={"div-" + item.node.fields.slug} xs={12} onClick={() => navigate(item.node.fields.slug + "/")}>
                    <div
                      style={{
                        background: "white",
                        backgroundImage: "url(" + item.node.frontmatter.image.childImageSharp.fluid.src + ")",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: 7,
                        width: "100%",
                        cursor: "pointer"
                      }}>
                      <img src={item.node.frontmatter.image.childImageSharp.fluid.src} alt={item.name} style={{ width: "100%", height: "auto", opacity: 0 }} onLoad={() => this.setState({ loaded: true })} />
                    </div>
                  </Grid>
                  :null
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    )
  }
}
export default Slider;