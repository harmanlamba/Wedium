import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     title: {
//         marginLeft: theme.spacing(2),
//         flexGrow: 1,
//     },
// }));


const UserMenu = (props) => {
    // const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const auth = props.auth;


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        props.handleLogout();
        handleClose();
    }

    return (
        auth && (
            <div>
                <IconButton onClick={handleMenu}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>Log Out</MenuItem>
                </Menu>
            </div>
        )

    );
}

export default UserMenu;
