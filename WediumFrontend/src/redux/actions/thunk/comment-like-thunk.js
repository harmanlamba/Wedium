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
        dispatch(likeComment(commentIds));
        likeCommentRequest(commentIds.commentId)
            .then(
                status => {
                    if (status !== 201 && status !== 200) {
                        dispatch(unlikeComment(commentIds));
                        errorCallback();
                    }
                },

                error => {
                    dispatch(unlikeComment(commentIds));
                    errorCallback();
                }
            );
    }
}

export const tryUnlikeComment = (commentIds, errorCallback) => {
    return dispatch => {
        dispatch(unlikeComment(commentIds));
        unlikeCommentRequest(commentIds.commentId)
            .then(
                status => {
                    if (status !== 200 && status !== 204) {
                        dispatch(likeComment(commentIds));
                        errorCallback();
                    }
                },

                error => {
                    dispatch(likeComment(commentIds));
                    errorCallback();
                }
            );
    }
}