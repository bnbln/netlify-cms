import React, { Component } from 'react';
import lottie from "lottie-web";

class Lottie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    }
  }
  componentDidMount() {
    this.setState({ isMounted: true });
    setTimeout(() => {
      lottie.loadAnimation({
        container: document.getElementById('animationContainer1'), // the dom element that will contain the animation
        renderer: 'svg',
        rendererSettings: {
          // preserveAspectRatio: "xMinYMid slice",

          clearCanvas: false,
          progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
          hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        },
        loop: false,
        autoplay: true,
        animationData: this.props.data ? this.props.data : null
      });
    }, 1000)

  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  render() {
    return (
        <div id="animationContainer1" style={{ width: "100%" }} />
    )
  }
}

export default Lottie;
