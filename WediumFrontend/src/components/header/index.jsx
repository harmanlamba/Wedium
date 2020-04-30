import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Components
import GoogleLoginButton from './google-login-button';
import UserMenu from './user-menu';

const Header = (props) => {
  const classes = useStyles();

  const user = props.user;
  const isAuth = user.isAuthenticated;

  return (
    <AppBar color="transparent" position="static" className={classes.appBar}>
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          Wedium
        </Typography>
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
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  appBar: {
    padding: '5px 0',
  },
}));

export default Header;
