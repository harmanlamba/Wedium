import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FavouritesIcon from '@material-ui/icons/BookmarksOutlined';
import { Typography } from '@material-ui/core';

// Components
import Header from '../header';
import UserPanel from './user-panel';
import PostFeed from '../post-feed';

const Profile = (props) => {
  const { classes } = props;
  const history = useHistory();

  useEffect(() => {
    props.tryLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = props.auth;

  return (
    <div>
      {!user.isAuthenticated && history.push('/')}
      <Header user={user} />
      <Grid
        className={classes.grid}
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.title}
          >
            <Typography variant="h6">Saved Posts</Typography>
            <FavouritesIcon />
          </Grid>
          <PostFeed getFavouritesOnly={true} />
        </Grid>

        <Grid item xs={2} className={classes.sidebar}>
          <UserPanel user={user} />
        </Grid>

      </Grid>
    </div>
  );
};

Profile.propTypes = {
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
  title: {
    marginRight: theme.spacing(1),
    marginBottom: 12,
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
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
);
