import React, { useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/thunk/auth-thunk';
import { withRouter } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
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
  const [expanded, setExpanded] = useState(false);

  const handleMenuOpen = (event) => {
    setExpanded(!expanded);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setExpanded(!expanded);
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
        startIcon={<CreateIcon />}
      >
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
        <Avatar className={classes.profileImage} src={props.user.pictureUri} />
        <ExpandMoreIcon
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
        />
      </Button>

      <Menu
        className={classes.menuDropdown}
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  menuDropdown: {
    flexGrow: 1,
    marginTop: 40,
  },
  rightSpacing: {
    marginRight: '10px',
  },
  profileImage: {
    marginRight: '10px',
  },
}));

const mapDispatchToProps = { logoutUser };

export default connect(null, mapDispatchToProps)(withRouter(UserMenu));
