import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostTypes } from '../../redux/actions/thunk/post-type-thunk';

// Material UI
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core/styles';

function PostTypeButtons(props) {
  const { classes } = props;
  const [postType, setPostType] = useState('');

  const handlePostType = (event, newPostType) => {
    setPostType(newPostType);

    props.handleToggleButtonChange(newPostType);
  };

  useEffect(() => {
    props.loadPostTypes();
  }, []);

  return (
    <ToggleButtonGroup
      size="medium"
      value={postType}
      exclusive
      onChange={handlePostType}
      aria-label="text alignment"
      required
      className={classes.root}
    >
      {props.postTypes &&
        props.postTypes.map((postTypes) => (
          <ToggleButton
            id="postTypeField"
            value={postTypes.postType}
            key={postTypes.postType}
            className={classes.childButton}
          >
            {postTypes.postType}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
}

const styles = (theme) => ({
  root: {
    flexWrap: 'wrap',
  },
  childButton: {
    margin: '0 5px 5px 0',
    border: '1px solid #c4c4c4 !important',
    borderRadius: '50px !important',
    '&$selected': {
      backgroundColor: 'green !important',
    },
  },
});

// Redux
const mapStateToProps = (state) => {
  return {
    postTypes: state.postType.postTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPostTypes: () => dispatch(loadPostTypes()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PostTypeButtons))
);
