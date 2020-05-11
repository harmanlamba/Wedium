import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  tryFavouritePost,
  tryUnfavouritePost,
} from '../../redux/actions/thunk/post-favourite-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const PostFavourite = (props) => {
  const { classes } = props;

  const onButtonClick = () => {
    if (props.isFavourited) {
      props.tryUnfavouritePost(props.postId, errorCallback);
    } else {
      props.tryFavouritePost(props.postId, errorCallback);
    }
  };

  const errorCallback = () => {
    alert('Error favouriting or unfavouriting a post'); // TODO: implement some better alert system
  };

  return (
    props.isFavourited !== null && (
      <IconButton
        onClick={() => {
          onButtonClick();
        }}
      >
        {props.isFavourited ? (
          <BookmarkIcon className={classes.favouritedIcon} />
        ) : (
          <BookmarkBorderIcon className={classes.unfavouritedIcon} />
        )}
      </IconButton>
    )
  );
};

const styles = (theme) => ({
  unfavouritedIcon: {
    opacity: 0.3,
  },
  favouritedIcon: {
    opacity: 0.8,
  },
});

const mapDispatchToProps = {
  tryFavouritePost,
  tryUnfavouritePost,
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(withRouter(PostFavourite))
);
