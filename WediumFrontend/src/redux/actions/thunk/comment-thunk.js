import {
    loadCommentsLoading,
    loadCommentsSuccess,
    loadCommentsError,
    addComment,
    loadAddComment,
    loadAddReply,
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
        if (comment.ParentCommentId === null) {
            dispatch(loadAddComment());
        } else {
            dispatch(loadAddReply());
        }

        commentPostRequest(comment)
            .then(
                ({
                    status,
                    commentDto
                }) => {
                    // eslint-disable-next-line
                    if (status == 201) {
                        dispatch(addComment(commentDto));
                    }
                },

                error => dispatch(loadCommentsError(error.message || 'Unexpected error occured.')));
    }
}