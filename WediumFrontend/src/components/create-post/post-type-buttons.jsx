import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostTypes } from '../../redux/actions/thunk/post-type-thunk';

// Material UI
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const PostTypeButtons = (props) => {
  const { classes } = props;
  const [postType, setPostType] = useState('');

  const handlePostType = (event, newPostType) => {
    setPostType(newPostType);

    props.handleToggleButtonChange(newPostType);
  };

  useEffect(() => {
    if (!props.postTypes || !props.postTypes.length) {
      props.loadPostTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToggleButtonGroup
      className={classes.toggleGroup}
      size="medium"
      value={postType}
      exclusive
      onChange={handlePostType}
      aria-label="text alignment"
      required
    >
      {props.postTypes &&
        props.postTypes.map((postTypes) => (
          <ToggleButton
            classes={{ root: classes.toggleButton, selected: classes.selected }}
            id="postTypeField"
            value={postTypes.postType}
            key={postTypes.postType}
          >
            <Typography variant="button">{postTypes.postType}</Typography>
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
};

const styles = (theme) => ({
  toggleGroup: {
    flexWrap: 'wrap',
    backgroundColor: 'transparent !important',
  },
  toggleButton: {
    margin: '0 5px 5px 0',
    border: '2px solid #c4c4c4 !important',
    borderRadius: '50px !important',
    color: '#000 !important',
  },
  selected: {
    backgroundColor: '#3b49df !important',
    color: '#fff !important',
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
    loadPostTypes,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PostTypeButtons))
);
