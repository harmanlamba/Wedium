import React, { useState, Fragment } from 'react';
import HighlightPop from 'react-highlight-pop';
import parse from 'html-react-parser';

// Material UI
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SubjectIcon from '@material-ui/icons/Subject';
import { makeStyles } from '@material-ui/core/styles';

const MISSING_IMAGE_URL = 'https://image.flaticon.com/icons/svg/570/570975.svg';

const ArticleInfo = (props) => {
  const post = props.post;
  const classes = useStyles();

  const [showingAll, setShowingAll] = useState(false);

  var articleBody = null;
  if (post.articleBody) {
    if (showingAll) {
      articleBody =
        post.articleBody.indexOf(
          '<h2><span id="References">References</span></h2>'
        ) !== -1
          ? post.articleBody.substr(
              0,
              post.articleBody.indexOf(
                '<h2><span id="References">References</span></h2>'
              )
            )
          : post.articleBody;
    } else {
      if (post.articleBody.indexOf('<h2>') === -1) {
        setShowingAll(true);
      } else {
        articleBody = post.articleBody.substr(
          0,
          post.articleBody.indexOf('<h2>')
        );
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
        {
          <HighlightPop
            popoverItems={(itemClass) => (
              <Fragment>
                <span
                  className={itemClass}
                  onClick={() => {
                    props.handleTextHighlight(window.getSelection().toString());
                  }}
                >
                  <RateReviewIcon />
                </span>
              </Fragment>
            )}
          >
            <div className={classes.articleBody}>{parse(articleBody)}</div>
          </HighlightPop>
        }
        {!showingAll && (
          <div className={classes.showAllButton}>
            <span
              className={classes.showAllTag}
              onClick={() => {
                setShowingAll(true);
              }}
            >
              <SubjectIcon className={classes.tagIcon} fontSize="small" />
              Read More
            </span>
          </div>
        )}
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
    padding: '0 60px 30px 40px',
    marginBottom: -5,
  },
  articleTitle: {
    textAlign: 'center',
    marginLeft: 20,
  },
  articleBody: {
    borderLeft: '#3f51b5 solid 3px',
    paddingLeft: 20,
    '& blockquote': {
      borderLeft: '#919191 solid 3px',
      paddingLeft: 10,
    },
  },
  showAllButton: {
    textAlign: 'center',
  },
  showAllTag: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontSize: '0.85em',
    padding: '1px 5px 3px 5px',
    borderRadius: 5,
    marginBottom: 5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  tagIcon: {
    marginBottom: -5,
    marginRight: 3,
  },
}));

export default ArticleInfo;
