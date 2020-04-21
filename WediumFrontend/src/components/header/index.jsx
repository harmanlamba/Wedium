import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

// Components
import GoogleLoginButton from './google-login-button';
import UserMenu from './user-menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        marginLeft: theme.spacing(2),
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleLogout = () => {
        setAuth(false);
    };

    return (
        <div>
            {/* For testing auth state */}
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} />}
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup>
            <AppBar color="transparent" position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.title}>
                        Wedium
                        </Typography>
                    {!auth && (<GoogleLoginButton />)}
                    <UserMenu auth={auth} handleLogout={handleLogout} />
                </Toolbar>
            </AppBar>

        </div>

    );
}

export default Header;
