import React, { useState } from 'react';

// Material UI
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const MISSING_IMAGE_URL = 'https://image.flaticon.com/icons/svg/570/570975.svg';

const ArticleInfo = (props) => {
  const post = props.post;
  const classes = useStyles();

  const [showingAll, setShowingAll] = useState(false);

  var articleBody = null;
  if (post.articleBody) {
    if (showingAll) {
      articleBody = post.articleBody.indexOf('<h2><span id="References">References</span></h2>') !== -1 ? 
        post.articleBody.substr(0, post.articleBody.indexOf('<h2><span id="References">References</span></h2>')) : post.articleBody;
    } else {
      if (post.articleBody.indexOf('<h2>') === -1) {
        setShowingAll(true);
      } else {
        articleBody = post.articleBody.substr(0, post.articleBody.indexOf("<h2>"));
      }
    }
  }

  return (
    <div>
      {post.articleImageUrl !== MISSING_IMAGE_URL ? (
        <div className={classes.imageCard}>
          <CardMedia
            className={classes.image}
            component="img"
            src={post.articleImageUrl}
          />
        </div>
      ) : null}

      <div className={classes.article}>
        <Typography
          className={classes.articleTitle}
          variant="h5"
          color="textPrimary"
        >
          {post.articleTitle}
        </Typography>
          {<div dangerouslySetInnerHTML={{ __html: articleBody }} className={classes.articleBody} />}
          {!showingAll && <Typography
              className={classes.showAllButton}
              variant="caption"
              color="textSecondary"
            ><div onClick={() => {setShowingAll(true) }}>-  Read More -</div></Typography>}
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
    marginLeft: 20,
  },
  articleBody: {
    borderLeft: '#3f51b5 solid 3px',
    paddingLeft: 20,
  },
  showAllButton: {
    textAlign: 'center',
    cursor: 'pointer',
  }
}));

export default ArticleInfo;
