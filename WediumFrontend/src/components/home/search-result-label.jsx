import React from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';

const SearchResultLabel = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <div className={classes.searchText}>
        <Typography variant="body1">
          Showing results for
        </Typography>
        
        <Typography variant="body1"
          color="primary"
          className={classes.searchString}>
          {props.searchString}
        </Typography>
        
        {props.postType &&
          <Typography variant="body1">
            in
          </Typography>
        }
        
        {props.postType &&
          <Typography variant="body1"
            color="primary"
            className={classes.postType}
            onClick={() => history.push(`/post/${props.postType}`)}>
            {props.postType}
          </Typography>
        }
      </div>
      <CloseIcon className={classes.closeIcon}
        onClick={() => history.push(props.postType ? `/post/${props.postType}` : "")}
      />
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
    justifyContent: 'space-between',
  },
  searchText: {
    display: 'flex',
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
  closeIcon: {
    cursor: 'pointer',
  }
}));

export default SearchResultLabel;
