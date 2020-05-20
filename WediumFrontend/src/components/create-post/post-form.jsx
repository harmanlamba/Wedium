import React, { useState } from 'react';
import { createPost } from '../../apis/post';
import AlertDialog from '../create-post/alert-dialog';
import { withRouter, useHistory } from 'react-router-dom';
import RichTextBox from '../rich-text-box/index';

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
const DESCRIPTION_CHAR_LIMIT = 450;

const PostForm = (props) => {
  const { classes } = props;
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [wikipediaURL, setWikipediaURL] = useState('');
  const [description, setDescription] = useState('');
  const [postType, setPostType] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);
  const [alertDialogOpenState, setAlertDialogOpenState] = useState(false);
  const [alertDialogMessageTitle, setAlertDialogMessageTitle] = useState(
    'Title'
  );
  const [alertDialogMessageContent, setAlertDialogMessageContent] = useState(
    'Content'
  );

  const handleFieldChange = (event) => {
    switch (event.target.id) {
      case 'titleField':
        setTitle(event.target.value);
        break;
      case 'wikipediaURLField':
        setWikipediaURL(event.target.value);
        break;
      default:
    }
  };

  const checkPrefix = (string) => {
    if (string.indexOf('https://en.wikipedia.org/wiki/') === 0) {
      return true;
    }
    return false;
  };

  const handleToggleButtonChange = (postTypeText) => {
    setPostType(postTypeText);
  };

  const handleAlertDialogClose = () => {
    setAlertDialogOpenState(!alertDialogOpenState);
  };

  const checkPostDto = (postDto) => {
    if (postDto.Title === '') {
      setAlertDialogMessageContent('Please enter a title for your post!');
      setAlertDialogOpenState(true);
      return false;
    } else if (postDto.ArticleUrl === '') {
      setAlertDialogMessageContent(
        'Please ensure that you have entered a Wikipedia URL'
      );
      setAlertDialogOpenState(true);
      return false;
    } else if (!checkPrefix(postDto.ArticleUrl)) {
      setAlertDialogMessageContent(
        'Please ensure that you have entered a valid and complete Wikipedia URL'
      );
      setAlertDialogOpenState(true);
      return false;
    } else if (postDto.PostType === null || postDto.PostType === '') {
      setAlertDialogMessageContent(
        'Please ensure that you pick a post type that best suits your post!'
      );
      setAlertDialogOpenState(true);
      return false;
    } else {
      return true;
    }
  };

  const handleSend = () => {
    // To get Wikipedia Title value
    let URLString = wikipediaURL.split('/');
    let titleResult = URLString[URLString.length - 1].replace(/_/g, ' ');

    const postDto = {
      ArticleTitle: titleResult,
      ArticleUrl: wikipediaURL,
      Title: title,
      Description: description,
      PostType: postType,
    };

    if (checkPostDto(postDto)) {
      setSendLoading(true); // Start loading
      createPost(postDto).then(({ status, UriLocation }) => {
        if (status === 201) {
          setSendLoading(false); // Set loading stopped
          history.push(UriLocation);
        } else if (status === 404) {
          setAlertDialogMessageTitle('Wikipedia Article Not Found');
          setAlertDialogMessageContent(
            'Please verify the Wikipedia Article URL and retry the operation'
          );
          setAlertDialogOpenState(true);
          setSendLoading(false); // Set loading stopped
        }
      });
    }
  };

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
            title={alertDialogMessageTitle}
            content={alertDialogMessageContent}
            open={alertDialogOpenState}
            onCloseHandler={handleAlertDialogClose}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            onChange={handleFieldChange}
            id="titleField"
            label="Title"
            autoComplete="off"
            autoFocus
            variant="outlined"
            fullWidth
            required
            helperText={`${title.length}/${TITLE_CHAR_LIMIT}`}
            inputProps={{
              maxLength: TITLE_CHAR_LIMIT,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="wikipediaURLField"
            onChange={handleFieldChange}
            label="Wikipedia URL"
            autoComplete="off"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <RichTextBox
            onChange={setDescription}
            placeholder="Write a description about the article..."
            maxLength={DESCRIPTION_CHAR_LIMIT}
          />
        </Grid>

        <Grid item xs={12}>
          <PostTypeButtons
            handleToggleButtonChange={handleToggleButtonChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Button onClick={() => history.go(-1)} variant="outlined">
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
            onClick={handleSend}
            disabled={sendLoading}
            variant="contained"
            color="primary"
          >
            {sendLoading && (
              <CircularProgress size={20} thickness={6} color="inherit" />
            )}
            {!sendLoading && 'Send'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

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
