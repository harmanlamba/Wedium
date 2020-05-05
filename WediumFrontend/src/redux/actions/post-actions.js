import { 
    CLEAR_POSTS,
    LOAD_POSTS_SUCCESS, 
    LOAD_POSTS_ERROR, 
    NO_POSTS,
    LIKE_POST, 
    UNLIKE_POST 
} from '../action-types/action-types'

export function clearPosts() {
    return {
        type: CLEAR_POSTS,
    }
}

export function loadPostsSuccess(posts) {
    return {
        type: LOAD_POSTS_SUCCESS,
        posts,
    }
}

export function loadPostsError(err) {
    return {
        type: LOAD_POSTS_ERROR,
        err,
    }
}

export function noPosts() {
    return {
        type: NO_POSTS,
    }
}

export function likePost(postId) {
    return {
        type: LIKE_POST,
        postId,
    }
}

export function unlikePost(postId) {
    return {
        type: UNLIKE_POST,
        postId,
    }
}
