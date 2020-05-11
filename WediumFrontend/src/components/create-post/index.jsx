import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostForm from './post-form';
import PostGuide from './post-guide';
import Header from '../header';

const CreatePost = (props) => {
  useEffect(() => {
    props.tryLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { classes } = props;
  const user = props.auth;

  return (
    <div className={classes.root}>
      {user.isAuthenticated ? (
        <div>
          <Header user={user} />
          <Grid
            className={classes.grid}
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={6}>
              <PostForm />
            </Grid>
            <Grid item xs={3}>
              <PostGuide />
            </Grid>
          </Grid>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

const styles = (theme) => ({
  grid: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    paddingTop: '25px !important',
  },
  root: {
    width: '100%',
    flexGrow: 1,
    height: '100%',
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
  connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePost))
);
