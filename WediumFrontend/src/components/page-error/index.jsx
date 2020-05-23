import React from 'react';
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
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

const Home = (props) => {
  const { classes } = props;

  // Goes to home page and does a force refresh to reset redux state.
  const handleReturnHome = () => {
    props.history.push('/');
    window.location.reload();
  };

  return (
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
                O<AccessibleForwardIcon className={classes.chair} />
                PS!
              </Typography>
              <Typography variant="h5" component="h2" align="center">
                404 - PAGE NOT FOUND
              </Typography>
              <Typography variant="body2" component="p" align="center">
                The page you are looking for might have been removed,
                <br />
                or is temporarily unavailable.
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
  );
};

const styles = (theme) => ({
  grid: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    paddingTop: '20px !important',
    minHeight: '100vh',
  },
  chair: {
    fontSize: '80px !important',
  },
});

export default withStyles(styles)(withRouter(Home));
