import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import PostLike from '../post-like';
import PostFavourite from '../post-favourite';

const PostCard = (props) => {
  const post = props.post;
  const classes = useStyles();

  // Redirect to post-detail page
  const handleClickPostDetail = () => {
    const postType = post.postType;
    const postId = post.postId;
    const postTitle = post.title;

    props.history.push({
      pathname: `/post/${postType}/${postId}/${postTitle}`,
    });
  };

  // Opens post-detail page in new tab on middle mouse button click. Not handled by default by react
  const mouseDownEvent = (e) => {
    if (e.button === 1) {
      const postType = post.postType;
      const postId = post.postId;
      const postTitle = post.title;

      window.open(`/post/${postType}/${postId}/${postTitle}`, '_blank');
      window.focus();
    }
  };

  return (
    <Card
      className={classes.root}
      onClick={() => handleClickPostDetail()}
      onMouseDown={(e) => mouseDownEvent(e)}
    >
      <div>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle2">
            <span className={classes.postType}>{post.postType}</span>
            <Link
              className={classes.articleLink}
              href={post.articleUrl}
              target="_blank"
              onClick={(event) => event.stopPropagation()}
            >
              {decodeURIComponent(post.articleTitle)}
            </Link>
          </Typography>
          <Typography className={post.title.length > 40 ? classes.longPostTitle : classes.postTitle} variant="h6">
            {post.title}
          </Typography>
          <Link variant="subtitle2" color="textSecondary">
            {post.username}
          </Link>{' '}
          <Typography variant="subtitle2" color="textSecondary">
            {moment(post.date).format('DD MMM')} - {moment(post.date).fromNow()}
          </Typography>
        </CardContent>
      </div>

      <div className={classes.rightPanel}>
        <div
          className={classes.buttonGroup}
          onClick={(event) => event.stopPropagation()}
        >
          <PostLike
            postId={post.postId}
            isPostLiked={post.isPostLiked}
            numberOfLikes={post.numberOfLikes}
          />
          <PostFavourite
            postId={post.postId}
            isFavourited={post.isFavourited}
          />
        </div>

        {post.articleImageUrl !== '' && (
          <CardMedia
            className={classes.image}
            component="img"
            src={post.articleImageUrl}
          />
        )}
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 5,
    cursor: 'pointer',
  },
  cardContent: {
    paddingBottom: '12px !important',
  },
  postType: {
    backgroundColor: '#3b49df',
    color: '#fff',
    padding: '1px 4px',
    borderRadius: 5,
  },
  postTitle: {
    marginBottom: 26,
    width: '120%',
  },
  longPostTitle: {
    marginBottom: 8,
    width: '120%',
  },
  image: {
    width: 150,
    height: 132,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    borderRadius: 5,
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
    marginRight: 12,
    marginBottom: 7,
  },
}));

// Redux
const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
  };
};

export default connect(mapStateToProps)(withRouter(PostCard));
