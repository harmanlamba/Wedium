import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { commentPostRequest } from '../../apis/comment';
import RichTextBox from '../rich-text-box/index';

// Material UI
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FeedbackIcon from '@material-ui/icons/Feedback';

const COMMENT_CHAR_LIMIT = 350;

const CommentCard = (props) => {
  const comment = props.comment;
  const { classes } = props;
  const [isexpanded, setIsExpanded] = useState(false);
  const [isChild, setIsChild] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState('');

  useEffect(() => {
    if (comment.parentCommentId !== null) {
      setIsChild(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentChange = (event) => {
    setReply(event);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isexpanded);
    setIsReply(false);
  };

  const handleReplyClick = () => {
    setIsReply(!isReply);
    setIsExpanded(false);
  };

  return (
    <div
      className={clsx(classes.parent, {
        [classes.child]: isChild,
      })}
    >
      <div className={classes.iconButtons}>
        {comment.parentCommentId === null ? (
          <IconButton
            onClick={handleReplyClick}
            aria-label="Comment button"
            size="small"
          >
            {isReply ? (
              <ChatBubbleIcon
                className={classes.commentButtonEnabled}
                fontSize="small"
              />
            ) : (
              <ChatBubbleOutlineIcon
                className={classes.commentButton}
                fontSize="small"
              />
            )}
          </IconButton>
        ) : null}
        <IconButton aria-label="Like button" size="small">
          <FavoriteIcon fontSize="small" />
        </IconButton>
      </div>

      <CardContent className={classes.contentCard}>
        <Grid className={classes.header} item xs={10}>
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

        <Grid className={classes.content} item xs={10}>
          {parse(comment.body)}
        </Grid>

        <Collapse in={isReply} timeout="auto" unmountOnExit>
          <div className={classes.replyBox}>
            <RichTextBox
              onChange={handleCommentChange}
              placeholder="Write a comment here..."
              maxLength={COMMENT_CHAR_LIMIT}
            />
            <Button
              className={classes.replyButton}
              variant="contained"
              color="primary"
              size="small"
            >
              REPLY
            </Button>
          </div>
        </Collapse>
      </CardContent>

      <CardActions className={classes.actions} disableSpacing>
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
        {comment.inverseParentComment.length !== 0 ? (
          <Button
            className={classes.expandButton}
            onClick={handleExpandClick}
            aria-expanded={isexpanded}
            aria-label="Show comments"
          >
            <Typography variant="caption">
              {comment.inverseParentComment.length} REPLIES
            </Typography>
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: isexpanded,
              })}
            />
          </Button>
        ) : null}
      </CardActions>

      <Collapse
        className={classes.childContainer}
        in={isexpanded}
        timeout="auto"
        unmountOnExit
      >
        {comment.parentCommentId === null
          ? comment.inverseParentComment.reverse().map((comment) => {
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
    marginBottom: 5,
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
      margin: '2px 0 !important',
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
    padding: '0 3px 0 8px !important',
    position: 'relative',
  },
  iconButtons: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  commentButton: {
    opacity: 0.4,
  },
  commentButtonEnabled: {
    opacity: 1,
  },
  parent: {
    position: 'relative',
    paddingBottom: 8,
  },
  child: {
    padding: '5px 0',
    borderLeft: '3px solid #3f51b5',
  },
  childContainer: {
    paddingLeft: '3.5em',
  },
  commentType: {
    position: 'absolute',
    bottom: 7,
    left: 15,
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
  replyBox: {
    position: 'relative',
    padding: '20px 0 10px 0',
    marginBottom: 10,
  },
  replyButton: {
    position: 'absolute',
    right: 0,
    marginTop: '-17px',
  },
});

export default withStyles(styles)(CommentCard);
