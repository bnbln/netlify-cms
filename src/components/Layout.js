import React from 'react'
import { Helmet } from 'react-helmet'
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from "gatsby"

const color = "#000"

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

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <MuiThemeProvider theme={theme}>
      <Helmet>
        <html lang="de" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content={`${withPrefix("/")}img/og-image.jpg`} />
      </Helmet>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        style={{
          transition: "all 0.5s ease-in-out",
          backgroundColor: color
        }}>
        <Grid item xs={12}>
          {children}
        </Grid>

        <Navbar />

      </Grid>
      {/* <Footer /> */}
    </MuiThemeProvider>
  )
}

export default TemplateWrapper
