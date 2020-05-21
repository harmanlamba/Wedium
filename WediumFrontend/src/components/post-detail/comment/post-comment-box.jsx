import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { postComment } from '../../../redux/actions/thunk/comment-thunk';
import RichTextBox from '../../rich-text-box/index';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const COMMENT_CHAR_LIMIT = 450;

const PostCommentBox = (props) => {
  const { classes } = props;

  const [comment, setComment] = useState('');
  const [commentTypeId, setCommentTypeId] = useState(1);
  const [isEmptyNow, setIsEmptyNow] = useState(false);
  const [isOpenSnack, setIsOpenSnack] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event);
  };

  const handleQuestionType = (event) => {
    commentTypeId === 1 ? setCommentTypeId(2) : setCommentTypeId(1);
  };

  const checkCommentDto = (commentDto) => {
    if (commentDto.Body === '') {
      return false;
    }

    return true;
  };

  const handleSendParent = () => {
    const commentDto = {
      PostId: parseInt(props.match.params.postId),
      ParentCommentId: null,
      Body: comment,
      CommentTypeId: commentTypeId,
    };

    setIsEmptyNow(true);
    if (checkCommentDto(commentDto)) {
      props.postComment(commentDto);
    } else {
      setIsOpenSnack(true);
    }
  };

  return (
    <Grid
      className={classes.root}
      container
      spacing={3}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Snackbar
        open={isOpenSnack}
        autoHideDuration={2000}
        onClose={() => setIsOpenSnack(false)}
      >
        <Alert onClose={() => setIsOpenSnack(false)} severity="warning">
          Comment is empty!
        </Alert>
      </Snackbar>

      <Grid className={classes.grid} item xs={12}>
        <Typography className={classes.commentTitle} variant="h6">
          Comments
        </Typography>
      </Grid>
      {props.user.isAuthenticated ? (
        <Grid item xs={12}>
          <Grid className={classes.grid} item xs={12}>
            <RichTextBox
              onChange={handleCommentChange}
              isEmptyNow={isEmptyNow}
              setIsEmptyNow={setIsEmptyNow}
              placeholder="Write a comment here..."
              maxLength={COMMENT_CHAR_LIMIT}
              quotedText={props.highlightText}
              isHighlighted={props.isHighlighted}
              handleIsHighlighted={props.handleIsHighlighted}
            />
            <Button
              className={clsx(classes.commentTypeButton, {
                [classes.commentTypeButtonSelected]: commentTypeId === 2,
              })}
              onClick={handleQuestionType}
              disableRipple={true}
              size="small"
            >
              QUESTION
              <FeedbackIcon className={classes.commentTypeIcon} />
            </Button>
          </Grid>

          <Grid className={classes.grid} item xs={12} align="right">
            <Button
              className={classes.sendButton}
              onClick={handleSendParent}
              variant="contained"
              color="primary"
              size="small"
            >
              {props.isLoadingAddComment && (
                <CircularProgress size={20} thickness={6} color="inherit" />
              )}
              {!props.isLoadingAddComment && 'Comment'}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <TextField
          className={classes.disabledComment}
          autoComplete="off"
          variant="outlined"
          placeholder="Log in to write a comment..."
          rows={2}
          fullWidth
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ChatBubbleOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    </Grid>
  );
};

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: -10,
    borderRadius: 0,
    padding: '0 100px 0px 100px',
  },
  grid: {
    position: 'relative',
    marginTop: '5px !important',
    padding: '0px !important',
  },
  textField: {
    '& p': {
      textAlign: 'right !important',
    },
  },
  commentTitle: {
    marginBottom: 5,
  },
  sendButton: {
    marginTop: -40,
  },
  disabledComment: {
    marginBottom: 10,
  },
  commentTypeButton: {
    opacity: 0.7,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  commentTypeButtonSelected: {
    opacity: 1,
    color: '#3f51b5',
  },
  commentTypeIcon: {
    marginLeft: 5,
  },
});

// Redux
const mapStateToProps = (state) => {
  return {
    comments: state.comment.comments,
    isLoadingAddComment: state.comment.isLoadingAddComment,
  };
};

const mapDispatchToProps = {
  postComment,
};

export default withRouter(
  withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(PostCommentBox)
  )
);
