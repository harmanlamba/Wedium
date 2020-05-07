import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostTypes } from '../../redux/actions/thunk/post-type-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const PostTypes = (props) => {
  const { classes, postTypes, currentPostType } = props;

  useEffect(() => {
    if (!postTypes || !postTypes.length) {
      props.loadPostTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = (redirectRoute) => {
    props.history.push(redirectRoute);
  }

  const listItems = props.postTypes.map((postTypes, i) => (
    <ListItem
      dense
      button
      key={i}
      onClick={() => onClick(`/post/${postTypes.postType}`)}
      className={`${classes.toggleButton} ${
        currentPostType === postTypes.postType ? classes.active : ''
      }`}
    >
      <Typography variant="body2"> {postTypes.postType}</Typography>
    </ListItem>
  ));

  listItems.unshift(
    <ListItem
      dense
      button
      key="all"
      onClick={() => onClick('/')}
      className={`${classes.toggleButton} ${
        currentPostType ? '' : classes.active
      }`}
    >
      <Typography variant="body2">All</Typography>
    </ListItem>
  );

  return (
    <div>
      <Divider />
      <br />
      {listItems.length <= 1 ? (
        ''
      ) : (
        <List className={classes.list}>{listItems}</List>
      )}
      <br />
      <Divider />
    </div>
  );
}

const styles = (theme) => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'transparent !important',
    margin: '0 8px',
    width: '105%',
  },
  toggleButton: {
    margin: '2px',
    border: '1px solid #c4c4c4 !important',
    borderRadius: '20px !important',
    padding: '8px 16px',
    width: 'fit-content',
    backgroundColor: '#ffffff',
  },
  active: {
    backgroundColor: '#3f51b5 !important',
    color: '#fff !important',
  },
});

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
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostTypes))
);
