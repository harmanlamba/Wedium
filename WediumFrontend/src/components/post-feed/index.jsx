import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadInitialPosts, loadMorePosts } from '../../redux/actions/thunk/post-thunk';
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostCard from './post-card';
import LoadingPostCard from './loading-post-card';
import InfiniteScroll from 'react-infinite-scroller';

class PostFeed extends Component {
  componentDidMount() {
    if (!this.props.posts.length || this.props.postType !== this.props.previousPostType
      || this.props.searchString !== this.props.previousSearchString
      || this.props.getFavouritesOnly !== this.props.previousGetFavouritesOnly
      || this.props.getPostLikesOnly !== this.props.previousGetPostLikesOnly) {

      this.loadInitial();
    }
  }

  componentDidUpdate() {
    if (this.props.postType !== this.props.previousPostType
      || this.props.searchString !== this.props.previousSearchString
      || this.props.getFavouritesOnly !== this.props.previousGetFavouritesOnly
      || this.props.getPostLikesOnly !== this.props.previousGetPostLikesOnly) {

        if (this.state && this.state.cancelToken) {
          this.state.cancelToken.cancel();
        }
        
        this.loadInitial();
    }
  }

  loadInitial() {
    const cancelToken = axios.CancelToken.source();
    
    this.setState({
      cancelToken,
    });

    this.props.loadInitialPosts(cancelToken.token, this.props.postType, this.props.searchString, this.props.getFavouritesOnly, this.props.getPostLikesOnly);
  }

  componentWillUnmount() {
    if (this.state && this.state.cancelToken) {
      this.state.cancelToken.cancel();
    }
  }

  getLastPost() {
    return this.props.posts.slice(-1)[0];
  }

  loadMore() {
    return this.props.loadMorePosts(this.state.cancelToken.token, this.getLastPost().postId, this.props.postType, this.props.searchString, this.props.getFavouritesOnly, this.props.getPostLikesOnly);
  }

  hasMore() {
    return this.getLastPost().hasMore;
  }

  render() {
    const classes = this.props.classes;

    const items = [];
    this.props.posts.map((post, i) => {
      return items.push(<PostCard post={post} key={i} />);
    });

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
              threshold={1000}
            >
              {items}
            </InfiniteScroll>
          ) ||
          (<Container className={classes.notFound}>
            No Posts Found <span role="img" aria-label="sad cat">😿</span>
          </Container>)}
      </div>
    );
  }
}

const styles = (theme) => ({
  notFound: {
    textAlign: 'center',
    color: '#bbbbbb',
    fontSize: '1.4em',
    margin: '80px 0'
  }
});

// Redux
const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
    postsLoading: state.post.initialPostsLoading,
    previousPostType: state.post.postTypeFilter,
    previousSearchString: state.post.searchStringFilter,
    previousGetFavouritesOnly: state.post.getFavouritesOnly,
    previousGetPostLikesOnly: state.post.getPostLikesOnly,
  };
};

const mapDispatchToProps = {
  loadInitialPosts,
  loadMorePosts,
};

export default withRouter(
  withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(PostFeed)
  )
);
