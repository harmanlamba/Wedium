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
  const postIndex = props.posts.findIndex(p => p.postId === post.postId);
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
            <Typography variant="subtitle1">
              {post.postType} -
              <Link
                className={classes.articleLink}
                href={post.articleUrl}
                target="_blank"
              >
                {post.articleTitle}
              </Link>
            </Typography>

            <Typography variant="h6">{post.title}</Typography>
            <br />

            <Link
              className={classes.username}
              variant="subtitle2"
              color="textSecondary"
            >
              {post.username}
            </Link>

            <Typography variant="subtitle2" color="textSecondary">
              {moment(post.date).format('DD MMM')} -{' '}
              {moment(post.date).fromNow()}
            </Typography>
          </CardContent>

          <div className={classes.rightPanel}>
            {post.articleImageUrl !== '' && (
              <CardMedia
                className={classes.image}
                component="img"
                src={post.articleImageUrl}
              />
            )}
          </div>
        </Card>

        {post.description && (
          <Card className={classes.postDescription} elevation={0}>
            <div>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="justify"
              >
                {post.description}
              </Typography>
            </div>
          </Card>
        )}

        <Card className={classes.article} elevation={0}>
          <div>
            <Typography className={classes.separator}> . . . </Typography>

            <Typography variant="h6" color="textPrimary">
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
    marginBottom: -5,
    borderRadius: 0,
  },
  image: {
    width: 140,
    height: 128,
    marginTop: 16,
    marginRight: 16,
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
    marginLeft: '10px',
  },
  username: {
    marginTop: '-20px',
  },
  postDescription: {
    padding: 15,
    marginBottom: -5,
  },
  article: {
    padding: '0 60px 30px 60px',
    marginBottom: -5,
  },
  separator: {
    margin: '10px 0 10px 0',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
}));

//Redux
const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
  };
};

export default connect(mapStateToProps)(withRouter(PostDetailInfo));
