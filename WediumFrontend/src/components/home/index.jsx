import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Components
import Header from '../header';
import PostTypes from './post-types';
import PostFeed from '../post-feed';
import SearchResultLabel from './search-result-label';

const qs = require('query-string');

const Home = (props) => {
  const { classes } = props;

  useEffect(() => {
    props.tryLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = props.auth;

  const currentPostType = props.match.params.postType;
  const searchString = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  }).search;

  return (
    <div>
      <Header user={user} showSearch postType={currentPostType} />
      <Grid
        className={classes.grid}
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          {searchString !== undefined && (
            <SearchResultLabel
              searchString={searchString}
              postType={currentPostType}
            />
          )}
          <PostFeed postType={currentPostType} searchString={searchString} getFavouritesOnly={false} />
        </Grid>

        <Grid item xs={2} className={classes.sidebar}>
          <PostTypes currentPostType={currentPostType} />
        </Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  grid: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    paddingTop: '20px !important',
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
