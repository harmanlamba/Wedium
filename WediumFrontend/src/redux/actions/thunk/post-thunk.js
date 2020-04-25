import {
    loadPostsLoading,
    loadPostsSuccess,
    loadPostsError
} from '../post-actions';
import {
    getPosts,
    createPost
} from '../../../apis/post';

export function loadInitialPosts() {
    return dispatch => {

        dispatch(loadPostsLoading());

        getPosts()
            .then(
                posts => dispatch(loadPostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}

export function loadMorePosts(postId) {
    return dispatch => {
        getPosts(postId)
            .then(
                posts => dispatch(loadPostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}

export function createSinglePost(postDto) {

    return dispatch => {
        createPost(postDto)
            .then(
                console.log("yeyuh")
            )
    }
}