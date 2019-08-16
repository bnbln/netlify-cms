import React, { Component } from 'react';
import lottie from "lottie-web";


class Lottie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    }
  }
  componentDidMount() {
   this.animation = lottie.loadAnimation({
      container: document.getElementById('animationContainer1'), // the dom element that will contain the animation
      renderer: 'svg',
      rendererSettings: {
        preserveAspectRatio: "xMinYMid slice",

        clearCanvas: false,
        progressiveLoad: true, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
      },
      loop: false,
      autoplay: false,
      animationData: this.props.data ? this.props.data : null,
   });
    this.animation.setSpeed(0.8)
    this.animation.play()
    // this.animation.onComplete = () => this.setState({complete: true})
    // this.animation.onComplete = () => this.props.onComplete(true)

  }
  componentWillUnmount() {
    // this.animation.destroy()
  }

  render() {
    return (
        <div id="animationContainer1" style={{ width: "100%" }} />
    )
  }
}

export default Lottie;
