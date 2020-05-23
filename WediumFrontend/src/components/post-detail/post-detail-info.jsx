import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import parse from 'html-react-parser';

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PostLike from '../post-like';
import PostFavourite from '../post-favourite';
import ArticleInfo from './article-info';
import CommentButton from './comment/comment-button';

const PostDetailInfo = (props) => {
  const post = props.post;
  const classes = useStyles();
  const postIndex = props.posts.findIndex((p) => p.postId === post.postId);
  const reduxPosts = props.posts;

  return (
    <div>
      <div className={classes.buttonGroup}>
        <div className={classes.buttonGroupFlex}>
          <PostLike
            postId={reduxPosts[postIndex].postId}
            isPostLiked={reduxPosts[postIndex].isPostLiked}
            numberOfLikes={reduxPosts[postIndex].numberOfLikes}
          />
          <PostFavourite
            postId={reduxPosts[postIndex].postId}
            isFavourited={reduxPosts[postIndex].isFavourited}
          />
          <CommentButton handleCommentButton={props.handleCommentButton} />
        </div>
      </div>

      <Card className={classes.postHeader}>
        <Card className={classes.root} elevation={0}>
          <CardContent>
            <Typography variant="subtitle2">
              <span className={classes.postType}>{post.postType}</span>
              <Link
                className={classes.articleLink}
                href={post.articleUrl}
                target="_blank"
              >
                {decodeURIComponent(post.articleTitle)}
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.postTitle}>
              {post.title}
            </Typography>
            {post.description && (
              <Typography
                className={classes.postDescription}
                variant="subtitle1"
                color="textSecondary"
                align="justify"
              >
                {parse(post.description)}
              </Typography>
            )}
            <Typography
              className={classes.username}
              variant="caption"
              color="textSecondary"
            >
              {post.username}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {moment(post.date).format('DD MMM')} -{' '}
              {moment(post.date).fromNow()}
            </Typography>
          </CardContent>
        </Card>

        <ArticleInfo
          handleTextHighlight={props.handleTextHighlight}
          post={post}
        />
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 0,
    paddingBottom: 0,
  },
  postHeader: {
    padding: '5px 30px 10px 30px',
  },
  postType: {
    backgroundColor: '#3b49df',
    color: '#fff',
    padding: '1px 5px',
    borderRadius: 5,
    marginBottom: 5,
  },
  articleLink: {
    marginLeft: 6,
  },
  rightPanel: {
    display: 'flex',
  },
  buttonGroup: {
    position: 'relative',
  },
  buttonGroupFlex: {
    display: 'flex',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 5,
  },
  username: {
    marginTop: 10,
    marginRight: 15,
  },
  postTitle: {
    marginTop: 4,
  },
  postDescription: {
    '& p': {
      marginTop: 5,
      marginBottom: 5,
      lineHeight: 1.5,
    },
  },
}));

//Redux
const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
  };
};

export default connect(mapStateToProps)(withRouter(PostDetailInfo));
