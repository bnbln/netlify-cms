import React from 'react'
import PropTypes from 'prop-types'
import { DeckPageTemplate } from '../../templates/deck-page'
import Layout from "../../components/Layout"
import Grid from '@material-ui/core/Grid';


import { install } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';


import { ThemeProvider } from '@material-ui/styles';
import { create } from "jss";
import { jssPreset, StylesProvider } from "@material-ui/styles";

import "../../components/all.sass"

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#032333'
    },
    secondary: {
      main: '#064260'
    },
  },
});

class DeckPostPreview extends React.Component{
  state = {
    ready: false
  };

  handleRef = ref => {
    const ownerDocument = ref ? ref.ownerDocument : null;
    this.setState({
      ready: true,
      jss: create({
        ...jssPreset(),
        insertionPoint: ownerDocument ? ownerDocument.querySelector("#demo-frame-jss") : null
      }),
      sheetsManager: new Map()
    });
  };

  render() {
    const { entry, widgetFor } = this.props;
    const data = entry.getIn(['data']).toJS()
    // console.log(this.props.widgetsFor('short').getIn(['data', 'common']))
    const short = {
      common: this.props.widgetsFor('short').getIn(['data', 'common']),
      love: this.props.widgetsFor('short').getIn(['data', 'love']),
      job: this.props.widgetsFor('short').getIn(['data', 'job'])
    }
    

    if (data) {
      return (
        <React.Fragment>
          <div id="demo-frame-jss" ref={this.handleRef} />
          {this.state.ready ? (
            <StylesProvider
              jss={this.state.jss}
              sheetsManager={this.state.sheetsManager}
            >
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Grid container style={{
                  backgroundColor: "black"
                }}>
                  <DeckPageTemplate
                    content={widgetFor('body')}
                    description={entry.getIn(['data', 'description'])}
                    image={entry.getIn(['data', 'image'])}
                    arkana={entry.getIn(['data', 'arkana'])}
                    planets={entry.getIn(['data', 'planets'])}
                    zodiac={entry.getIn(['data', 'zodiac'])}
                    title={entry.getIn(['data', 'title'])}
                    id={entry.getIn(['data', 'id'])}
                    upsidedown={entry.getIn(['data', 'upsidedown'])}
                    natural={entry.getIn(['data', 'natural'])}
                    color={entry.getIn(['data', 'color'])}
                    time={entry.getIn(['data', 'time'])}
                    short={short}


                  >
                    {/* {console.log("data: ", entry.getIn(['data', 'natural']))} */}
                  </DeckPageTemplate>

                </Grid>
              </ThemeProvider>
            </StylesProvider>
          ) : null}
        </React.Fragment>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

DeckPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DeckPostPreview
