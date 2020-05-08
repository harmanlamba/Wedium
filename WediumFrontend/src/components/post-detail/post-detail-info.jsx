import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import PostLike from '../post-like';
import PostFavourite from '../post-favourite';

const PostDetailInfo = (props) => {
  const post = props.post;
  const classes = useStyles();
  const postIndex = props.posts.findIndex((p) => p.postId === post.postId);
  const reduxPosts = props.posts;

  return (
    <div>
      <div className={classes.buttonGroup}>
        <PostLike
          className={classes.like}
          postId={reduxPosts[postIndex].postId}
          isPostLiked={reduxPosts[postIndex].isPostLiked}
          numberOfLikes={reduxPosts[postIndex].numberOfLikes}
        />
        <PostFavourite
          className={classes.favourite}
          postId={reduxPosts[postIndex].postId}
          isFavourited={reduxPosts[postIndex].isFavourited}
        />
      </div>
      <Card className={classes.cardRoot}>
        <Card className={classes.root} elevation={0}>
          <CardContent>
            <Typography variant="caption">
              <span className={classes.postType}>{post.postType}</span> -
              <Link
                className={classes.articleLink}
                href={post.articleUrl}
                target="_blank"
              >
                {post.articleTitle}
              </Link>
            </Typography>
            <Typography variant="h5">{post.title}</Typography>
            {post.description && (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="justify"
              >
                {post.description}
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

        <div className={classes.imageCard}>
          {post.articleImageUrl !== '' && (
            <CardMedia
              className={classes.image}
              component="img"
              src={post.articleImageUrl}
            />
          )}
        </div>

        <Card className={classes.article} elevation={0}>
          <div>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.articleTitle}
            >
              {post.articleTitle}
            </Typography>

            <Typography variant="subtitle2" color="textPrimary" align="justify">
              {post.articleBody}
            </Typography>
          </div>
        </Card>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    padding: '10px 30px 10px 30px',
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 0,
    paddingBottom: 0,
  },
  postType: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    padding: '1px 3px',
    borderRadius: 5,
    marginBottom: 5,
  },
  imageCard: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
  articleLink: {
    marginLeft: 8,
  },
  rightPanel: {
    display: 'flex',
  },
  buttonGroup: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  username: {
    marginTop: 20,
    marginRight: 15,
  },
  postDescription: {
    marginBottom: -5,
  },
  article: {
    padding: '0 60px 50px 60px',
    marginBottom: -5,
  },
  articleTitle: {
    textAlign: 'center',
  },
}));

//Redux
const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
  };
};

export default connect(mapStateToProps)(withRouter(PostDetailInfo));
