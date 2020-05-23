import {
    likePost,
    unlikePost
} from '../post-actions';
import {
    likePostRequest,
    unlikePostRequest
} from '../../../apis/post-like';

export const tryLikePost = (postId, errorCallback) => {
    return dispatch => {
        // Update state to like a post 
        dispatch(likePost(postId));

        // Make request to create like entry for a post
        likePostRequest(postId)
            .then(
                status => {
                    if (status !== 201 && status !== 200) {
                        dispatch(unlikePost(postId));
                        errorCallback();
                    }
                },

                error => {
                    // If error on request, update state to unlike a post
                    dispatch(unlikePost(postId));
                    errorCallback();
                }
            );
    }
}

export const tryUnlikePost = (postId, errorCallback) => {
    return dispatch => {
        // Update state to unlike a post 
        dispatch(unlikePost(postId));

        // Make request to delete like entry for a post
        unlikePostRequest(postId)
            .then(
                status => {
                    if (status !== 200 && status !== 204) {
                        dispatch(likePost(postId));
                        errorCallback();
                    }
                },

                error => {
                    // If error on request, update state to like a post
                    dispatch(likePost(postId));
                    errorCallback();
                }
            );
    }
}