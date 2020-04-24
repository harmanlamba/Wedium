import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostTypes } from '../../redux/actions/thunk/post-type-thunk';

// Material UI
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function PostTypeButtons(props) {
  const [postType, setPostType] = React.useState('');

  const handlePostType = (event, newPostType) => {
    setPostType(newPostType);
  };

  useEffect(() => {
    props.loadPostTypes();
    console.log(props.postTypes);
  }, []);

  return (
    <ToggleButtonGroup
      size="medium"
      value={postType}
      exclusive
      onChange={handlePostType}
      aria-label="text alignment"
    >
      {props.PostTypes &&
        props.PostTypes.map((postTypes, i) => (
          <ToggleButton value={postTypes.postType} key={i}>
            {postTypes.postType}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    postTypes: state.postType.postTypes,
  };
};

const mapDispatchToProps = {
  loadPostTypes,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostTypeButtons)
);
