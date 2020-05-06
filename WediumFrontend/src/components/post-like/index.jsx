import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tryLikePost, tryUnlikePost } from '../../redux/actions/thunk/post-like-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@material-ui/core';

const PostLike = (props) => {
    const { classes } = props;

    const onButtonClick = () => {
        if (props.isPostLiked) {
            props.tryUnlikePost(props.postId, errorCallback);
        } else {
            props.tryLikePost(props.postId, errorCallback);
        }
    }

    const errorCallback = () => {
        alert("error liking or unliking post"); // TODO: implement some better alert system
    }

    return (
        props.isPostLiked !== null &&
        <div className={classes.root}>
            <Typography className={classes.text} color='textSecondary'>{props.numberOfLikes}</Typography>
            <IconButton onClick={() => onButtonClick()} >
                {props.isPostLiked ?
                    <FavoriteIcon className={classes.likedIcon} />
                    : <FavoriteBorderIcon className={classes.unlikedIcon} />}
            </IconButton>
        </div>
    );
}

PostLike.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    text: {
        alignSelf: 'center',
    },
    unlikedIcon: {
        opacity: 0.3
    },
    likedIcon: {
        opacity: 0.8
    },
});

const mapDispatchToProps = {
    tryLikePost,
    tryUnlikePost
}

export default withStyles(styles)(
    connect(null, mapDispatchToProps)(PostLike)
)
