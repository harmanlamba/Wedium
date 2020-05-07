import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';
import { getPostDetail } from '../../apis/post';
import { postDetailDirectNavigation } from '../../redux/actions/post-actions'

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../header';
import PostDetailInfo from './post-detail-info';
import PostCommentBox from './post-comment-box';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    this.props.tryLogin();

    // Get postId from URL
    const postId = this.props.match.params.postId;
    getPostDetail(postId).then((post) => {
      this.setState({ post });
      if(this.props.reduxPosts.length === 0){
        this.props.postDetailDirectNavigation(post);
      }else{
        const postIndex = this.props.reduxPosts.findIndex(p => p.postId === post.postId);

        //Updating the post in the redux store with the article body
        this.props.reduxPosts[postIndex].articleBody = post.articleBody;
      }
    });
  }

  render() {
    const { classes } = this.props;

    const user = this.props.auth;

    return (
      <div>
        <Header user={user} />
        <Grid
          className={classes.grid}
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {this.props.reduxPosts && 
          <Grid item xs={8}>
            {this.state.post && <PostDetailInfo post={this.state.post} />}
          </Grid>
          } 

          <Grid item xs={8}>
            <PostCommentBox />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  grid: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
  },
  sidebar: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: 40,
  },
});

// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    reduxPosts: state.post.posts,
  };
};

const mapDispatchToProps = {
  tryLogin,
  postDetailDirectNavigation,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(PostDetail))
);
