import React from 'react';
import moment from 'moment';
import { connect } from "react-redux";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import PostLike from '../post-like';
import PostFavourite from '../post-favourite';

const PostCard = (props) => {
    const post = props.post;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div>
                <CardContent>
                    <Typography variant="subtitle1">
                        {post.postType} -
                            <Link className={classes.articleLink} href={post.articleUrl} target="_blank">
                            {post.articleTitle}
                        </Link>
                    </Typography>

                    <Typography variant="h6">{post.title}</Typography>
                    <br />

                    <Link variant="subtitle2" color="textSecondary">{post.username}</Link>

                    <Typography variant="subtitle2" color="textSecondary">
                        {moment(post.date).format('DD MMM')} - {moment(post.date).fromNow()}
                    </Typography>
                </CardContent>
            </div>

            <div className={classes.rightPanel}>
                <div className={classes.buttonGroup}>
                    <PostLike postId={post.postId} isPostLiked={post.isPostLiked} numberOfLikes={post.numberOfLikes} />
                    <PostFavourite postId={post.postId} isFavourited={post.isFavourited} />
                </div>

                {post.articleImageUrl !== "" &&
                    <CardMedia
                        className={classes.image}
                        component="img"
                        src={post.articleImageUrl}
                    />
                }
            </div>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    image: {
        width: 140,
        height: 128,
        border: '2px solid gainsboro',
        marginTop: 16,
        marginRight: 8
    },
    articleLink: {
        marginLeft: 8,
    },
    rightPanel: {
        display: 'flex',
    },
    buttonGroup: {
        display: 'flex',
        alignSelf: 'flex-end',
        marginRight: 12,
        marginBottom: 12
    },
}));

// Redux
const mapStateToProps = (state) => {
    return {
        posts: state.post.posts,
    };
};

export default connect(mapStateToProps)(PostCard);
