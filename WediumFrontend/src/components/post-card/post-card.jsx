import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { loadInitialPosts, loadMorePosts } from '../../redux/actions/thunk/post-thunk';

class PostCard extends Component {
    
    componentDidMount() {
        this.props.loadInitialPosts();
    }

    loadMore() {
        return this.props.loadMorePosts(this.props.posts.slice(-1)[0].postId);
    }

    render() {
        const loader = <div className="loader" key="loader">Loading ...</div>;

        var items = [];
        var hasMore = true;
        this.props.posts.map((post, i) => {
            items.push(
                <div key={i}>
                    {post.postId}
                    {post.title}
                    <br />
                    <br />
                </div>
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
                        loader={loader}>

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
    connect(mapStateToProps, mapDispatchToProps)(PostCard)
);
