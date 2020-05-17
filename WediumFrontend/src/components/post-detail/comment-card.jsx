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
    <Card className={classes.commentCard} square={true}>
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
        {props.value.parentCommentId === null ? (
          <IconButton aria-label="Comment button">
            <ChatBubbleOutlineIcon />
          </IconButton>
        ) : null}
        {props.value.inverseParentComment.length !== 0 ? (
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
        ) : null}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {props.value.parentCommentId === null
          ? props.value.inverseParentComment.map((value) => {
              return (
                <CommentCard value={value} key={value.commentId} classes />
              );
            })
          : null}
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
    borderRadius: 4,
  },
  contentCard: {
    paddingBottom: '0px !important',
  },
  replyBody: {
    overflowWrap: 'break-word',
    wordWrap: 'breakWord',
    hyphens: 'auto',
    '& p': {
      margin: '10px 0 !important',
    },
  },
});

export default withStyles(styles)(CommentCard);
