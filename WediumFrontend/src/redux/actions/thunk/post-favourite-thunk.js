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
        dispatch(favouritePost(postId));
        favouritePostRequest(postId)
            .then(
                status => {
                    if (status !== 201 && status !== 200) {
                        dispatch(unfavouritePost(postId));
                        errorCallback();
                    }
                },

                error => {
                    dispatch(unfavouritePost(postId));
                    errorCallback()
                }
            );
    }
}

export const tryUnfavouritePost = (postId, errorCallback) => {
    return dispatch => {
        dispatch(unfavouritePost(postId));
        unfavouritePostRequest(postId)
            .then(
                status => {
                    if (status !== 200 && status !== 204) {
                        dispatch(favouritePost(postId));
                        errorCallback();
                    }
                },

                error => {
                    dispatch(favouritePost(postId));
                    errorCallback();
                }
            );
    }
}
