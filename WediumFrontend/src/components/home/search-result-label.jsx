import React from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const SearchResultLabel = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <Typography variant="body1">Showing results for</Typography>

      <Typography variant="body1"
        color="primary"
        display="inline"
        className={classes.searchString}>
        {props.searchString}
      </Typography>

      {props.postType &&
        <div>
          <Typography variant="body1" display="inline">in</Typography>
          <Typography variant="body1"
            color="primary"
            display="inline"
            className={classes.postType}
            onClick={() => history.push(`/post/${props.postType}`)}>
            {props.postType}
          </Typography>
        </div>
      }
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    padding: 10,
    display: 'flex',
    fontWeight: 200,
    marginBottom: 16,
  },
  searchString: {
    margin: '0 4px',
    fontWeight: 500,
  },
  postType: {
    margin: '0 4px',
    cursor: 'pointer',
    fontWeight: 500,
  },
}));

export default SearchResultLabel;
