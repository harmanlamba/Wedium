import { LOAD_POSTS_LOADING, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR } from '../action-types/action-types'

export function loadPostsLoading() {
    return {
        type: LOAD_POSTS_LOADING,
    }
}

export function loadPostsSuccess(posts) {
    return {
        type: LOAD_POSTS_SUCCESS,
        posts
    }
}

export function loadPostsError(err) {
    return {
        type: LOAD_POSTS_ERROR,
        err
    }
}
