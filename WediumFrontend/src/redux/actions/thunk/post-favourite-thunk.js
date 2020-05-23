import {
    favouritePost,
    unfavouritePost
} from '../post-actions';
import {
    favouritePostRequest,
    unfavouritePostRequest
} from '../../../apis/post-favourite';

export const tryFavouritePost = (postId, errorCallback) => {
    return dispatch => {
        // Update state to favourite a post 
        dispatch(favouritePost(postId));

        // Request to create favourite entry for a post
        favouritePostRequest(postId)
            .then(
                status => {
                    if (status !== 201 && status !== 200) {
                        dispatch(unfavouritePost(postId));
                        errorCallback();
                    }
                },

                error => {
                    // If unsuccessful request, unfavourite state applied
                    dispatch(unfavouritePost(postId));
                    errorCallback()
                }
            );
    }
}

export const tryUnfavouritePost = (postId, errorCallback) => {
    return dispatch => {
        // Update state to unfavourite a post 
        dispatch(unfavouritePost(postId));

        // Request to delete favourite entry for a post
        unfavouritePostRequest(postId)
            .then(
                status => {
                    if (status !== 200 && status !== 204) {
                        dispatch(favouritePost(postId));
                        errorCallback();
                    }
                },

                error => {
                    // If unsuccessful request, favourite state applied
                    dispatch(favouritePost(postId));
                    errorCallback();
                }
            );
    }
}