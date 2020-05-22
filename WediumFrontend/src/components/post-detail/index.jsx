import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';
import { fetchPostDetails } from '../../redux/actions/thunk/post-thunk';

// Material UI
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../header';
import PostDetailInfo from './post-detail-info';
import PostCommentBox from './comment/post-comment-box';
import PostCommentFeed from './comment/post-comment-feed';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.postId,
      circularProgressRingState: true,
      highlightText: '',
      isHighlighted: false,
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

    const handleBackFeed = () => {
      this.props.history.push('/');
      window.location.reload();
    };

    const handleTextHighlight = (text) => {
      handleCommentButton();
      this.setState({ isHighlighted: true });
      this.setState({ highlightText: text });
    };

    const handleIsHighlighted = (boolean) => {
      this.setState({ isHighlighted: boolean });
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
            <Grid className={classes.postTitle} item xs={7}>
              <Button>
                <ArrowBackIosIcon />
                <Typography onClick={handleBackFeed} variant="h6">
                  Back
                </Typography>
              </Button>
            </Grid>

            <Grid item xs={7}>
              <PostDetailInfo
                handleTextHighlight={handleTextHighlight}
                post={reduxPosts[postIndex]}
                handleCommentButton={handleCommentButton}
              />
            </Grid>
            <Grid item xs={7} ref={this.commentRef}>
              <PostCommentBox
                user={user}
                highlightText={this.state.highlightText}
                isHighlighted={this.state.isHighlighted}
                handleIsHighlighted={handleIsHighlighted}
              />
            </Grid>
            <Grid item xs={7}>
              <PostCommentFeed user={user} />
            </Grid>
          </Grid>
        ) : (
          <div className={classes.progressRing}>
            <CircularProgress size={60} thickness={6} />
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
    marginTop: 20,
  },
  progressRing: {
    marginLeft: '50%',
    paddingTop: '200px',
    paddingBottom: '10px',
  },
  postTitle: {
    paddingTop: '0px !important',
    padingBottom: '0px !important',
    marginBottom: '-10px',
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
