import React, { useState, useEffect } from 'react';
import CommentCard from './comment-card';
import { commentGetRequest } from '../../apis/comment';
import { withRouter } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const PostCommentFeed = (props) => {
  const { classes } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    let postId = parseInt(props.match.params.postId);
    commentGetRequest(postId).then((response) => {
      setComments(response);
    });
  }, []);

  return (
    <Grid
      className={classes.root}
      container
      spacing={3}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid className={classes.grid} item xs={12}>
        {comments != []
          ? comments.map((value, key) => {
              return <CommentCard value={value} key={key} />;
            })
          : null}
      </Grid>
    </Grid>
  );
};

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: -5,
    borderRadius: 0,
    padding: '0 160px 50px 160px',
  },
  grid: {
    marginTop: '5px !important',
    padding: '0px !important',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentCard: {
    marginTop: 10,
  },
  contentCard: {
    paddingBottom: '0px !important',
  },
});

export default withStyles(styles)(withRouter(PostCommentFeed));
