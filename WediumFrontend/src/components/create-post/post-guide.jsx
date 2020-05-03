import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const PostGuide = (props) => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Grid
        className={classes.container}
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <Typography variant="h6">Post Guide</Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItem button disableRipple={true}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="🤠 Provide a descriptive title"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="🔗 Make sure the URL is from Wikipedia"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="🤓 Give some context and interesting facts about the article in the description"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="🦉 Choose a relevant post type that reflects the article subject"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="😻 Be good :-)"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = (theme) => ({
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
  listItemText: {
    fontSize: '0.9em', //Insert your required size
  },
});

export default withStyles(styles)(PostGuide);
