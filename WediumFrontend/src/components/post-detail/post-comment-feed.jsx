import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadComments } from '../../redux/actions/thunk/comment-thunk';
import CommentCard from './comment-card';

// Material UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const PostCommentFeed = (props) => {
  const { classes } = props;

  useEffect(() => {
    let postId = parseInt(props.match.params.postId);
    props.loadComments(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {props.comments != []
          ? props.comments.map((comment) => {
              return (
                <Card
                  className={classes.commentCard}
                  key={comment.commentId}
                  square={true}
                >
                  <CommentCard comment={comment} />
                </Card>
              );
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
    padding: '0 110px 50px 110px',
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
    marginBottom: 15,
    borderRadius: 4,
  },
});

// Redux
const mapStateToProps = (state) => {
  return {
    comments: state.comment.comments,
  };
};

const mapDispatchToProps = {
  loadComments,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PostCommentFeed))
);
