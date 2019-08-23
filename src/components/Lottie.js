import React from 'react';
import ReactLottie from 'react-lottie';
// import lottie from "lottie-web";

export default class LottieControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      isPaused: false,
      isMounted: false,
    };
    this.onComplete = this.onComplete.bind(this)
  }

  componentDidMount() {
    this.setState({ isMounted: true })
    this.setState({ isStopped: false })
  }

  onComplete() {
    this.props.onComplete(false)
  }
  render() {

    const defaultOptions = {
      loop: false,
      autoplay: false,
      animationData: this.props.data ? this.props.data : null,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        clearCanvas: false,
        progressiveLoad: true,
      }
    };

    return <div>
      <ReactLottie options={defaultOptions}
        isStopped={this.state.isStopped}
        isPaused={this.state.isPaused}
        eventListeners={
          [
            {
          eventName: 'complete',
              callback: () => null  //this.props.onComplete(false)

            }
          ]
         }
        />
    </div>
  }
}


