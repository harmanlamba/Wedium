import {
    LOAD_POST_TYPES_LOADING,
    LOAD_POST_TYPES_SUCCESS,
    LOAD_POST_TYPES_ERROR
} from '../action-types/action-types';

const INIT_POST_TYPE_REDUCER_STATE = ({
    postTypes: []
});

export default function events(state = INIT_POST_TYPE_REDUCER_STATE, action) {
    switch (action.type) {
        case LOAD_POST_TYPES_LOADING:
            return {
                ...state,
                postTypes: [],
            };
        case LOAD_POST_TYPES_SUCCESS:
            return {
                ...state,
                postTypes: action.postTypes,
            };

        case LOAD_POST_TYPES_ERROR:
            return {
                ...state,
                postTypes: [],
            };

        default:
            return state;
    }
}
