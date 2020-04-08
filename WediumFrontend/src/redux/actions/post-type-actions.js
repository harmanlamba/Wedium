import { LOAD_POST_TYPES_LOADING, LOAD_POST_TYPES_SUCCESS, LOAD_POST_TYPES_ERROR } from '../action-types/action-types'

export function loadPostTypesLoading() {
    return {
        type: LOAD_POST_TYPES_LOADING
    }
}

export function loadPostTypesSuccess(postTypes) {
    return {
        type: LOAD_POST_TYPES_SUCCESS,
        postTypes
    }
}

export function loadEventsError(err) {
    return {
        type: LOAD_POST_TYPES_ERROR,
        err
    }
}