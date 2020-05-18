import React, { useEffect } from 'react';

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
import { Typography } from '@material-ui/core';

const UserPanel = (props) => {
    const { classes } = props;

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const user = props.user;
    const numPosts = 5;
    const numPostsFaved = 15;

    return (
        <div>
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
                    {numPosts < 5 && <StarBorderIcon />}
                    {numPosts >= 5 && numPosts < 15 && <StarHalfIcon />}
                    {numPosts >= 15 && <StarIcon />}

                    <Typography variant="subtitle1" color="textSecondary">
                        {numPosts < 5 && "NEWBIE"}
                        {numPosts >= 5 && numPosts < 15 && "RISING STAR"}
                        {numPosts >= 15 && "STAR POSTER"}
                    </Typography>
                </div>
                <br />

                <div className={classes.iconAndText}>
                    <Typography variant="subtitle2" className={classes.rightSpacing}>
                        {numPosts} posts created
                    </Typography>
                    <CreateIcon />
                </div>
                <div className={classes.iconAndText}>
                    <Typography variant="subtitle2" className={classes.rightSpacing}>
                        {numPostsFaved} posts saved
                    </Typography>
                    <FavouritesIcon />
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

export default withStyles(styles)(UserPanel);
