import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../header';
import PostTypes from './post-types';
import PostFeed from '../post-feed';

class Home extends Component {
  componentDidMount() {
    this.props.tryLogin();
  }

  render() {
    const { classes } = this.props;

    const user = this.props.auth;

    const currentPostType = this.props.match.params.postType

    return (
      <div>
        <Header user={user} />
        <Grid
          className={classes.grid}
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={8}>
            <Paper>Search</Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper>Filter Bar</Paper>
            <br />
            <PostFeed postType={currentPostType} />
          </Grid>

          <Grid item xs={2} className={classes.sidebar}>
            <PostTypes currentPostType={currentPostType} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  grid: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
  },
  sidebar: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: 20,
  }
});

// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  tryLogin,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
);
