import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import clsx from 'clsx';

// Material UI
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ChatBubbleOutlineIcon from '@material-ui/icons/InsertComment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FeedbackIcon from '@material-ui/icons/Feedback';

const CommentCard = (props) => {
  const comment = props.comment;
  const { classes } = props;
  const [expanded, setExpanded] = useState(false);
  const [isChild, setChild] = useState(false);

  useEffect(() => {
    if (comment.parentCommentId !== null) {
      setChild(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={clsx(classes.parent, {
        [classes.child]: isChild,
      })}
    >
      {comment.commentTypeId === 2 && comment.parentCommentId === null ? (
        <div className={classes.commentType}>
          <span>
            <Typography variant="caption" color="textSecondary">
              QUESTION
            </Typography>
            <FeedbackIcon className={classes.questionIcon} />
          </span>
        </div>
      ) : null}

      <CardContent className={classes.contentCard}>
        <Grid className={classes.header} item xs={12}>
          <Typography
            className={classes.username}
            variant="caption"
            color="textSecondary"
          >
            {comment.userId}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {moment(comment.date).format('DD MMM')} -{' '}
            {moment(comment.date).fromNow()}
          </Typography>
        </Grid>
        <Grid className={classes.content} item xs={12}>
          {parse(comment.body)}
        </Grid>
      </CardContent>

      <CardActions className={classes.actions} disableSpacing>
        <IconButton aria-label="Like button">
          <FavoriteIcon />
        </IconButton>
        {comment.parentCommentId === null ? (
          <IconButton aria-label="Comment button">
            <ChatBubbleOutlineIcon />
          </IconButton>
        ) : null}
        {comment.inverseParentComment.length !== 0 ? (
          <Button
            className={classes.expandButton}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show comments"
          >
            <Typography variant="caption">
              {comment.inverseParentComment.length} REPLIES
            </Typography>
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
            />
          </Button>
        ) : null}
      </CardActions>

      <Collapse
        className={classes.childContainer}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        {comment.parentCommentId === null
          ? comment.inverseParentComment.map((comment) => {
              return (
                <CommentCard
                  comment={comment}
                  key={comment.commentId}
                  classes={classes}
                />
              );
            })
          : null}
      </Collapse>
    </div>
  );
};

const styles = (theme) => ({
  expandButton: {
    marginLeft: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  contentCard: {
    paddingTop: '8px !important',
    paddingBottom: '0px !important',
  },
  replyBody: {
    overflowWrap: 'break-word',
    wordWrap: 'breakWord',
    hyphens: 'auto',
    '& p': {
      margin: '0px !important',
    },
  },
  content: {
    '& p': {
      margin: '10px 0 !important',
    },
    '& blockquote': {
      borderLeft: '#3f51b5 solid 3px',
      paddingLeft: 10,
      margin: '5px 10px',
    },
  },
  username: {
    marginRight: 20,
  },
  actions: {
    padding: '0 8px !important',
  },
  childContainer: {
    paddingLeft: '3em',
  },
  child: {},
  parent: {
    position: 'relative',
  },
  commentType: {
    position: 'absolute',
    top: 10,
    right: 10,
    '& span': {
      backgroundColor: '#3f51b5',
      color: '#fff',
      borderRadius: 5,
      padding: '0px 4px 3px 3px',
    },
  },
  questionIcon: {
    marginBottom: '-7px',
    width: '0.7em',
  },
});

export default withStyles(styles)(CommentCard);
