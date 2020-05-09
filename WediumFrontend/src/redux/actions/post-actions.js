import { 
    LOAD_POSTS_LOADING,
    LOAD_POSTS_SUCCESS, 
    LOAD_MORE_POSTS_SUCCESS,
    LOAD_POSTS_ERROR, 
    LIKE_POST, 
    UNLIKE_POST,
    FAVOURITE_POST, 
    UNFAVOURITE_POST
} from '../action-types/action-types'

export const loadPostsLoading = () => {
    return {
        type: LOAD_POSTS_LOADING,
    }
}

export const loadPostsSuccess = (posts) => {
    return {
        type: LOAD_POSTS_SUCCESS,
        posts,
    }
}

export const loadMorePostsSuccess = (posts) => {
    return {
        type: LOAD_MORE_POSTS_SUCCESS,
        posts,
    }
}

export const loadPostsError = (err) => {
    return {
        type: LOAD_POSTS_ERROR,
        err,
    }
}

export const likePost = (postId) => {
    return {
        type: LIKE_POST,
        postId,
    }
}

export const unlikePost = (postId) => {
    return {
        type: UNLIKE_POST,
        postId,
    }
}

export const favouritePost = (postId) => {
    return {
        type: FAVOURITE_POST,
        postId
    }
}

export const unfavouritePost = (postId) => {
    return {
        type: UNFAVOURITE_POST,
        postId
    }
}
