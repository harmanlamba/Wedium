import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// Components
import PostTypes from './post-types'
import PostFeed from '../post-feed'

class Home extends Component {

    componentDidMount() { }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={3} // This causes the horizontal scroll
                    direction="row"
                    justify="center"
                    alignItems="flex-start">

                    <Grid item xs={8}>
                        <Paper>Search</Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper>Filter Bar</Paper>
                        <br />
                        <PostFeed />
                    </Grid>

                    <Grid item xs={2}>
                        <PostTypes />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = (theme) => ({
    root: {
        flexGrow: 1
    },
});

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);