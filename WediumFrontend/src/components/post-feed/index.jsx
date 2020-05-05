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
    this.loadInitial();
  }

  componentDidUpdate(prevProps) {
    if (this.props.postType !== prevProps.postType) {
      this.loadInitial();
    }
  }

  loadInitial() {
    this.props.loadInitialPosts(this.props.postType);
  }

  getLastPost() {
    return this.props.posts.slice(-1)[0];
  }

  loadMore() {
    return this.props.loadMorePosts(this.getLastPost().postId, this.props.postType);
  }

  hasMore() {
    return this.getLastPost().hasMore;
  }

  render() {
    var items = [];
    if (this.props.posts.length > 0) {
      this.props.posts.map((post, i) => {
        return items.push(<PostCard post={post} key={i} />);
      });
    }

    return (
      <div>
        {(this.props.postsLoading &&
          <LoadingPostCard />
        ) || 
        (items.length > 0 && 
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore.bind(this)}
            hasMore={this.hasMore()}
            loader={<LoadingPostCard key={0} />}
            threshold={400}
          >
            {items}
          </InfiniteScroll>
        ) ||
        ("No Posts")}
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
    postsLoading: state.post.initialPostsLoading,
  };
};

const mapDispatchToProps = {
  loadInitialPosts,
  loadMorePosts,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostFeed)
);
