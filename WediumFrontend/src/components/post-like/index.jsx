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
    const [isLiked, setIsLiked] = useState(null);
    const [numberOfLikes, setNumberOfLikes] = useState(null);
    const { classes } = props;

    useEffect(() => {
        setIsLiked(props.isPostLiked);
        setNumberOfLikes(props.numberOfLikes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onButtonClick = () => {
        if (isLiked) {
            props.tryUnlikePost(props.postId, errorCallback);
            setNumberOfLikes(numberOfLikes - 1);
        } else {
            props.tryLikePost(props.postId, errorCallback);
            setNumberOfLikes(numberOfLikes + 1);
        }
        setIsLiked(!isLiked);
    }

    const errorCallback = () => {
        setIsLiked(isLiked);
        setNumberOfLikes(numberOfLikes);
        alert("error liking or unliking post"); // TODO: implement some better alert system
    }

    return (
        isLiked !== null &&
        <div className={classes.root}>
            <Typography className={classes.text} color='textSecondary'>{numberOfLikes}</Typography>
            <IconButton onClick={() => onButtonClick()} >
                {isLiked ?
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
