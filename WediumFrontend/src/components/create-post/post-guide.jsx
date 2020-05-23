import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

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
              <WbIncandescentIcon className={classes.icon} />
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary=" Give an interesting title"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <LinkIcon className={classes.icon} />
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary=" Verify that your URL is from Wikipedia"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <DescriptionIcon className={classes.icon} />
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary=" Provide interesting facts about the article in the description"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <AllInboxIcon className={classes.icon} />
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary=" Choose a relevant post type that reflects the article subject"
              />
            </ListItem>
            <ListItem button disableRipple={true}>
              <EmojiEmotionsIcon className={classes.icon} />
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary=" Be respectful"
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
    fontSize: '1.1em', //Insert your required size
    fontWeight: 600,
  },
  icon: {
    marginRight: 20,
  },
});

export default withStyles(styles)(PostGuide);
