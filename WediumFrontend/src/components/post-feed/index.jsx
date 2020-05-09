import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadInitialPosts, loadMorePosts } from '../../redux/actions/thunk/post-thunk';

// Material UI
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostCard from './post-card';
import LoadingPostCard from './loading-post-card';
import InfiniteScroll from 'react-infinite-scroller';

class PostFeed extends Component {
  componentDidMount() {
    this.loadInitial();
  }

  componentDidUpdate(prevProps) {
    if (this.props.postType !== prevProps.postType || this.props.searchString !== prevProps.searchString) {
      this.loadInitial();
    }
  }

  loadInitial() {
    this.props.loadInitialPosts(this.props.postType, this.props.searchString);
  }

  getLastPost() {
    return this.props.posts.slice(-1)[0];
  }

  loadMore() {
    return this.props.loadMorePosts(this.getLastPost().postId, this.props.postType, this.props.searchString);
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
            threshold={400}
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
