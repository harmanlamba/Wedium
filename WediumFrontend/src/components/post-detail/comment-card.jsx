import React, { useState } from 'react';
import clsx from 'clsx';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ChatBubbleOutlineIcon from '@material-ui/icons/InsertComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CommentCard = (props) => {
  const { classes } = props;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.commentCard} key={props.key}>
      <CardContent className={classes.contentCard}>
        <Grid className={classes.header} item xs={12}>
          {props.value.userId}
        </Grid>
        <Grid className={classes.content} item xs={12}>
          <div
            dangerouslySetInnerHTML={{ __html: props.value.body }}
            className={classes.replyBody}
          />
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="Like button">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Comment button">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show comments"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>Replies</CardContent>
      </Collapse>
    </Card>
  );
};

const styles = (theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentCard: {
    marginBottom: 15,
  },
  contentCard: {
    paddingBottom: '0px !important',
  },
  replyBody: {
    overflowWrap: 'break-word',
    wordWrap: 'breakWord',
    hyphens: 'auto',
    margin: '5px 0 !important',
  },
});

export default withStyles(styles)(CommentCard);
