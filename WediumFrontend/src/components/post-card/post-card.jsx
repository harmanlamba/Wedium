import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { loadPosts } from '../../redux/actions/thunk/post-thunk';

class PostCard extends Component {
    
    componentDidMount() {
        console.log("didMount");
        this.props.loadPosts();
    }

    loadItems(page) {
        this.props.loadPosts(this.props.posts.slice(-1)[0].postId);
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
        if (items.length) {
            return(
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadItems.bind(this)}
                    hasMore={hasMore}
                    loader={loader}>

                    <div key="pp">
                        {items}
                    </div>
                </InfiniteScroll>
            );
        } else {
            return(
                <div>
                    waiting
                </div>
            );
        }
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
