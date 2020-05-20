import {
    LOAD_COMMENTS_LOADING,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_ERROR,
    ADD_COMMENT,
    LOAD_ADD_COMMENT,
    LOAD_ADD_REPLY,
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
            }

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

            default:
                return state;
    }
};