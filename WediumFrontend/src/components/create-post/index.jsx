import React, { Component } from 'react';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Components
import PostForm from './post-form';
import PostGuide from './post-guide';

class CreatePost extends Component {
  render() {
    return (
      <div>
        <PostForm />
        <PostGuide />
      </div>
    );
  }
}

export default CreatePost;
