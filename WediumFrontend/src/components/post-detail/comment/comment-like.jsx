import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  tryLikeComment,
  tryUnlikeComment,
} from '../../../redux/actions/thunk/comment-like-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

const CommentLike = (props) => {
  const { classes } = props;
  const [isOpenSnack, setIsOpenSnack] = useState(false);

  const onButtonClick = () => {
    const commentIds = {
      commentId: props.commentId,
      parentCommentId: props.parentCommentId,
    };

    if (props.isCommentLiked) {
      props.tryUnlikeComment(commentIds, errorCallback);
    } else {
      props.tryLikeComment(commentIds, errorCallback);
    }
  };

  const errorCallback = () => {
    setIsOpenSnack(true);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={isOpenSnack}
        autoHideDuration={2000}
        onClose={() => setIsOpenSnack(false)}
      >
        <Alert onClose={() => setIsOpenSnack(false)} severity="warning">
          Cannot like/unlike comment!
        </Alert>
      </Snackbar>

      {props.isCommentLiked !== null ? (
        <Button onClick={() => onButtonClick()}>
          {props.isCommentLiked ? (
            <FavoriteIcon className={classes.likedIcon} fontSize="small" />
          ) : (
            <FavoriteBorderIcon
              className={classes.unlikedIcon}
              fontSize="small"
            />
          )}
          <Typography className={classes.text} color="textSecondary">
            {props.numberOfLikes}
          </Typography>
        </Button>
      ) : (
        <Button disabled>
          <FavoriteIcon fontSize="small" />
          <Typography className={classes.text} color="textSecondary">
            {props.numberOfLikes}
          </Typography>
        </Button>
      )}
    </div>
  );
};

CommentLike.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  text: {
    alignSelf: 'center',
    marginLeft: 5,
  },
  unlikedIcon: {
    opacity: 0.3,
  },
  likedIcon: {
    opacity: 0.8,
  },
});

const mapDispatchToProps = {
  tryLikeComment,
  tryUnlikeComment,
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(CommentLike)
);
