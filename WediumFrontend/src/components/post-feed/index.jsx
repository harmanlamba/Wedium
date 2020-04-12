import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadInitialPosts, loadMorePosts } from '../../redux/actions/thunk/post-thunk';

// Components
import PostCard from './post-card';
import LoadingPostCard from './loading-post-card';
import InfiniteScroll from 'react-infinite-scroller';

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
            return (
                items.push(
                    <PostCard post={post} key={i} />
                ),
                hasMore = post.hasMore
            );
        });

        return (
            <div>
                {items.length > 0 &&
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore.bind(this)}
                        hasMore={hasMore}
                        loader={<LoadingPostCard key={0} />}
                        threshold={600}>

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
