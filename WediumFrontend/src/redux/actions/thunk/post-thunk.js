import {
    loadPostsLoading,
    loadPostsSuccess,
    loadMorePostsSuccess,
    loadPostsError,
} from '../post-actions';
import {
    getPosts,
} from '../../../apis/post';

export function loadInitialPosts(postType, searchString) {
    return dispatch => {
        dispatch(loadPostsLoading());

        getPosts(null, postType, searchString)
            .then(
                posts => dispatch(loadPostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}

export function loadMorePosts(afterPostId, postType, searchString) {
    return dispatch => {
        getPosts(afterPostId, postType, searchString)
            .then(
                posts => dispatch(loadMorePostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}
