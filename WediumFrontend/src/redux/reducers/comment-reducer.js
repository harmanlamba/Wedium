import {
    LOAD_COMMENTS_LOADING,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_ERROR,
    ADD_COMMENT,
    LOAD_ADD_COMMENT,
    LOAD_ADD_REPLY,
    LIKE_COMMENT,
    UNLIKE_COMMENT
} from '../action-types/action-types';

const INIT_COMMENT_REDUCER_STATE = {
    comments: [],
};

export default (state = INIT_COMMENT_REDUCER_STATE, action) => {
    switch (action.type) {
        case LOAD_COMMENTS_LOADING:
            return {
                ...state,
                comments: [],
            };
        case LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments,
            };

        case LOAD_COMMENTS_ERROR:
            return {
                ...state,
                comments: [],
            };

            /** 
             * By adding comment, update the comments state depending on whether the comment
             * is a comment or child in posts
             */
        case ADD_COMMENT:
            if (action.comment.parentCommentId === null) {
                return {
                    ...state,
                    comments: [action.comment, ...state.comments],
                    isLoadingAddComment: false,
                };
            } else {
                let modifiedState = [...state.comments];
                const parentCommentIndex = modifiedState.findIndex(
                    (c) => c.commentId === action.comment.parentCommentId
                );
                const concatComments = [action.comment].concat(
                    modifiedState[parentCommentIndex].inverseParentComment
                );
                modifiedState[parentCommentIndex].inverseParentComment = concatComments;

                return {
                    ...state,
                    comments: modifiedState,
                    isLoadingAddReply: false,
                };
            };

        case LOAD_ADD_COMMENT:
            return {
                ...state,
                isLoadingAddComment: true,
            };

        case LOAD_ADD_REPLY:
            return {
                ...state,
                isLoadingAddReply: true,
            };

            /**
             * By liking a comment, update the state where the comment is
             * by searching for the comment id through state.comments. 
             */
        case LIKE_COMMENT:
            const editedLikedComments = [...state.comments];

            // If liked comment is not a reply, find index on through list of state.comments
            if (action.commentIds.parentCommentId === null) {
                const likedCommentIndex = editedLikedComments.findIndex(
                    (c) => c.commentId === action.commentIds.commentId
                );

                if (
                    likedCommentIndex !== -1 &&
                    editedLikedComments.length &&
                    editedLikedComments[likedCommentIndex]
                ) {
                    editedLikedComments[likedCommentIndex].isCommentLiked = true;
                    editedLikedComments[likedCommentIndex].numberOfLikes += 1;
                }
            } else {
                const likedParentCommentIndex = editedLikedComments.findIndex(
                    (c) => c.commentId === action.commentIds.parentCommentId
                );

                const likedChildCommentIndex = editedLikedComments[likedParentCommentIndex].inverseParentComment
                    .findIndex(
                        (c) => c.commentId === action.commentIds.commentId
                    );

                if (likedChildCommentIndex !== -1 &&
                    editedLikedComments[likedParentCommentIndex].inverseParentComment.length) {
                    editedLikedComments[likedParentCommentIndex].inverseParentComment[likedChildCommentIndex].isCommentLiked = true;
                    editedLikedComments[likedParentCommentIndex].inverseParentComment[likedChildCommentIndex].numberOfLikes += 1;
                }
            }

            return {
                ...state,
                comments: editedLikedComments,
            };


            /**
             * By unliking a comment, update the state where the comment is
             * by searching for the comment id through state.comments. 
             */
        case UNLIKE_COMMENT:
            const editedUnlikedComments = [...state.comments];

            // If unliked comment is not a reply, find index on through list of state.comments
            if (action.commentIds.parentCommentId === null) {
                const unlikedCommentIndex = editedUnlikedComments.findIndex(
                    (c) => c.commentId === action.commentIds.commentId
                );

                if (
                    unlikedCommentIndex !== -1 &&
                    editedUnlikedComments.length &&
                    editedUnlikedComments[unlikedCommentIndex]
                ) {
                    editedUnlikedComments[unlikedCommentIndex].isCommentLiked = false;
                    editedUnlikedComments[unlikedCommentIndex].numberOfLikes -= 1;
                }
            } else {
                const unlikedParentCommentIndex = editedUnlikedComments.findIndex(
                    (c) => c.commentId === action.commentIds.parentCommentId
                );

                const unlikedChildCommentIndex = editedUnlikedComments[unlikedParentCommentIndex].inverseParentComment
                    .findIndex(
                        (c) => c.commentId === action.commentIds.commentId
                    );

                if (unlikedChildCommentIndex !== -1 &&
                    editedUnlikedComments[unlikedParentCommentIndex].inverseParentComment.length) {
                    editedUnlikedComments[unlikedParentCommentIndex].inverseParentComment[unlikedChildCommentIndex].isCommentLiked = false;
                    editedUnlikedComments[unlikedParentCommentIndex].inverseParentComment[unlikedChildCommentIndex].numberOfLikes -= 1;
                }
            }

            return {
                ...state,
                comments: editedUnlikedComments,
            };

        default:
            return state;
    }
};