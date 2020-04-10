import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPosts } from '../../redux/actions/thunk/post-thunk';

class PostCard extends Component {
    
    componentDidMount() {
        this.props.loadPosts(70);
        this.props.loadPosts(75);
    }

    render() {
        console.log(this.props.posts);
        return(
            <div>
            </div>
        );
    }
}

// Redux
const mapStateToProps = (state) => {
    return {
        posts: state.post.posts,
    };
};

const mapDispatchToProps = {
    loadPosts
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostCard)
);
