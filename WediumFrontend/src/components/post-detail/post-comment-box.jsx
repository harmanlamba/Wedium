import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const COMMENT_CHAR_LIMIT = 500;

class PostCommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      sendLoading: false,
      alertDialogOpenState: false,
      alertDialogMessageTitle: 'Title',
      alertDialogMessageContent: 'Content',
    };
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { classes } = this.props;

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
          <TextField
            id="commentField"
            className={classes.textField}
            onChange={this.handleCommentChange}
            label="Leave a comment here..."
            autoComplete="off"
            variant="outlined"
            multiline
            rows={2}
            rowsMax={9}
            fullWidth
            helperText={`${this.state.comment.length}/${COMMENT_CHAR_LIMIT}`}
            inputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <ChatBubbleOutlineIcon />
                </InputAdornment>
              ),
              maxLength: COMMENT_CHAR_LIMIT,
            }}
          />
        </Grid>
        <Grid className={classes.grid} item xs={12} align="right">
          <Button variant="contained" color="primary">
            Comment
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: -5,
    borderRadius: 0,
    padding: '0 150px 50px 150px',
  },
  grid: {
    marginTop: '5px !important',
    padding: '0px !important',
  },
  textField: {
    '& p': {
      textAlign: 'right !important',
    },
  },
});

export default withStyles(styles)(PostCommentBox);
