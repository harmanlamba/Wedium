import {
    likeComment,
    unlikeComment
} from '../comment-actions';
import {
    likeCommentRequest,
    unlikeCommentRequest
} from '../../../apis/comment-like';

export const tryLikeComment = (commentIds, errorCallback) => {
    return dispatch => {
        // Update comment like state
        dispatch(likeComment(commentIds));

        // Perform like comment request
        likeCommentRequest(commentIds.commentId)
            .then(
                status => {
                    if (status !== 201 && status !== 200) {
                        dispatch(unlikeComment(commentIds));
                        errorCallback();
                    }
                },

                error => {
                    // If like comment request failed, update state to unlike
                    dispatch(unlikeComment(commentIds));
                    errorCallback();
                }
            );
    }
}

export const tryUnlikeComment = (commentIds, errorCallback) => {
    return dispatch => {
        // Update comment unlike state
        dispatch(unlikeComment(commentIds));

        // Perform unlike comment request
        unlikeCommentRequest(commentIds.commentId)
            .then(
                status => {
                    if (status !== 200 && status !== 204) {
                        dispatch(likeComment(commentIds));
                        errorCallback();
                    }
                },

                error => {
                    // If unlike comment request failed, update state to like
                    dispatch(likeComment(commentIds));
                    errorCallback();
                }
            );
    }
}