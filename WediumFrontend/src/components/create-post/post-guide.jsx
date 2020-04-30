import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

function PostGuide(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography variant="h5">Post Guide</Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItem button disableRipple={true}>
              <ListItemText primary="🤠 Provide a descriptive title" />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText primary="🔗 Make sure the URL is from Wikipedia" />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText primary="🤓 Give some context and interesting facts about the article in the description" />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText primary="🦉 Choose a relevant post type that reflects the article subject" />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText primary="😻 Be good :-)" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = (theme) => ({
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
});

export default withStyles(styles)(PostGuide);
