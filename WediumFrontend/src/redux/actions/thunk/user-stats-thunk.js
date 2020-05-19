import {
    loadUserStatsLoading,
    loadUserStatsSuccess,
    loadUserStatsError
} from '../user-stats-actions';

import {
    getUserStats
} from '../../../apis/user-stats';

export const loadUserStats = () => {
    return dispatch => {

        dispatch(loadUserStatsLoading());

        getUserStats()
            .then(
                userStats => dispatch(loadUserStatsSuccess(userStats)),

                error => dispatch(loadUserStatsError(error.message || 'Unexpected error occured.')));

    }
}
