import {
    loadPostsSuccess,
    loadPostsError,
    noPosts
} from '../post-actions';
import {
    getPosts,
} from '../../../apis/post';

export function loadPosts(afterPostId, postType, searchString) {
    return dispatch => {
        getPosts(afterPostId, postType, searchString)
            .then(
                posts => {
                    if (!afterPostId && !posts.length) {
                        dispatch(noPosts());
                    } else {
                        dispatch(loadPostsSuccess(posts));
                    }
                },

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}