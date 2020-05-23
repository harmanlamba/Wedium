import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  tryFavouritePost,
  tryUnfavouritePost,
} from '../../redux/actions/thunk/post-favourite-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Snackbar from '@material-ui/core/Snackbar';

const PostFavourite = (props) => {
  const { classes } = props;
  const [isOpenSnack, setIsOpenSnack] = useState(false);

  // Appropriately favourite/unfavourite post on click. The thunk method for this performs action in 
  // advanced and will alter state again if api request fails through callback.
  const onButtonClick = () => {
    if (props.isFavourited) {
      props.tryUnfavouritePost(props.postId, errorCallback);
    } else {
      props.tryFavouritePost(props.postId, errorCallback);
    }
  };

  // Callback for if request to favourite/unfavourite post failed. Shows alert.
  const errorCallback = () => {
    setIsOpenSnack(true);
  };

  return (
    props.isFavourited !== null && (
      <div>
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

        <Snackbar
          open={isOpenSnack}
          autoHideDuration={2000}
          onClose={() => setIsOpenSnack(false)}
        >
          <Alert onClose={() => setIsOpenSnack(false)} severity="warning">
            Cannot favourite/unfavourite post!
          </Alert>
        </Snackbar>
      </div>
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
