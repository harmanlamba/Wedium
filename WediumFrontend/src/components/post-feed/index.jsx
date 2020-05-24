import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadInitialPosts,
  loadMorePosts,
} from '../../redux/actions/thunk/post-thunk';
import axios from 'axios';

// Material UI
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostCard from './post-card';
import LoadingPostCard from './loading-post-card';
import InfiniteScroll from 'react-infinite-scroller';
import Typography from '@material-ui/core/Typography';

class PostFeed extends Component {
  componentDidMount() {
    // Only load posts if filter props did not change or no posts currently loaded
    if (
      !this.props.posts.length ||
      this.props.postType !== this.props.previousPostType ||
      this.props.searchString !== this.props.previousSearchString ||
      this.props.profileFilter !== this.props.previousProfileFilter
    ) {
      this.loadInitial();
    }
  }

  componentDidUpdate() {
    // Only load posts if filter props did not change
    if (
      this.props.postType !== this.props.previousPostType ||
      this.props.searchString !== this.props.previousSearchString ||
      this.props.profileFilter !== this.props.previousProfileFilter
    ) {
      // Cancels any in-air requests if filter props change.
      if (this && this.state && this.state.cancelToken) {
        this.state.cancelToken.cancel();
      }

      this.loadInitial();
    }
  }

  loadInitial() {
    // Creates cancel token to cancel in-air requests if filter props change
    const cancelToken = axios.CancelToken.source();

    this.setState({
      cancelToken,
    });

    this.props.loadInitialPosts(
      cancelToken.token,
      this.props.postType,
      this.props.searchString,
      this.props.profileFilter
    );
  }

  componentWillUnmount() {
    // Cancels any in-air requests so they do not interfere with posts redux state when retrieved
    if (this && this.state && this.state.cancelToken) {
      this.state.cancelToken.cancel();
    }
  }

  getLastPost() {
    return this.props.posts.slice(-1)[0];
  }

  loadMore() {
    let cancelToken = null;

    if (this && this.state && this.state.cancelToken) {
      cancelToken = this.state.cancelToken;
    } else {
      cancelToken = axios.CancelToken.source();

      this.setState({
        cancelToken,
      });
    }

    return this.props.loadMorePosts(
      cancelToken.token,
      this.getLastPost().postId,
      this.props.postType,
      this.props.searchString,
      this.props.profileFilter
    );
  }

  hasMore() {
    return this.getLastPost().hasMore;
  }

  render() {
    const classes = this.props.classes;

    // Creates list of PostCard items to display in infinite scroll component 
    const items = [];
    this.props.posts.map((post, i) => {
      return items.push(<PostCard post={post} key={i} />);
    });

    return (
      <div>
        {(this.props.postsLoading && <LoadingPostCard />) ||
          (items.length > 0 && (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMore.bind(this)}
              hasMore={this.hasMore()}
              loader={<LoadingPostCard key={0} />}
              threshold={1000}
            >
              {items}
            </InfiniteScroll>
          )) || (
            <Container className={classes.notFound}>
              <Typography variant="button">
                No Posts Found{' '}
                <span role="img" aria-label="sad cat">
                  😿
                </span>
              </Typography>
            </Container>
          )}
      </div>
    );
  }
}

const styles = (theme) => ({
  notFound: {
    textAlign: 'center',
    color: '#bbbbbb',
    fontSize: '1.4em',
    margin: '80px 0',
  },
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
    previousGetCreatedOnly: state.post.getCreatedOnly,
    previousProfileFilter: state.post.profileFilter,
  };
};

const mapDispatchToProps = {
  loadInitialPosts,
  loadMorePosts,
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostFeed))
);
