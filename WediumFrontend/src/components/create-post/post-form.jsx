import React, { Component } from 'react';
import { createPost } from '../../apis/post';
import AlertDialog from '../create-post/alert-dialog';
import { withRouter } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostTypeButtons from './post-type-buttons';

const TITLE_CHAR_LIMIT = 100;
const DESCRIPTION_CHAR_LIMIT = 500;

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      wikipediaURL: '',
      description: '',
      postType: null,
      sendLoading: false,
      alertDialogOpenState: false,
      alertDialogMessageTitle: 'Title',
      alertDialogMessageContent: 'Content',
    };
  }

  handleFieldChange = (event) => {
    switch (event.target.id) {
      case 'titleField':
        this.setState({ title: event.target.value });
        break;
      case 'wikipediaURLField':
        this.setState({ wikipediaURL: event.target.value });
        break;
      case 'descriptionField':
        this.setState({ description: event.target.value });
        break;
      default:
    }
  };

  handleToggleButtonChange = (postTypeText) => {
    this.setState({ postType: postTypeText });
  };

  handleAlertDialogClose = () => {
    this.setState({ alertDialogOpenState: !this.state.alertDialogOpenState });
  };

  checkPostDto = (postDto) => {
    if (postDto.Title === '') {
      this.setState({
        alertDialogMessageTitle: 'Missing Title',
        alertDialogMessageContent: 'Please enter a title for your post!',
        alertDialogOpenState: true,
      });
      return false;
    } else if (postDto.ArticleUrl === '') {
      this.setState({
        alertDialogMessageTitle: 'Missing Wikipedia Url',
        alertDialogMessageContent:
          'Please ensure that you have entered a Wikipedia URL',
        alertDialogOpenState: true,
      });
      return false;
    } else if (postDto.PostType === null || postDto.PostType === '') {
      this.setState({
        alertDialogMessageTitle: 'Missing Post Type',
        alertDialogMessageContent:
          'Please ensure that you pick a post type that best suits your post!',
        alertDialogOpenState: true,
      });
      return false;
    } else {
      return true;
    }
  };

  handleSend = () => {
    // To get Wikipedia Title value
    let URLString = this.state.wikipediaURL.split('/');
    let titleResult = URLString[URLString.length - 1].replace(/_/g, ' ');

    const postDto = {
      ArticleTitle: titleResult,
      ArticleUrl: this.state.wikipediaURL,
      Title: this.state.title,
      Description: this.state.description,
      PostType: this.state.postType,
    };

    if (this.checkPostDto(postDto)) {
      this.setState({ sendLoading: true }); // Start loading
      createPost(postDto).then((response) => {
        if (response === 201) {
          this.setState({ sendLoading: false }); // Set loading stopped
          this.props.history.push('/');
        } else if (response === 404) {
          this.setState({
            alertDialogMessageTitle: 'Wikipedia Article Not Found',
            alertDialogMessageContent:
              'Please verify the Wikipedia Article URL and retry the operation',
            alertDialogOpenState: true,
            sendLoading: false, // Set loading stopped
          });
        }
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Grid
          className={classes.container}
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h6">Create Post</Typography>
            <AlertDialog
              title={this.state.alertDialogMessageTitle}
              content={this.state.alertDialogMessageContent}
              open={this.state.alertDialogOpenState}
              onCloseHandler={this.handleAlertDialogClose}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              id="titleField"
              label="Title"
              onChange={this.handleFieldChange}
              variant="outlined"
              fullWidth
              required
              helperText={`${this.state.title.length}/${TITLE_CHAR_LIMIT}`}
              inputProps={{
                maxLength: TITLE_CHAR_LIMIT,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="wikipediaURLField"
              label="Wikipedia URL"
              onChange={this.handleFieldChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="descriptionField"
              label="Description (optional)"
              onChange={this.handleFieldChange}
              variant="outlined"
              multiline
              rows={6}
              rowsMax={10}
              fullWidth
              helperText={`${this.state.description.length}/${DESCRIPTION_CHAR_LIMIT}`}
              inputProps={{
                maxLength: DESCRIPTION_CHAR_LIMIT,
              }}
              className={classes.textField}
            />
          </Grid>

          <Grid item xs={12}>
            <PostTypeButtons
              handleToggleButtonChange={this.handleToggleButtonChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={() => this.props.history.go(-1)}
              variant="outlined"
            >
              Cancel
            </Button>
          </Grid>

          <Grid
            item
            xs={6}
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSend}
              disabled={this.state.sendLoading}
            >
              {this.state.sendLoading && (
                <CircularProgress size={20} thickness={6} color="inherit" />
              )}
              {!this.state.sendLoading && 'Send'}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
  textField: {
    marginBottom: '-15px !important',
    '& p': {
      textAlign: 'right !important',
    },
  },
});

export default withRouter(withStyles(styles)(PostForm));
