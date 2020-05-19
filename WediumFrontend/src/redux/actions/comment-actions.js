import {
    LOAD_COMMENTS_LOADING,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_ERROR,
    ADD_COMMENT,
    LOAD_ADD_COMMENT,
} from '../action-types/action-types'

export const loadCommentsLoading = () => {
    return {
        type: LOAD_COMMENTS_LOADING,
    }
}

export const loadCommentsSuccess = (comments) => {
    return {
        type: LOAD_COMMENTS_SUCCESS,
        comments,
    }
}

export const loadCommentsError = (err) => {
    return {
        type: LOAD_COMMENTS_ERROR,
        err,
    }
}

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment,
    }
}

export const loadAddComment = () => {
    return {
        type: LOAD_ADD_COMMENT,
    }
}