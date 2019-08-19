import React from 'react'
import { navigate } from "gatsby"
import Grid from '@material-ui/core/Grid';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/icons/Sort';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';
import IconHome from '@material-ui/icons/Home';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CardIcon from "@material-ui/icons/CropPortrait"

import Search from "./Search"


// const bgColor = "#431758"

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      menu: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
  }
  componentDidMount() {

  }
  handleChange(e) {
    console.log(e.currentTarget.tab)
    this.setState({
      active: e
    })
  }
  handleMenu(e) {
    this.setState({
      menu: !e
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
            className="mainNavigationBar"
            style={{
              position: "fixed",
              left: 0,
              bottom: 0,
              zIndex: 1000,
              width: "100%",
              height: 65,
            }
            }
          >
            <Tab icon={<IconHome style={{ color: "#fff" }} />} aria-label="home" onClick={() => navigate("/")} />
            <Tab icon={<IconSearch style={{ color: "#fff" }} />} aria-label="search" onClick={() => navigate("/search/")} />
            <Tab icon={<CardIcon style={{ color: "#fff" }} />} aria-label="deck" onClick={() => navigate("/deck/")} />

            {/* <Tab icon={<IconPerson style={{ color: "#fff" }} />} aria-label="person" href="https://tarot-manifest.netlify.com/admin" /> */}
          </Tabs>
        </Hidden>
        <Hidden xsDown>
          <div className="mainNavigationBar" style={{
            height: "100vh",
            width: this.state.menu !== true ? "50px" : "40%" ,
            // backgroundColor: bgColor,
            // backgroundImage: "linear-gradient(-286deg, #000000, " + bgColor + ")",
            boxShadow: "rgb(0, 0, 0) 20px 0px 32px 0px",
            position: "fixed",
            mixBlendMode: "multiply",
          top: -0,
          right: 0
          }}>
            <Grid container justify="flex-start" style={{
              height: "100%"
            }}>
              <Grid item xs={2} >
                <Grid container justify="space-between" direction="column" style={{
                  height: "100%"
                }}>
                  <Grid item xs={1}>
                    <IconButton style={{ color: "#fff" }}
                      onClick={() => navigate("/")}
                    >
                      <IconHome />
                    </IconButton>

                    <IconButton style={{ color: "#fff" }}
                      // onClick={() => navigate("/search/")}
                      onClick={() => this.handleMenu(this.state.menu)}
                    >
                      <IconSearch />
                    </IconButton>
                    <IconButton style={{ color: "#fff" }}
                      onClick={() => navigate("/deck/")}
                    >
                      <CardIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton style={{ color: "#fff" }}
                      href="https://tarot-manifest.netlify.com/admin">
                      <IconPerson />
                    </IconButton>
                    <IconButton style={{ color: "#fff" }}
                      onClick={() => this.handleMenu(this.state.menu)}
                    >
                      <IconMenu />
                    </IconButton>

                  </Grid>
                  </Grid>
              </Grid>
              {this.state.menu !== false ?
                <Grid item xs={9} >
                  <h2>Suche</h2>
                  <Search />
                </Grid>
                : null
              }
            </Grid>
          

          </div>
        </Hidden>
      </div>
    )
  }
}

export default Navbar
