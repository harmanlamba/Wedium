import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUserStats } from '../../redux/actions/thunk/user-stats-thunk';

// Material UI
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import CreateIcon from '@material-ui/icons/CreateOutlined';
import FavouritesIcon from '@material-ui/icons/BookmarksOutlined';
import LikedIcon from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@material-ui/core';

const UserPanel = (props) => {
    const { classes, createPostCount, favouritePostCount, postLikeCount, userStatsLoading} = props;

    useEffect(() => {
        props.loadUserStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const user = props.user;

    return (
        !userStatsLoading && <div>
            <Divider />
            <br />
            <Grid
                container
                direction="column"
                justify="center"
                align="center"
                alignItems="center"
            >
                <Avatar className={classes.avatarSize} src={user.pictureUri} />
                <br />
                <Typography variant="h5" align="center">{user.username}</Typography>
                <br />

                <div>
                    {createPostCount < 5 && <StarBorderIcon />}
                    {createPostCount >= 5 && createPostCount < 15 && <StarHalfIcon />}
                    {createPostCount >= 15 && <StarIcon />}

                    <Typography variant="subtitle1" color="textSecondary">
                        {createPostCount < 5 && "NEWBIE"}
                        {createPostCount >= 5 && createPostCount < 15 && "RISING STAR"}
                        {createPostCount >= 15 && "SUPERSTAR"}
                    </Typography>
                </div>
                <br />

                <div className={classes.iconAndText}>
                    <Typography variant="subtitle2" className={classes.rightSpacing}>
                        {createPostCount} posts created
                    </Typography>
                    <CreateIcon />
                </div>
                <div className={classes.iconAndText}>
                    <Typography variant="subtitle2" className={classes.rightSpacing}>
                        {favouritePostCount} posts saved
                    </Typography>
                    <FavouritesIcon />
                </div>
                <div className={classes.iconAndText}>
                    <Typography variant="subtitle2" className={classes.rightSpacing}>
                        {postLikeCount} posts liked
                    </Typography>
                    <LikedIcon />
                </div>
            </Grid>
            <br />
            <Divider />
        </div>
    );
};

const styles = (theme) => ({
    avatarSize: {
        width: theme.spacing(14),
        height: theme.spacing(14),
        margin: 'auto',
    },
    iconAndText: {
        display: 'flex',
        justify: 'center',
        opacity: 0.6,
        marginTop: 8
    },
    rightSpacing: {
        marginRight: 8,
    }
});

// Redux
const mapStateToProps = (state) => {
    return {
      createPostCount: state.userStats.createPostCount,
      favouritePostCount: state.userStats.favouritePostCount,
      postLikeCount: state.userStats.postLikeCount,
      userStatsLoading: state.userStats.userStatsLoading,
    };
  };
  
  const mapDispatchToProps = {
    loadUserStats,
  };
  
  export default withRouter(
    withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserPanel))
  );
  