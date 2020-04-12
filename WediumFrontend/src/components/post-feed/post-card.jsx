import React from 'react';
import moment from 'moment';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const PostCard = (props) => {
    const post = props.post;
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <div>
                    <CardContent>
                        <Typography variant="subtitle1">{post.postType} -
                            <Link className={classes.articleLink} href={post.articleUrl} target="_blank">
                                {post.articleTitle}
                            </Link>
                        </Typography>
                        <Typography variant="h6">{post.title}</Typography>
                    </CardContent>

                    <CardContent>
                        <Typography variant="subtitle2">{post.username}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            {moment(post.date).format('DD MMM')} - {moment(post.date).fromNow()}
                        </Typography>
                    </CardContent>
                </div>

                <div>
                    {post.articleImageUrl !== "" &&
                        <CardMedia
                            className={classes.image}
                            component="img"
                            src={post.articleImageUrl}
                        />
                    }
                </div>
            </Card>
        </div>
    );
}

export default PostCard;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 8,
        marginBottom: 30,
    },
    image: {
        width: 190,
        height: 160,
        border: '1px solid gainsboro',
    },
    articleLink: {
        marginLeft: 8,
    }
}));
