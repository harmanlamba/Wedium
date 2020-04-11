import React, { Component } from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';

// Components
import PostTypes from './post-types'
import PostFeed from '../post-feed'

class Home extends Component {

    componentDidMount() { }

    render() {
        return (
            <div>
                <Typography variant="h2">Wedium</Typography>
                <PostTypes />
                <PostFeed />
            </div>
        );
    }
}

export default Home;
