import React from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/InsertComment';
import { withStyles } from '@material-ui/core/styles';

const CommentButton = (props) => {
  const { classes } = props;

  return (
    <div>
      <IconButton onClick={props.handleCommentButton} aria-label="comment">
        <ChatBubbleOutlineIcon
          fontSize="small"
          className={classes.commentIcon}
        />
      </IconButton>
    </div>
  );
};

const styles = (theme) => ({
  commentIcon: {
    marginLeft: 2,
    marginTop: 2,
    opacity: 0.8,
  },
});

export default withStyles(styles)(CommentButton);
