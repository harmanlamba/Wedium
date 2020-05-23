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

        // On fetching user states in profile page, set loading
        dispatch(loadUserStatsLoading());

        getUserStats()
            .then(
                // Getting user states, stop loading, update profile state
                userStats => dispatch(loadUserStatsSuccess(userStats)),

                error => dispatch(loadUserStatsError(error.message || 'Unexpected error occured.')));

    }
}