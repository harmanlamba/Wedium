import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tryLikePost, tryUnlikePost } from '../../redux/actions/thunk/post-like-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@material-ui/core';

class PostLike extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPostLiked: this.props.isPostLiked,
            numberOfLikes: this.props.numberOfLikes
        };
    }

    onButtonClick() {
        const isPostLiked = this.state.isPostLiked;

        if (isPostLiked) {
            this.props.tryUnlikePost(this.props.postId, this.unlikeErrorCallback.bind(null, this));
            this.setState({
                numberOfLikes: this.state.numberOfLikes - 1,
            });
        } else {
            this.props.tryLikePost(this.props.postId, this.likeErrorCallback.bind(null, this));
            this.setState({
                numberOfLikes: this.state.numberOfLikes + 1,
            });
        }

        // Changes icon display immediately so user thinks it worked (and does not reclick) while api request being processed
        this.setState({
            isPostLiked: !isPostLiked
        });
    }

    likeErrorCallback(thisObject) {
        // API request returns error so need to change state back
        thisObject.setState({
            isPostLiked: !thisObject.state.isPostLiked,
            numberOfLikes: thisObject.state.numberOfLikes - 1,
        });

        alert("error liking post"); // TODO: implement some better alert system
    }

    unlikeErrorCallback(thisObject) {
        // API request returns error so need to change state back
        thisObject.setState({
            isPostLiked: !thisObject.state.isPostLiked,
            numberOfLikes: thisObject.state.numberOfLikes + 1,
        });

        alert("error unliking post"); // TODO: implement some better alert system
    }

    render() {
        if (this.state.isPostLiked === null) {
            return (null);
        }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography className={classes.text} color='textSecondary'>{this.state.numberOfLikes}</Typography>
                <IconButton onClick={() => { this.onButtonClick() }} >
                    {this.state.isPostLiked ?
                        <FavoriteIcon className={classes.likedIcon} />
                        : <FavoriteBorderIcon className={classes.unlikedIcon} />}
                </IconButton>
            </div>
        );
    }
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
