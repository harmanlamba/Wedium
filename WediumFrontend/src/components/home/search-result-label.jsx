import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const SearchResultLabel = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.search}>
      <Typography variant="body1">Showing results for</Typography>
      <Typography variant="body1"
        color="primary"
        display="inline"
        className={classes.searchString}>
        {props.searchString}
      </Typography>
      { props.postType && <div>
        <Typography variant="body1" display="inline">in</Typography>
        <Typography variant="body1"
        color="primary"
        display="inline"
        className={classes.postType}
        onClick={() => history.push(`/post/${props.postType}`)}>
        {props.postType}
      </Typography></div>}
    
    </Card>

  );
};

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: 0,
    padding: 10,
    display: 'flex',
  },
  searchString: {
    margin: '0 4px',
  },
  postType: {
    margin: '0 4px',
    cursor: 'pointer',
  },
}));

export default SearchResultLabel;
