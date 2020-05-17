import {
    LOAD_COMMENTS_LOADING,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_ERROR,
} from '../action-types/action-types';

const INIT_COMMENT_REDUCER_STATE = ({
    comments: []
});

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

        default:
            return state;
    }
}