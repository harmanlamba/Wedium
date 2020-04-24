import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostTypeButtons from './post-type-buttons';

class PostForm extends Component {
  render() {
    return (
      <div>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h4">Create Post</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="titleField"
              label="Title"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="wikipediaURLField"
              label="Wikipedia URL"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="descriptionField"
              label="Description (optional)"
              variant="outlined"
              multiline
              rows={8}
              rowsMax={20}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <PostTypeButtons />
          </Grid>

          <Grid item xs={6}>
            <Button variant="outlined">Cancel</Button>
          </Grid>

          <Grid
            item
            xs={6}
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button variant="contained" color="primary">
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PostForm;
