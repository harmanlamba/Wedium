import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostForm from './post-form';
import PostGuide from './post-guide';
import Header from '../header';

function CreatePost(props) {
  const { classes } = props;
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={classes.root}>
      <Header user={storedUser} />
      {storedUser ? (
        <Grid
          className={classes.grid}
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <PostForm />
          </Grid>
          <Grid item xs={3}>
            <PostGuide />
          </Grid>
        </Grid>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

const styles = (theme) => ({
  grid: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    paddingTop: '1%',
  },
  root: {
    width: '100%',
    flexGrow: 1,
    height: '100%',
  },
});

export default withStyles(styles)(CreatePost);