import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSinglePost } from '../../redux/actions/thunk/post-thunk';

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

    this.props.createSinglePost(postDto);
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

// Redux
const mapDispatchToProps = (dispatch) => {
  return {
    createSinglePost: (postDto) => dispatch(createSinglePost(postDto)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(PostForm));
