import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostTypes } from '../../redux/actions/thunk/post-type-thunk';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class PostTypes extends Component {
  componentDidMount() {
    if (!this.props.postTypes || this.props.postTypes.length <= 0) {
      this.props.loadPostTypes();
    }
  }

  onClick(redirectRoute) {
    this.props.history.push(redirectRoute);
  }

  render() {
    const { classes } = this.props;

    const currentPostType = this.props.currentPostType;

    const listItems = this.props.postTypes.map((postTypes, i) => (
      <ListItem dense button key={i} onClick={() => this.onClick(`/post/${postTypes.postType}`)} className={currentPostType === postTypes.postType ? classes.currentSelection : ""}>
        <Typography variant="body2"> {postTypes.postType}</Typography>
      </ListItem>
    ));

    listItems.unshift(
      <ListItem dense button key="all" onClick={() => this.onClick("/")} className={currentPostType ? "" : classes.currentSelection}>
        <Typography variant="body2">All</Typography>
      </ListItem>
    );

    return (
      <div>
        <Typography variant="body1">Article Categories</Typography>
        <Divider />
        <List>{listItems}</List>
        <Divider />
      </div>
    );
  }
}

const styles = (theme) => ({
  currentSelection: {
    background: 'rgba(0, 0, 0, 0.04)',
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
  withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(PostTypes)
  )
);
