import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingPostCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div>
        <CardContent>
          <Skeleton variant="text" width={130} />
          <Skeleton variant="text" width={150} height={40} />
          <br />

          <Skeleton variant="text" width={70} />
          <Skeleton variant="text" width={70} />
        </CardContent>
      </div>

      <div>
        <Skeleton className={classes.image} variant="rect" />
      </div>
    </Card>
  );
};

export default LoadingPostCard;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderRadius: 0,
  },
  image: {
    width: 140,
    height: 128,
    border: '2px solid gainsboro',
    margin: '12px 16px 12px 0',
  },
}));
