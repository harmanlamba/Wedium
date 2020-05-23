import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

// Empty skeleton PostCard to display while posts are loading.
const LoadingPostCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div>
        <CardContent>
          <Skeleton variant="text" width={130} animation="wave" />
          <Skeleton className={classes.postTitle} variant="text" width={300} height={40} animation="wave" />
          <Skeleton variant="text" width={90} animation="wave" />
          <Skeleton variant="text" width={120} animation="wave" />
        </CardContent>
      </div>

      <div>
        <Skeleton className={classes.image} variant="rect" animation="wave" />
      </div>
    </Card>
  );
};

export default LoadingPostCard;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 5,
  },
  image: {
    width: 150,
    height: 132,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    borderRadius: 5,
  },
  postTitle: {
    marginBottom: 26,
  },
}));
