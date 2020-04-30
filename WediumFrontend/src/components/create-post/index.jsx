import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostForm from './post-form';
import PostGuide from './post-guide';

function CreatePost(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={7}>
          <PostForm />
        </Grid>
        <Grid item xs={3}>
          <PostGuide />
        </Grid>
      </Grid>
    </div>
  );
}

const styles = (theme) => ({
  root: {
    width: '97%',
    flexGrow: 1,
    paddingLeft: '10px',
    paddingTop: '50px',
    height: '100%',
  },
});

export default withStyles(styles)(CreatePost);
