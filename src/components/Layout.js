import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CSSTransition } from 'react-transition-group';



// import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from "gatsby"


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


const duration = 400;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  const [inProp, setInProp] = useState(false);
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
        <meta property="og:image" content={`${withPrefix("/")}img/download.jpeg`} />
      </Helmet>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        className="withBackgroundColor"
        style={{
          transition: "all 0.5s ease-in-out",
        }}>
        <Grid item xs={12}>
          <CSSTransition in={inProp} timeout={duration} classNames="my-node">
            <div>{children}</div>
          </CSSTransition>
          
        </Grid>
        <button type="button" onClick={() => setInProp(true)}>
          Click to Enter
                </button>
        <Navbar />

      </Grid>
      {/* <Footer /> */}
    </MuiThemeProvider>
  )
}

export default TemplateWrapper
