import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardContent';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// Components
import Header from '../header';

const Careers = (props) => {
    // Goes to home page and does a force refresh to reset redux state.
    const handleReturnHome = () => {
        props.history.push('/');
        window.location.reload();
    };

    const classes = props.classes;

    const user = props.auth;

    return (
        <div>
            <Header user={user} />
            <div>
            <Grid
                className={classes.grid}
                container
                spacing={10}
                direction="row"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={6}>
                <Card>
                    <CardContent>
                    <Typography variant="h1" component="h2" align="center">
                        CAREERS
                    </Typography>
                    <Typography variant="h5" component="h2" align="center">
                    Reach out on <a href="https://github.com/harmanlamba/Wedium">GitHub</a> to join us!
                    </Typography>
                    </CardContent>
                    <CardActions align="center">
                    <Button
                        onClick={handleReturnHome}
                        size="small"
                        variant="contained"
                        color="primary"
                    >
                        <ArrowBackIosIcon />
                        Go back home
                    </Button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
            </div>
        </div>
    );
}

const styles = (theme) => ({
    grid: {
        flexGrow: 1,
        margin: 0,
        width: '100%',
        paddingTop: '20px !important',
        minHeight: '80vh',
      },
      chair: {
        fontSize: '80px !important',
      },
});

// Redux
const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };

export default withStyles(styles)(
    connect(mapStateToProps)(withRouter(Careers))
);
  