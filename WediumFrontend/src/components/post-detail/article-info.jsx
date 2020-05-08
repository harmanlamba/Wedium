import React from 'react';

// Material UI
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const ArticleInfo = (props) => {
  const post = props.post;
  const classes = useStyles();

  return (
    <div>
      <div className={classes.imageCard}>
        {post.articleImageUrl && (
          <CardMedia
            className={classes.image}
            component="img"
            src={post.articleImageUrl}
          />
        )}
      </div>

      <div className={classes.article}>
        <Typography
          className={classes.articleTitle}
          variant="h5"
          color="textPrimary"
        >
          {post.articleTitle}
        </Typography>
        <Typography
          className={classes.articleBody}
          variant="body2"
          color="textPrimary"
        >
          <div dangerouslySetInnerHTML={{ __html: post.articleBody }} />
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
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
  article: {
    padding: '0 60px 50px 40px',
    marginBottom: -5,
  },
  articleTitle: {
    textAlign: 'center',
  },
  articleBody: {
    borderLeft: '#3f51b5 solid 3px',
    paddingLeft: 20,
  },
}));

export default ArticleInfo;
