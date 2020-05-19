import {
    loadCommentsLoading,
    loadCommentsSuccess,
    loadCommentsError,
    addComment,
    loadAddComment,
} from '../comment-actions';
import {
    commentGetRequest,
    commentPostRequest
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

export const postComment = (comment) => {
    return dispatch => {
        dispatch(loadAddComment());

        commentPostRequest(comment)
            .then(
                ({
                    status,
                    commentDto
                }) => {
                    if (status == 201) {
                        dispatch(addComment(commentDto));
                    }
                },

                error => dispatch(loadCommentsError(error.message || 'Unexpected error occured.')));
    }
}