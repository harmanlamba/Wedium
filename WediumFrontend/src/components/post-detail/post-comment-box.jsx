import React, { useState } from 'react';
import { commentPostRequest } from '../../apis/comment';
import { withRouter } from 'react-router-dom';
import RichTextBox from '../rich-text-box/index';

// Material UI
import Button from '@material-ui/core/Button';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const COMMENT_CHAR_LIMIT = 350;

const PostCommentBox = (props) => {
  const { classes } = props;

  const [comment, setComment] = useState('');
  const [commentTypeId, setCommentTypeId] = useState(1);
  const [sendLoading, setSendLoading] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event);
  };

  const checkCommentDto = (commentDto) => {
    if (commentDto.Body === '') {
      // handle comment body missing popup
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

    if (checkCommentDto(commentDto)) {
      setSendLoading(true); // Start loading
      commentPostRequest(commentDto).then((response) => {
        if (response === 201) {
          // Show in UI
        }

        setSendLoading(false); // Set loading stopped
      });
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
              placeholder="Write a comment here..."
              maxLength={COMMENT_CHAR_LIMIT}
            />
          </Grid>

          <Grid className={classes.grid} item xs={12} align="right">
            <Button
              onClick={handleSendParent}
              variant="contained"
              color="primary"
              size="small"
            >
              {sendLoading && (
                <CircularProgress size={20} thickness={6} color="inherit" />
              )}
              {!sendLoading && 'Send'}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <TextField
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
    marginBottom: -5,
    borderRadius: 0,
    padding: '0 100px 0px 100px',
  },
  grid: {
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
});

export default withStyles(styles)(withRouter(PostCommentBox));
