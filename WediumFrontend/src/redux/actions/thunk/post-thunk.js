import { loadPostsLoading, loadPostsSuccess, loadPostsError } from '../post-actions';
import { getPosts } from '../../../apis/post';

export function loadPosts(postId) {
    return dispatch => {

        dispatch(loadPostsLoading());

        getPosts(postId)
            .then(
                posts => dispatch(loadPostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));

    }
}
