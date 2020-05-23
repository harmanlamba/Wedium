import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostTypes } from '../../redux/actions/thunk/post-type-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
  };

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
      <Typography variant="button"> {postTypes.postType}</Typography>
    </ListItem>
  ));

  listItems.unshift(
    <ListItem
      dense
      button
      key="all"
      disabled={props.postsLoading}
      onClick={() => onClick('/')}
      className={`${classes.toggleButton} ${
        currentPostType ? '' : classes.active
      }`}
    >
      <Typography variant="button">All</Typography>
    </ListItem>
  );

  return (
    <div>
      {listItems.length <= 1 ? (
        ''
      ) : (
        <List className={classes.list}>{listItems}</List>
      )}
    </div>
  );
};

const styles = (theme) => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'transparent !important',
    margin: '0 15px',
    width: '105%',
    padding: '15px 0',
    borderTop: '2px solid #000 !important',
    borderBottom: '2px solid #000 !important',
  },
  toggleButton: {
    margin: '2px',
    border: '2px solid #e8e8e8 !important',
    borderRadius: '30px !important',
    padding: '8px 16px',
    width: 'fit-content',
    backgroundColor: '#fff',
  },
  active: {
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

const mapDispatchToProps = {
  loadPostTypes,
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostTypes))
);
