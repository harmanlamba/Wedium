import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../redux/actions/thunk/auth-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Components
import Header from '../header';
import UserPanel from './user-panel';
import PostFeed from '../post-feed';

// TabPanel component to choose which tab to display based on selected value.
// Displays all child nodes within the component. Does not display child nodes
// of any other tab.
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Profile = (props) => {
  const { classes } = props;
  const history = useHistory();

  const [tabValue, setTabValue] = useState(null);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    props.tryLogin();

    // TabValue initialized to null but set 0 to avoid bug involving profile request being sent
    // on reload (even though refresh redirects to home page)
    setTabValue(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = props.auth;

  return (
    <div>
      {!user.isAuthenticated && history.push('/')}
      <Header user={user} />
      <Grid
        className={classes.grid}
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {
          tabValue !== null && 
          <Grid item xs={6}>
            <Tabs 
              value={tabValue} 
              onChange={(event, newValue) => setTabValue(newValue)}
              indicatorColor="primary"
              className={classes.tabs}>
              
              <Tab label="Created Posts" {...a11yProps(0)} />
              <Tab label="Saved Posts" {...a11yProps(1)} />
              <Tab label="Liked Posts" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <PostFeed profileFilter={{getCreatedOnly: true}} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <PostFeed profileFilter={{getFavouritesOnly: true}} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <PostFeed profileFilter={{getPostLikesOnly: true}} />
            </TabPanel>
          </Grid>
        }
        <Grid item xs={2} className={classes.sidebar}>
          <UserPanel user={user} />
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  grid: {
    flexGrow: 1,
    margin: 0,
    width: '100%',
    paddingTop: '20px !important',
  },
  sidebar: {
    position: 'sticky',
    top: 40,
  },
  tabs: {
    borderRadius: 0,
    padding: 10,
    marginBottom: 16,
    backgroundColor: 'white',
  },
});

// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  tryLogin,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
);
