import React from 'react';
import { logout } from '../../redux/actions/auth-actions';
import { useDispatch } from "react-redux";

// Material UI
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';

// Components
import GoogleLoginButton from './google-login-button';

const UserMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  }

  return (
    <div>
      {props.user.isAuthenticated ? props.user.username : "Sign In"}
      <IconButton onClick={handleMenu}>
        <AccountCircle />
      </IconButton>

      <Menu className={classes.root}
        anchorEl={anchorEl}

        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.user.isAuthenticated ? <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          : <MenuItem onClick={handleClose}><GoogleLoginButton /></MenuItem>}

      </Menu>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 32,
  },
}));

export default UserMenu;
