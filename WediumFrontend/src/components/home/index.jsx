import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

// Components
import Header from '../header';
import PostTypes from './post-types';
import PostFeed from '../post-feed';

const qs = require('query-string');

class Home extends Component {
  componentDidMount() {
    this.props.tryLogin();
  }

  render() {
    const { classes } = this.props;

    const user = this.props.auth;

    const currentPostType = this.props.match.params.postType;
    const searchString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search;

    return (
      <div>
        <Header user={user} showSearch={true} />
        <Grid
          className={classes.grid}
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={8}>
            {searchString !== undefined && 
            <Card className={classes.search}>
              <Typography variant="h5">Search results for: {searchString}</Typography>
            </Card>}
          </Grid>
          <Grid item xs={6}>
            <PostFeed postType={currentPostType} searchString={searchString} />
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
  search: {
    borderRadius: 0,
    padding: 10,
  },
  sidebar: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: 40,
  },
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
