import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Components
import Button from '@material-ui/core/Button';
import GoogleLoginButton from './google-login-button';
import UserMenu from './user-menu';

const Header = (props) => {
  const classes = useStyles();

  const user = props.user;
  const isAuth = user.isAuthenticated;

  return (
    <AppBar className={classes.appBar} color="transparent" position="static">
      <Toolbar variant="dense">
        <div className={classes.titleContainer}>
          <Button
            className={classes.titleButton}
            size="large"
            disableRipple="true"
            onClick={() => props.history.push('/')}
          >
            Wedium
          </Button>
        </div>
        {!isAuth && <GoogleLoginButton />}
        {isAuth && <UserMenu user={user} />}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleContainer: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  titleButton: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    backgroundColor: 'transparent !important',
  },
  appBar: {
    padding: '5px 0',
  },
}));

export default withRouter(Header);
