import {
    LOAD_POST_TYPES_LOADING,
    LOAD_POST_TYPES_SUCCESS,
    LOAD_POST_TYPES_ERROR
} from '../action-types/action-types'

export const loadPostTypesLoading = () => {
    return {
        type: LOAD_POST_TYPES_LOADING
    }
}

export const loadPostTypesSuccess = (postTypes) => {

    const storedPostTypes = JSON.parse(localStorage.getItem("postTypes"));

    // If store post types are already fetched and stored, load stored state
    if (storedPostTypes) {
        return {
            type: LOAD_POST_TYPES_SUCCESS,
            postTypes: storedPostTypes
        }
    }

    // Else cache post types
    localStorage.setItem("postTypes", JSON.stringify(postTypes));
    return {
        type: LOAD_POST_TYPES_SUCCESS,
        postTypes
    }
}

export const loadPostTypesError = (err) => {
    return {
        type: LOAD_POST_TYPES_ERROR,
        err
    }
}