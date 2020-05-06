import { LOAD_POSTS_LOADING, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR, LIKE_POST, UNLIKE_POST, FAVOURITE_POST, UNFAVOURITE_POST } from '../action-types/action-types'

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

export function likePost(postId) {
    return {
        type: LIKE_POST,
        postId
    }
}

export function unlikePost(postId) {
    return {
        type: UNLIKE_POST,
        postId
    }
}

export function favouritePost(postId) {
    return {
        type: FAVOURITE_POST,
        postId
    }
}

export function unfavouritePost(postId) {
    return {
        type: UNFAVOURITE_POST,
        postId
    }
}
