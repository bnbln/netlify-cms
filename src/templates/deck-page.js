import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GoodIcon from '@material-ui/icons/ThumbUpAlt';
import BadIcon from '@material-ui/icons/ThumbDownAlt';
import TimeIcon from "@material-ui/icons/AccessTime"
import LoveIcon from "@material-ui/icons/Favorite"
import JobIcon from "@material-ui/icons/Work"
import { relative } from 'path';

// import DeckIcon from "@material-ui/icons/HowToVote"
// import CardIcon from "@material-ui/icons/CropPortrait"



export const DeckPageTemplate = ({
  content,
  contentComponent,
  description,
  image,
  arkana,
  planets,
  zodiac,
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

  return (
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ color: "white", width: "100%", overflow: "hidden" }}>
      {helmet || ''}
      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0
      }}>
        <img src={image ? image : null} alt={title} style={{
          filter: "blur(80px) brightness(1.99)saturate(2.3) invert(1)",
          transform: "scale(2)",
          transformOrigin: "bottom",
          position: "absolute",
          zIndex: 0,
          width: "200%",
          maxHeight: "200vh",
          opacity: 0.8,
          top: "-50%",
          left: 0
        }} />
      </div>
        <Grid item xs={12} style={{zIndex: 1}}>
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
            <img alt={title} src={image ? image : null} style={{
                width: "100%",
                height: "auto",
                maxHeight: "100%"
              }}></img>
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
              <Typography variant="h2" gutterBottom>
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
                <Grid item>
                  <TimeIcon />
                </Grid>
                <Grid item >
                  <Typography variant="body2" gutterBottom >
                    {time}
                  </Typography>
                </Grid>
              </Grid>
              : null}
            
            {short && short.common ? 
            <Typography variant="body1" gutterBottom>
                {short.common}
              </Typography> : null}
            
            <br/>
            {short && short.love ?
              <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}>
                <Grid item xs={1}>
                  <LoveIcon />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body2" gutterBottom>
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
                <Grid item xs={1}>
                  <JobIcon />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body2" gutterBottom>
                    {short.job}
                  </Typography>
                </Grid>
              </Grid>
            : null}
              <br/>
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
                <Typography variant="h5" gutterBottom>
                  <ListItemIcon>
                    <GoodIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  Natürliche Stellung
              </Typography>
                <List component="nav" aria-label="positiv">
                  {natural.map((item, i) =>
                    <ListItem key={"natural-"+i} style={{ borderTop: "0.2px solid white", backgroundColor: "#1e00ff" }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  )}
                </List>
              </Grid>
              : null}
          {upsidedown && upsidedown !== undefined ?
              <Grid item xs={11} sm={6} md={4}>
                <Typography variant="h5" gutterBottom>
                  <ListItemIcon>
                    <BadIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  Umgekehrt
              </Typography>
                <List component="nav" aria-label="positiv">
                  {upsidedown.map((item, i) =>
                    <ListItem key={"upsidedown-" + i} style={{ borderTop: "0.2px solid white", backgroundColor: "#1e00ff" }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  )}
                </List>
              </Grid>
              : null}
            </Grid>
          </Grid>

      <Grid item xs={10} sm={8} md={6} xl={5} style={{ zIndex: 1 }}>
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

  return (
    <Layout>
      <DeckPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={!!post.frontmatter.image.childImageSharp ? post.frontmatter.image.childImageSharp.fluid.src : post.frontmatter.image }
        arkana={post.frontmatter.arkana}
        planets={post.frontmatter.planets}
        zodiac={post.frontmatter.zodiac}
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
    </Layout>
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
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        } 
    }
  }
`
