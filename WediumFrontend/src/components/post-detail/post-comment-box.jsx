import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
          <Typography className={classes.commentTitle} variant="h6">
            Comments
          </Typography>
        </Grid>

        {this.props.user.isAuthenticated ? (
          <Grid item xs={12}>
            <Grid className={classes.grid} item xs={12}>
              <TextField
                id="commentField"
                className={classes.textField}
                onChange={this.handleCommentChange}
                autoComplete="off"
                variant="outlined"
                placeholder="Write your comment here..."
                multiline
                rows={2}
                rowsMax={20}
                fullWidth
                helperText={`${this.state.comment.length}/${COMMENT_CHAR_LIMIT}`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ChatBubbleOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: COMMENT_CHAR_LIMIT }}
              />
            </Grid>

            <Grid className={classes.grid} item xs={12} align="right">
              <Button variant="contained" color="primary" size="small">
                Submit
              </Button>
            </Grid>
          </Grid>
        ) : (
          <TextField
            autoComplete="off"
            variant="outlined"
            placeholder="Log in to write a comment..."
            rows={2}
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ChatBubbleOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
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
  commentTitle: {
    marginBottom: 5,
  },
});

export default withStyles(styles)(PostCommentBox);
