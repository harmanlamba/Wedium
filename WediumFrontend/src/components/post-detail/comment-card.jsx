import React, { useState } from 'react';
import moment from 'moment';
import parse, { domToReact } from 'html-react-parser';
import clsx from 'clsx';

// Material UI
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ChatBubbleOutlineIcon from '@material-ui/icons/InsertComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CommentCard = (props) => {
  const comment = props.comment;
  const { classes } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(props);

  return (
    <div>
      <CardContent className={classes.contentCard}>
        <Grid className={classes.header} item xs={12}>
          <Typography
            className={classes.username}
            variant="caption"
            color="textSecondary"
          >
            {comment.userId}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {moment(comment.date).format('DD MMM')} -{' '}
            {moment(comment.date).fromNow()}
          </Typography>
        </Grid>
        <Grid className={classes.content} item xs={12}>
          {parse(comment.body)}
        </Grid>
      </CardContent>

      <CardActions className={classes.actions} disableSpacing>
        <IconButton aria-label="Like button">
          <FavoriteIcon />
        </IconButton>
        {comment.parentCommentId === null ? (
          <IconButton aria-label="Comment button">
            <ChatBubbleOutlineIcon />
          </IconButton>
        ) : null}
        {comment.inverseParentComment.length !== 0 ? (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show comments"
          >
            <ExpandMoreIcon />
          </IconButton>
        ) : null}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {comment.parentCommentId === null
          ? comment.inverseParentComment.map((comment) => {
              return (
                <CommentCard
                  className={classes.childComment}
                  comment={comment}
                  key={comment.commentId}
                  classes={classes}
                />
              );
            })
          : null}
      </Collapse>
    </div>
  );
};

const styles = (theme) => ({
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
  contentCard: {
    paddingTop: '8px !important',
    paddingBottom: '0px !important',
  },
  replyBody: {
    overflowWrap: 'break-word',
    wordWrap: 'breakWord',
    hyphens: 'auto',
    '& p': {
      margin: '0px !important',
    },
  },
  content: {
    '& p': {
      margin: '0px !important',
    },
    '& blockquote': {
      borderLeft: '#3f51b5 solid 3px',
      paddingLeft: 10,
      margin: '5px 10px',
    },
  },
  username: {
    marginRight: 20,
  },
  actions: {
    padding: '0 8px !important',
  },
  childComment: {
    paddingLeft: 30,
  },
});

export default withStyles(styles)(CommentCard);
