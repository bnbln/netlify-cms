import React from 'react'
import { navigate } from "gatsby"

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/icons/Sort';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const bgColor = "blue"

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {

  }
  handleChange(e) {
    console.log(e.currentTarget.tab)
    this.setState({
      active: e
    })
  }
  render() {
    return (
      <div style={{
        position: "relative",
        zIndex: 500
      }}>
        <Hidden smUp>
          <Tabs
            value={this.state.active}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
            style={{
              position: "fixed",
              left: 0,
              bottom: 0,
              zIndex: 1000,
              color: "white",
              width: "100%",
              backgroundColor: bgColor,
              boxShadow: "rgb(0, 0, 0) 20px 0px 32px 0px",
            }
            }
          >
            <Tab icon={<IconMenu style={{ color: "#fff" }} />} aria-label="home" onClick={() => navigate("/")} />
            <Tab icon={<IconSearch style={{ color: "#fff" }} />} aria-label="search" onClick={() => navigate("/suche/")} />
            <Tab icon={<IconPerson style={{ color: "#fff" }} />} aria-label="person" />
          </Tabs>
        </Hidden>
        <Hidden xsDown>
          <div className="mainNavigationBar" style={{
            height: "100vh",
            width: "50px",
            backgroundColor: bgColor,
            // backgroundImage: "linear-gradient(-264deg, #42C7C1, #4573D6)",
            boxShadow: "rgb(0, 0, 0) 20px 0px 32px 0px",
            position: "fixed",
            top: 0,
            right: 0
          }}>
            <IconButton style={{ color: "#fff" }}
              onClick={() => navigate("/")}
            >
              <IconMenu />
            </IconButton>
            <IconButton style={{ color: "#fff" }}
              onClick={() => navigate("/suche")}
            >
              <IconSearch />
            </IconButton>
            <IconButton style={{ color: "#fff" }}>
              <IconPerson />
            </IconButton>

          </div>
        </Hidden>
      </div>
    )
  }
}

export default Navbar
