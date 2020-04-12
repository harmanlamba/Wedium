import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostTypes } from '../../redux/actions/thunk';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class PostTypes extends Component {

    componentDidMount() {
        this.props.loadPostTypes();
    }

    render() {
        const listItems = this.props.postTypes.map((postTypes, i) =>
            <ListItem button key={i}>
                <ListItemText primary={postTypes.postType} />
            </ListItem>
        );

        return (
            <div>
                <Divider />
                <Typography variant="h6">Categories</Typography>
                <List>{listItems}</List>
                <Divider />
            </div>
        );
    }
}

// Redux
const mapStateToProps = (state) => {
    return {
        postTypes: state.postType.postTypes,
    };
};

const mapDispatchToProps = {
    loadPostTypes
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostTypes)
);