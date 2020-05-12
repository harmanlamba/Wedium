import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';
import { fetchPostDetails } from '../../redux/actions/thunk/post-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../header';
import PostDetailInfo from './post-detail-info';
import PostCommentBox from './post-comment-box';
// import RichTextBox from '../rich-text-box';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.postId,
      circularProgressRingState: true,
    };

    this.commentRef = React.createRef();
  }

  componentDidMount() {
    this.props.tryLogin();

    const postId = this.state.postId;
    this.props.fetchPostDetails(postId);
  }

  render() {
    const { classes } = this.props;
    const user = this.props.auth;

    const reduxPosts = this.props.reduxPosts;
    let postIndex = -1;

    if (reduxPosts.length > 0) {
      postIndex = reduxPosts.findIndex((p) => p.postId == this.state.postId);
    }

    // Scroll to comment on comment-button click
    const handleCommentButton = () => {
      this.commentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    return (
      <div>
        <Header user={user} />

        {this.props.isLoadingDetails === false ? (
          <Grid
            className={classes.grid}
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={7}>
              <PostDetailInfo
                post={reduxPosts[postIndex]}
                handleCommentButton={handleCommentButton}
              />
            </Grid>
            <Grid item xs={7} ref={this.commentRef}>
              {/* <RichTextBox placeholder={"Write comment..."} quotedText={"blahblah"} maxLength={500} onChange={(htmlText) => { console.log(htmlText)}} /> */}
              <PostCommentBox user={user} />
            </Grid>
          </Grid>
        ) : (
          <div className={classes.progressRing}>
            <CircularProgress />
          </div>
        )}
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
  progressRing: {
    marginLeft: '50%',
    paddingTop: '200px',
    paddingBottom: '10px',
    width: '100% !important',
  },
});

// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    reduxPosts: state.post.posts,
    isLoadingDetails: state.post.loadingPostDetails,
  };
};

const mapDispatchToProps = {
  tryLogin,
  fetchPostDetails,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(PostDetail))
);
