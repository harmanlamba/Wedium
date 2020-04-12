import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadInitialPosts, loadMorePosts } from '../../redux/actions/thunk/post-thunk';

// Components
import PostCard from './post-card';
import InfiniteScroll from 'react-infinite-scroller';

// Material UI
import LinearProgress from '@material-ui/core/LinearProgress';

class PostFeed extends Component {
    
    componentDidMount() {
        this.props.loadInitialPosts();
    }

    loadMore() {
        return this.props.loadMorePosts(this.props.posts.slice(-1)[0].postId);
    }

    render() {
        var items = [];
        var hasMore = true;
        this.props.posts.map((post, i) => {
            items.push(
                <PostCard post={post} key={i} />
            );
            hasMore = post.hasMore;
        });

        return(
            <div>
                {items.length > 0 &&
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore.bind(this)}
                        hasMore={hasMore}
                        loader={<LinearProgress key={0}/>}>

                        {items}
                    </InfiniteScroll>
                }
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
    loadInitialPosts,
    loadMorePosts
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostFeed)
);
