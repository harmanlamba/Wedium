import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/thunk/auth-thunk';
import { withRouter } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CreateIcon from '@material-ui/icons/Create';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// Components
import GoogleLoginButton from './google-login-button';

const UserMenu = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    props.logoutUser();
  };

  const handlePostRedirect = () => {
    props.history.push('/create');
  };

  return (
    <div>
      <Button
        className={classes.rightSpacing}
        variant="contained"
        color="primary"
        onClick={handlePostRedirect}
        size="small"
      >
        <CreateIcon className={classes.rightSpacing} />
        Post
      </Button>
      <Button onClick={handleMenuOpen}>
        {props.user.isAuthenticated ? (
          <Typography
            className={classes.rightSpacing}
            variant="button"
            display="inline"
          >
            {props.user.username}
          </Typography>
        ) : (
          <Typography variant="button" display="inline">
            Sign In
          </Typography>
        )}
        <AccountCircle className={classes.rightSpacing} />
        <ExpandMoreIcon />
      </Button>

      <Menu
        className={classes.root}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {props.user.isAuthenticated ? (
          <MenuItem onClick={handleLogout}>
            <MeetingRoomIcon className={classes.rightSpacing} />
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
  rightSpacing: {
    marginRight: '10px',
  },
}));

const mapDispatchToProps = { logoutUser };

export default connect(null, mapDispatchToProps)(withRouter(UserMenu));
