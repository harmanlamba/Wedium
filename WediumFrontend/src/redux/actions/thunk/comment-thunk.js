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
        // Comments loading state
        dispatch(loadCommentsLoading());

        commentGetRequest(postId)
            .then(
                comments => {
                    // Comments loading finished - update state with received comments
                    dispatch(loadCommentsSuccess(comments));
                },

                error => dispatch(loadCommentsError(error.message || 'Unexpected error occured.')));
    }
}

export const postComment = (comment) => {
    return dispatch => {
        // If comment is not a reply - add to parent comment state
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
                    if (status == 201) {
                        dispatch(addComment(commentDto));
                    }
                },

                error => dispatch(loadCommentsError(error.message || 'Unexpected error occured.')));
    }
}