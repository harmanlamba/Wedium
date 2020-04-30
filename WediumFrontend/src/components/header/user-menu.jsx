import React, { useState } from 'react';
import { logout } from '../../redux/actions/auth-actions';
import { useDispatch } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';

// Components
import GoogleLoginButton from './google-login-button';
import { Typography } from '@material-ui/core';

const UserMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
  };

  return (
    <div>
      <Button onClick={handleMenuOpen}>
        {props.user.isAuthenticated ? (
          <Typography
            variant="button"
            display="inline"
            className={classes.textName}
          >
            {props.user.username}
          </Typography>
        ) : (
          <Typography variant="button" display="inline">
            Sign In
          </Typography>
        )}
        <AccountCircle />
      </Button>

      <Menu
        className={classes.root}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {props.user.isAuthenticated ? (
          <MenuItem onClick={handleLogout}>
            <Typography variant="subtitle2">Sign Out</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <GoogleLoginButton />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 32,
  },
  textName: {
    marginRight: '10px',
  },
}));

export default UserMenu;
