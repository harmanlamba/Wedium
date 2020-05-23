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
        <CardContent className={classes.cardContent}>
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
    marginBottom: 20,
    borderRadius: 5,
  },
  cardContent: {
    paddingBottom: '0px !important',
  },
  image: {
    width: 140,
    height: 128,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    borderRadius: 5,
  },
}));
