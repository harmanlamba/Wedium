import {
    LOAD_USER_STATS_LOADING,
    LOAD_USER_STATS_SUCCESS,
    LOAD_USER_STATS_ERROR
} from '../action-types/action-types';

const INIT_USER_STATS_REDUCER_STATE = ({
    createPostCount: null,
    favouritePostCount: null
});

export default (state = INIT_USER_STATS_REDUCER_STATE, action) => {
    switch (action.type) {
        case LOAD_USER_STATS_LOADING:
            return {
                ...state,
                userStatsLoading: true,
            };
        case LOAD_USER_STATS_SUCCESS:
            return {
                ...state,
                userStatsLoading: false,
                createPostCount: actions.userStats.createPostCount,
                favouritePostCount: actions.userStats.favouritePostCount,
            };

        case LOAD_USER_STATS_ERROR:
            return {
                ...state,
                userStatsLoading: false,
            };

        default:
            return state;
    }
}
