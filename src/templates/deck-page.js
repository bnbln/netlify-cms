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


export const DeckPageTemplate = ({
  content,
  contentComponent,
  description,
  image,
  arkana,
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
        <Grid item xs={12}>
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
            <Grid item xs={10} sm={5} md={3}>
              <img src={image ? image : null} alt={null} style={{
                width: "100%",
                height: "auto",
                maxHeight: "100%"
              }}></img>
            </Grid>

            <Grid item xs={10} sm={5} md={3}>
              <Typography variant="overline" display="block" gutterBottom>
              {id} | {arkana} | {color}
              </Typography>
              <Typography variant="h2" gutterBottom>
                {title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {description}
              </Typography>
            <br />
            {/* {short && short != null ?
              short.map(i => console.log("short: ", i))
              
            : null} */}
            {console.log("short", short)}
            {short && short.common ? 
            <Typography variant="body2" gutterBottom>
                {short.common}
            </Typography> : null}
            {short && short.love ?
              <Typography variant="body2" gutterBottom>
                <b>Liebe: </b>{short.love}
              </Typography> : null}
            {short && short.job ?
              <Typography variant="body2" gutterBottom>
                <b>Beruf: </b>{short.job}
              </Typography> : null}
              <br/>

              <Typography variant="body2" gutterBottom style={{
                marginTop: 20
              }}>
                <b>Zeit: </b>{time}
              </Typography>
            </Grid>


          </Grid>
        </Grid>
        <Grid item xs={11}>
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
          {natural && natural != undefined ?
              <Grid item xs={11} sm={5} md={4}>
                <Typography variant="h5" gutterBottom>
                  <ListItemIcon>
                    <GoodIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  Natürliche Stellung
              </Typography>
                <List component="nav" aria-label="positiv">
                  {natural.map((item, i) =>
                    <ListItem style={{ borderTop: "0.2px solid white", backgroundColor: "#1e00ff" }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  )}
                </List>
              </Grid>
              : null}
          {upsidedown && upsidedown != undefined ?
              <Grid item xs={11} sm={5} md={4}>
                <Typography variant="h5" gutterBottom>
                  <ListItemIcon>
                    <BadIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  Umgekehrt
              </Typography>
                <List component="nav" aria-label="positiv">
                  {upsidedown.map((item, i) =>
                    <ListItem style={{ borderTop: "0.2px solid white", backgroundColor: "#1e00ff" }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  )}
                </List>
              </Grid>
              : null}
            </Grid>
          </Grid>

        <Grid item xs={9}>
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
          <PostContent content={content} />
            
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
