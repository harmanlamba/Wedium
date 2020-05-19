import {
    LOAD_USER_STATS_LOADING,
    LOAD_USER_STATS_SUCCESS,
    LOAD_USER_STATS_ERROR
} from '../action-types/action-types'

export const loadUserStatsLoading = () => {
    return {
        type: LOAD_USER_STATS_LOADING
    }
}

export const loadUserStatsSuccess = (userStats) => {
    return {
        type: LOAD_USER_STATS_SUCCESS,
        userStats
    }
}

export const loadUserStatsError = (err) => {
    return {
        type: LOAD_USER_STATS_ERROR,
        err
    }
}