import React, { Component } from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';

// Component(s)
import PostTypes from './post-types'

class Home extends Component {

    componentDidMount() { }

    render() {
        return (
            <div>
                <Typography variant="h2">Wedium</Typography>
                <PostTypes />
            </div>
        );
    }
}

export default Home;