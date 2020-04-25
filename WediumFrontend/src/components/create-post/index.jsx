import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostForm from './post-form';
import PostGuide from './post-guide';

class CreatePost extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
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
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '50px',
  },
});

export default withStyles(styles)(CreatePost);
