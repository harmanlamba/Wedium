import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Components
import Button from '@material-ui/core/Button';
import Cake from '../../assets/cake-icon';
import GoogleLoginButton from './google-login-button';
import UserMenu from './user-menu';
import SearchBar from './search-bar';
import Typography from '@material-ui/core/Typography';

const Header = (props) => {
  const goHome = () => {
    // Changes current path and does a force reload to reset redux state.
    props.history.push('/');
    window.location.reload();
  };

  const classes = useStyles();

  const user = props.user;
  const isAuth = user.isAuthenticated;

  return (
    <AppBar className={classes.appBar} color="transparent" position="static">
      <Toolbar variant="dense" className={classes.root}>
        <Button
          className={classes.titleButton}
          size="large"
          disableRipple={true}
          onClick={goHome}
        >
          <Cake />
          <Typography className={classes.title} variant="h6">
            Wedium
          </Typography>
        </Button>

        {props.showSearch && <SearchBar postType={props.postType} />}

        {!isAuth && <GoogleLoginButton />}
        {isAuth && <UserMenu user={user} />}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  titleButton: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    backgroundColor: 'transparent !important',
  },
  title: {
    marginLeft: 3,
    color: '#000',
  },
}));

export default withRouter(Header);
