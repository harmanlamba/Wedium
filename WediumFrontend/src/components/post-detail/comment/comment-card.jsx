import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { postComment } from '../../../redux/actions/thunk/comment-thunk';
import RichTextBox from '../../rich-text-box/index';
import CommentLike from './comment-like';

// Material UI
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FeedbackIcon from '@material-ui/icons/Feedback';

const COMMENT_CHAR_LIMIT = 350;

const CommentCard = (props) => {
  const comment = props.comment;
  const { classes } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEmptyNow, setIsEmptyNow] = useState(false);
  const [isChild, setIsChild] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState('');
  const [isOpenSnack, setIsOpenSnack] = useState(false);

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
    setIsExpanded(!isExpanded);
    setIsReply(false);
  };

  const handleReplyClick = () => {
    setIsReply(!isReply);
    setIsExpanded(false);
  };

  const checkCommentDto = (commentDto) => {
    if (commentDto.Body === '') {
      return false;
    }

    return true;
  };

  const handleSendReply = () => {
    const commentDto = {
      PostId: comment.postId,
      ParentCommentId: comment.commentId,
      Body: reply,
      CommentTypeId: 1,
    };

    setIsEmptyNow(true);
    if (checkCommentDto(commentDto)) {
      props.postComment(commentDto);
    } else {
      setIsOpenSnack(true);
    }
  };

  return (
    <div
      className={clsx(classes.parent, {
        [classes.child]: isChild,
      })}
    >
      <Grid
        className={classes.iconButtons}
        container
        spacing={0}
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid item className={classes.commentButtonParent}>
          {comment.parentCommentId === null && props.user.isAuthenticated ? (
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
        </Grid>
        <Grid item>
          <CommentLike
            user={props.user}
            numberOfLikes={comment.numberOfLikes}
            commentId={comment.commentId}
            parentCommentId={comment.parentCommentId}
            isCommentLiked={comment.isCommentLiked}
          />
        </Grid>
      </Grid>

      <CardContent className={classes.contentCard}>
        <Grid className={classes.header} item xs={10}>
          <Typography
            className={classes.username}
            variant="caption"
            color="textSecondary"
          >
            {comment.userName}
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
              placeholder="Write a reply here..."
              maxLength={COMMENT_CHAR_LIMIT}
              setIsEmptyNow={setIsEmptyNow}
              isEmptyNow={isEmptyNow}
            />
            <Button
              className={classes.replyButton}
              onClick={handleSendReply}
              variant="contained"
              color="primary"
              size="small"
            >
              {props.isLoadingAddReply && (
                <CircularProgress size={20} thickness={6} color="inherit" />
              )}
              {!props.isLoadingAddReply && 'Reply'}
            </Button>
          </div>
        </Collapse>
      </CardContent>

      <Snackbar
        open={isOpenSnack}
        autoHideDuration={2000}
        onClose={() => setIsOpenSnack(false)}
      >
        <Alert onClose={() => setIsOpenSnack(false)} severity="warning">
          Reply is empty!
        </Alert>
      </Snackbar>

      <CardActions
        className={clsx(classes.actions, {
          [classes.actionsExpanded]: comment.commentTypeId === 2,
        })}
        disableSpacing
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
        {comment.inverseParentComment.length !== 0 ? (
          <Button
            className={classes.expandButton}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label="Show comments"
          >
            <Typography variant="caption">
              {comment.inverseParentComment.length} REPLIES
            </Typography>
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: isExpanded,
              })}
            />
          </Button>
        ) : null}
      </CardActions>

      <Collapse
        className={classes.childContainer}
        in={isExpanded}
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
  actions: {
    padding: '0 3px 0 8px !important',
    position: 'relative',
  },
  actionsExpanded: {
    height: 35,
  },
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
  iconButtons: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  commentButton: {
    opacity: 0.4,
  },
  commentButtonEnabled: {
    opacity: 1,
  },
  commentButtonParent: {
    paddingBottom: '3.5px',
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

// Redux
const mapStateToProps = (state) => {
  return {
    comments: state.comment.comments,
    isLoadingAddComment: state.comment.isLoadingAddComment,
    isLoadingAddReply: state.comment.isLoadingAddReply,
  };
};

const mapDispatchToProps = {
  postComment,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CommentCard)
);
