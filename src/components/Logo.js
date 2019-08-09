import React, { Component } from 'react';
import { navigate } from "gatsby"

import LogoIcon from "../../static/img/Logo.svg"


class Logo extends Component {
  render() {
    return (
      <div onClick={() => navigate("/")}>
        <LogoIcon className="logosvg" style={{
          margin: "20px 0px"
        }} />
      </div>
    )
  }
}

export default Logo;