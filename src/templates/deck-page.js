import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Content, { HTMLContent } from '../components/Content'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Transition } from "react-transition-group"

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TimeIcon from "@material-ui/icons/AccessTime"
import LoveIcon from "@material-ui/icons/Favorite"
import JobIcon from "@material-ui/icons/Business"
// import { relative } from 'path';
const duration = 500;

const defaultStyle = {
  transition: `all ${duration}ms cubic-bezier(0.46, 0.03, 0.52, 0.96)`,
  top: "0px",
  transform: "rotate(0deg)",
  transformOrigin: "top left",
  opacity: 1,
  position: "relative"
}

const transitionStyles = {
  entering: { top: "0vh", opacity: 1, transform: "rotate(0deg)" },
  entered: { top: "0px", opacity: 1, transform: "rotate(0deg)" },
  exiting: { top: "-100vh", opacity: 0, transform: "rotate(20deg)" },
  exited: { top: "-100vh", opacity: 0, transform: "rotate(20deg)" },
};

const defaultStyle2 = {
  transition: `all ${duration / 0.5}ms cubic-bezier(0.46, 0.03, 0.52, 0.96)`,
  top: "0px",
  opacity: 1,
  transform: "scale(1)",
  position: "relative"
}
const transitionStyles2 = {
  entering: { top: "0vh", opacity: 1, transform: "scale(1)" },
  entered: { top: "0px", opacity: 1, transform: "scale(1)" },
  exiting: { top: "-100vh", opacity: 0, transform: "scale(0)" },
  exited: { top: "-100vh", opacity: 0, transform: "scale(0)" },
};
export const DeckPageTemplate = ({
  content,
  contentComponent,
  description,
  image,
  arkana,
  planets,
  zodiac,
  related,
  title,
  upsidedown,
  natural,
  id,
  color,
  time,
  short,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const [mounted, setMounted] = useState(false)
  return (
    <Grid container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ color: "white", width: "100%", overflow: "hidden" }}>
      {helmet || ''}
      <div className="backgroundBlur">
        <Transition in={mounted} timeout={duration / 2}>
          {state => (
            <div style={{
              ...defaultStyle2,
              ...transitionStyles2[state]
            }}>
              <img src={image} alt={title} />
            </div>
          )}
        </Transition>

      </div>
      <Grid item xs={12} style={{ zIndex: 1 }}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={5}
          style={{
            paddingTop: 40,
            minHeight: "100vh"
          }}
        >
          <Grid item xs={8} sm={5} md={3}>
            <Transition in={mounted} timeout={duration}>
              {state => (
                <div style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                  <img alt={title} src={image}
                    onLoad={() => setMounted(true)}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "100%"
                    }}></img>
                </div>
              )}
            </Transition>

          </Grid>

          <Grid item xs={10} sm={5} md={5} lg={4}>
            {console.log(color ? "true" : "false")}
            <Typography variant="overline" display="block" gutterBottom>
              {id}
              {arkana ? " | " + arkana : null}
              {color && color !== "" ? " | " + color : null}
              {zodiac && zodiac !== "" ? " | " + zodiac : null}
              {planets && planets !== "" ? " | " + planets : null}
            </Typography>
            <Typography variant="h2" gutterBottom style={{ letterSpacing: -1.3 }}>
              {title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {description}
            </Typography>

            {time ?
              <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                <Grid item xs={2} md={1}>
                  <TimeIcon />
                </Grid>
                <Grid item xs={10} md={11}>
                  <Typography variant="body2">
                    {time}
                  </Typography>
                </Grid>
              </Grid>
              : null}

            {short && short.common ?
              <Typography variant="body1" gutterBottom>
                {short.common}
              </Typography> : null}

            <br />
            {short && short.love ?
              <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                <Grid item xs={2} md={1}>
                  <LoveIcon />
                </Grid>
                <Grid item xs={10} md={11}>
                  <Typography variant="body2">
                    {short.love}
                  </Typography>
                </Grid>
              </Grid>
              : null}
            {short && short.job ?
              <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                <Grid item xs={2} md={1}>
                  <JobIcon />
                </Grid>
                <Grid item xs={10} md={11} >
                  <Typography variant="body2">
                    {short.job}
                  </Typography>
                </Grid>
              </Grid>
              : null}
            <br />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={11} style={{ zIndex: 1 }}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={5}
          style={{
            marginTop: 50,
            padding: "50px 0px",
          }}
        >
          {/* {console.log("natural", natural.map( i => i))} */}
          {natural && natural !== undefined ?
            <Grid item xs={11} sm={6} md={4}>
              <Typography variant="h5" gutterBottom align="center">
                Natürliche Stellung
              </Typography>
              <List component="ul" aria-label="positiv" className="proList">
                {natural.map((item, i) =>
                  <ListItem key={"natural-" + i}>
                    <ListItemText primary={item} />
                  </ListItem>
                )}
              </List>
            </Grid>
            : null}
          {upsidedown && upsidedown !== undefined ?
            <Grid item xs={11} sm={6} md={4}>
              <Typography variant="h5" gutterBottom align="center">
                Umgekehrt
              </Typography>
              <List component="ul" aria-label="positiv" className="conList">
                {upsidedown.map((item, i) =>
                  <ListItem key={"upsidedown-" + i}>
                    <ListItemText primary={item} />
                  </ListItem>
                )}
              </List>
            </Grid>
            : null}
        </Grid>
      </Grid>
      {content !== "" ? 
        <Grid item xs={10} md={7} xl={5} style={{ zIndex: 1 }}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={5}
            style={{
              marginTop: 50,
              padding: "50px 0px 200px 0px",

            }}
          >
            <Grid item xs={12}>
              <PostContent content={content} />
            </Grid>
          </Grid>
        </Grid>
        : null}
      {console.log("rel:", related)
      }
      {related !== undefined && related !== null ?
        <Grid container justify="center"
          alignItems="center" spacing={2}>
        <Grid item xs={10} md={7}>
          <Typography variant="h3" gutterBottom>
            Verwandte Karten
              </Typography>
            </Grid>
            <Grid item xs={12}>
          <Grid container justify="center"
            alignItems="flex-start" spacing={2}>
            <Grid item xs={12} style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
                overflow: 'overlay',
              marginBottom: 150
            }}>
              <GridList cols={1} style={{
                flexWrap: 'nowrap',
                // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                transform: 'translateZ(0)',
              }}>
                {/* {related.map(card => (
                  <Link to={card.slug} style={{height: "auto", marginLeft: 10}}>
                    <img
                      style={{width: "200px"}}
                      alt={card.title}
                      src={card.image}
                    ></img>
                  </Link>
                ))} */}
              </GridList>
            </Grid>
            {/* {related.map((card, i) => 
                <Grid key={card.fields.slug} item xs={6} sm={4} md={3} lg={2} xl={1}>
                  <Link to={card.fields.slug}>
                    <img
                      alt={card.frontmatter.title}
                      style={{
                        width: "100%",
                        marginBottom: -8
                      }}
                      src={card.frontmatter.image !== null ? card.frontmatter.image.childImageSharp.fluid.src : card.frontmatter.image}
                    ></img>
                  </Link>
                </Grid>
                )} */}
          </Grid>
          </Grid>
          </Grid>
        : null}
    </Grid>
  )
}

DeckPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const DeckPage = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(post.fields.relation)
  console.log(post.frontmatter.related)
  return (
    <DeckPageTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      image={post.frontmatter.image ? post.frontmatter.image.childImageSharp.fluid.src : post.frontmatter.image}
      arkana={post.frontmatter.arkana}
      planets={post.frontmatter.planets}
      zodiac={post.frontmatter.zodiac}
      related={post.fields.relation}
      title={post.frontmatter.title}
      natural={post.frontmatter.natural}
      upsidedown={post.frontmatter.upsidedown}
      color={post.frontmatter.color}
      id={post.frontmatter.id}
      time={post.frontmatter.time}
      short={post.frontmatter.short}
      helmet={
        <Helmet titleTemplate="%s | Tarot">
          <title>{`${post.frontmatter.title}`}</title>
          <meta
            name="description"
            content={`${post.frontmatter.description}`}
          />
        </Helmet>
      }
      tags={post.frontmatter.tags}
    />
  )
}

DeckPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default DeckPage

export const pageQuery = graphql`
  query CardsByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        relation {
          fields {
            slug
          }
          frontmatter {
            title
            image {
          childImageSharp {
            fluid(maxWidth: 400, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
          }
        }
      }
      id
        html
        frontmatter {
          id
          title
          upsidedown
          natural
          arkana
          planets
          zodiac
          color
          related
          templateKey
          description
          time
          short {
            common
            job
            love
          }
          image {
          childImageSharp {
            fluid(maxWidth: 400, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        } 
    }
  }
`
