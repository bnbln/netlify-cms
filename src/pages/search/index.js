import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import Search from '../../components/Search'
import Grid from '@material-ui/core/Grid';


const SearchPage = () =>(
      <Layout>
        <Helmet title={'Suche'} />
      <Grid container justify="center"
        alignItems="center" style={{
          height: "100vh"
        }}>
      <Grid item xs={10} md={4}>
        <h1 style={{textAlign: "center"}}>Suche</h1>
        <Search />
        <div style={{height: "20vh"}} />
        </Grid>
        </Grid>
    </Layout>
  )

export default SearchPage