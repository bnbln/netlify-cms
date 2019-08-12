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
        <Grid item xs={8} md={4}>
          <Search />
        </Grid>
        </Grid>
    </Layout>
  )

export default SearchPage