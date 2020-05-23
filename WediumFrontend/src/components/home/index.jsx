import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

  // Parses searchString query string out of url. Removes percent encoding.
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
        <Grid className={classes.feedTitle} item xs={8}>
          <Typography className={classes.commentTitle} variant="h6">
            Post Feed
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {searchString !== undefined && (
            <SearchResultLabel
              searchString={searchString}
              postType={currentPostType}
            />
          )}
          <PostFeed
            postType={currentPostType}
            searchString={searchString}
            getFavouritesOnly={false}
          />
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
    position: 'sticky',
    top: 40,
  },
  feedTitle: {
    paddingTop: '0px !important',
    padingBottom: '0px !important',
    marginBottom: '-10px',
    '& h6': {
      borderLeft: '5px solid black',
      paddingLeft: 10,
    },
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
