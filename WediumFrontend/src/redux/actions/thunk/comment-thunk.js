import {
    loadCommentsLoading,
    loadCommentsSuccess,
    loadCommentsError
} from '../comment-actions';
import {
    commentGetRequest
} from '../../../apis/comment';

export const loadComments = (postId) => {
    return dispatch => {
        dispatch(loadCommentsLoading());

        commentGetRequest(postId)
            .then(
                comments => {
                    dispatch(loadCommentsSuccess(comments));
                },

                error => dispatch(loadCommentsError(error.message || 'Unexpected error occured.')));

    }
}