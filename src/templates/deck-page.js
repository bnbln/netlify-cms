import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
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
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}

      {console.log(image)}
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ color: "white", width: "100%", overflow: "hidden" }}>

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
            <Grid item xs={8} sm={5} md={3}>
              {console.log(image)}
              <img src={image ? image : null} alt={null} style={{
                width: "100%",
                height: "auto",
                maxHeight: "100%"
              }}></img>
            </Grid>

            <Grid item xs={8} sm={5} md={3}>
              <Typography variant="overline" display="block" gutterBottom>
                {id} | {arkana}
              </Typography>
              <Typography variant="h2" gutterBottom>
                {title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {description}
              </Typography>
              <br />
              <Typography variant="body2" gutterBottom style={{
                marginTop: 20
              }}>
                <b>Zeit: </b>{null}
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
           {natural.length !== 0 ?
              <Grid item xs={8} sm={5} md={4}>
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
            {upsidedown.length !== 0 ?
              <Grid item xs={8} sm={5} md={4}>
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

        <Grid item xs={8}>
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
            {/* {content} */}
            {/* {contentComponent} */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Grid>
        </Grid>

      </Grid> 
    </section>
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
      {console.log(post)}
      <DeckPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.image.publicURL != null ? post.frontmatter.image.publicURL : null }
        arkana={post.frontmatter.arkana}
        title={post.frontmatter.title}
        natural={post.frontmatter.natural}
        upsidedown={post.frontmatter.upsidedown}
        id={post.frontmatter.id}

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
          templateKey
          description
          image {
            publicURL
          }
        } 
    }
  }
`
