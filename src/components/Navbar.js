import React from 'react'
import { navigate } from "gatsby"
import Grid from '@material-ui/core/Grid';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/icons/Sort';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CardIcon from "@material-ui/icons/CropPortrait"


// const bgColor = "#431758"

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
          className="withBackgroundColor"
            aria-label="icon tabs example"
            style={{
              position: "fixed",
              left: 0,
              bottom: 0,
              zIndex: 1000,
              width: "100%",
              height: 65,
              boxShadow: "rgb(0, 0, 0) 0px 0px 40px -10px",
            }
            }
          >
            <Tab icon={<IconMenu style={{ color: "#fff" }} />} aria-label="home" onClick={() => navigate("/")} />
            <Tab icon={<IconSearch style={{ color: "#fff" }} />} aria-label="search" onClick={() => navigate("/search/")} />
            <Tab icon={<IconPerson style={{ color: "#fff" }} />} aria-label="person" onClick={() => navigate("/admin/")} />
          </Tabs>
        </Hidden>
        <Hidden xsDown>
          <div className="mainNavigationBar" style={{
            height: "100vh",
            width: "50px",
            // backgroundColor: bgColor,
            // backgroundImage: "linear-gradient(-286deg, #000000, " + bgColor + ")",
            boxShadow: "rgb(0, 0, 0) 20px 0px 32px 0px",
            position: "fixed",
            backgroundXolor: "#0009",
            backgroundBlendMode: "multiply",
          top: 0,
          right: 0
        }}>
            <Grid container justify="space-between" style={{
              height: "100%"
            }}>
              <Grid item>
                <IconButton style={{ color: "#fff" }}
                  onClick={() => navigate("/")}
                >
                  <IconMenu />
                </IconButton>
                <IconButton style={{ color: "#fff" }}
                  onClick={() => navigate("/deck/")}
                >
                  <CardIcon />
                </IconButton>
                <IconButton style={{ color: "#fff" }}
                  onClick={() => navigate("/search/")}
                >
                  <IconSearch />
                </IconButton>
              </Grid>
              <Grid item>
                

              </Grid>
              {/* <Grid item alignContent="center">
            <IconButton style={{ color: "#fff" }}
              onClick={() => navigate("/admin/")}>
              <IconPerson />
            </IconButton>
              </Grid> */}
            </Grid>


          </div>
        </Hidden>
      </div>
    )
  }
}

export default Navbar
