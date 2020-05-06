import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tryLikePost, tryUnlikePost } from '../../redux/actions/thunk/post-like-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
            <IconButton onClick={() => {this.onButtonClick()}} >
                {this.state.isPostLiked ? 
                <FavoriteIcon className={classes.likedIcon} />
                : <FavoriteBorderIcon className={classes.unlikedIcon} />}
            </IconButton>
        );
    }
}

PostLike.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const styles = (theme) => ({
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
