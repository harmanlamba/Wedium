import React, { Component } from 'react';
import  { createPost }  from '../../apis/post';
import  AlertDialog  from '../create-post/alert-dialog'

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostTypeButtons from './post-type-buttons';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      wikipediaURL: '',
      description: '',
      postType: null,
      AlertDialogOpenState: false,
      AlertDialogMessageTitle: 'Title',
      AlertDialogMessageContent: 'Content'
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
    this.setState({AlertDialogOpenState: !this.state.AlertDialogOpenState})
  }



  checkPostDto = (postDto) => {
    if(postDto.Title === "" ){
      this.setState({
        AlertDialogMessageTitle: 'Missing Title',
        AlertDialogMessageContent: 'Please enter a title for your post!',
        AlertDialogOpenState: true
      })
      return false;
    }else if (postDto.ArticleUrl === ""  ){
      this.setState({
        AlertDialogMessageTitle: 'Missing Wikipedia Url',
        AlertDialogMessageContent: 'Please ensure that you have entered a Wikipedia URL',
        AlertDialogOpenState: true
      })
      return false;
    }else if(postDto.PostType === null || postDto.PostType === ""){
      this.setState({
        AlertDialogMessageTitle: 'Missing Post Type',
        AlertDialogMessageContent: 'Please ensure that you pick a post type that best suits your post!',
        AlertDialogOpenState: true
      })
      return false;
    }else{
      return true;
    }
  }

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

    if(this.checkPostDto(postDto)){
        createPost(postDto)
        .then(response => {
          if(response === 201){
            this.setState({
              AlertDialogMessageTitle: 'Post Created',
              AlertDialogMessageContent: 'The post was created successfully!!',
              AlertDialogOpenState: true
            })
          }else if(response === 404){
            this.setState({
              AlertDialogMessageTitle: 'Wikipedia Article Not Found',
              AlertDialogMessageContent: 'Please verify the Wikipedia Article URL and retry the operation',
              AlertDialogOpenState: true
            })
          }
        
        })
    }
  };

  render() {
    return (
      <div>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h5">Create Post</Typography>
            <AlertDialog title = {this.state.AlertDialogMessageTitle} content = {this.state.AlertDialogMessageContent} open = {this.state.AlertDialogOpenState} onCloseHandler={this.handleAlertDialogClose} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="titleField"
              label="Title"
              onChange={this.handleFieldChange}
              variant="outlined"
              fullWidth
              required
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
              rows={8}
              rowsMax={20}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <PostTypeButtons
              handleToggleButtonChange={this.handleToggleButtonChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Button variant="outlined">Cancel</Button>
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
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default (PostForm);
