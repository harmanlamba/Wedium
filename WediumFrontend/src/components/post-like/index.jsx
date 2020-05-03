import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tryLikePost, tryUnlikePost } from '../../redux/actions/thunk/post-like-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/Button';
import LikedIcon from '@material-ui/icons/ThumbUp';
import UnlikedIcon from '@material-ui/icons/ThumbUpTwoTone';
import { red } from '@material-ui/core/colors';


class PostLike extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPostLiked: this.props.isPostLiked
        };
    }

    onButtonClick() {
        const isPostLiked = this.state.isPostLiked;

        if (isPostLiked) {
            this.props.tryUnlikePost(this.props.postId, this.unlikeErrorCallback.bind(null, this));
        } else {
            this.props.tryLikePost(this.props.postId, this.likeErrorCallback.bind(null, this));
        }

        // Changes icon display immediately so user thinks it worked (and does not reclick) while api request being processed
        this.setState({
            isPostLiked: !isPostLiked
        });
    }

    likeErrorCallback(thisObject) {
        // API request returns error so need to change state back
        thisObject.setState({
            isPostLiked: !thisObject.state.isPostLiked
        });

        alert("error liking post"); // TODO: implement some better alert system
    }

    unlikeErrorCallback(thisObject) {
        // API request returns error so need to change state back
        thisObject.setState({
            isPostLiked: !thisObject.state.isPostLiked
        });

        alert("error unliking post"); // TODO: implement some better alert system
    }

    render() {
        if (this.state.isPostLiked === null) {
            return (null);
        }

        const { classes } = this.props;

        return (
            <IconButton
                onClick={() => {this.onButtonClick()}}
                className={classes.button}
            >
                {this.state.isPostLiked ? <LikedIcon />: <UnlikedIcon className={classes.unlikedIcon} />}
            </IconButton>
        );
    }
}

PostLike.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const styles = (theme) => ({
    button: {
        width: 60,
        height: 60,
    },
    unlikedIcon: {
        opacity: 0.3
    }
});

const mapDispatchToProps = {
    tryLikePost,
    tryUnlikePost
}

export default withStyles(styles)(
    connect(null, mapDispatchToProps)(PostLike)
)