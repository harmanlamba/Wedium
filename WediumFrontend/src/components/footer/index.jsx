import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

const Footer = (props) => {
    const classes = props.classes;

    return (
        <div className={classes.root}>
            <Link to="/careers" style={{ textDecoration: 'none' }}>Careers</Link>
        </div>
    );
}

const styles = (theme) => ({
    "root": {
        textAlign: "center",
        margin: '0 15px',
        width: '105%',
        padding: '15px 0',
    }
});

export default withStyles(styles)(
  (withRouter(Footer))
);