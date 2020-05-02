import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLikePost, tryUnlikePost } from '../../redux/actions/thunk/post-like-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/Button';
import LikedIcon from '@material-ui/icons/ThumbUp';
import UnlikedIcon from '@material-ui/icons/ThumbUpTwoTone';


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
            this.props.tryUnlikePost(this.props.postId);
        } else {
            this.props.tryLikePost(this.props.postId);
        }

        this.setState({
            isPostLiked: !isPostLiked
        })
    }

    render() {
        if (this.state.isPostLiked === null) {
            return (null);
        }

        return (
            <IconButton
                onClick={() => {this.onButtonClick()}}
            >
                {this.state.isPostLiked ? <LikedIcon />: <UnlikedIcon />}
            </IconButton>
        );
    }
}

const mapDispatchToProps = {
    tryLikePost,
    tryUnlikePost
}

export default connect(null, mapDispatchToProps)(PostLike);