import {
    favouritePost,
    unfavouritePost
} from '../post-actions';
import {
    favouritePostRequest,
    unfavouritePostRequest
} from '../../../apis/post';

export const tryFavouritePost = (postId, errorCallback) => {
    return dispatch => {
        favouritePostRequest(postId)
            .then(
                status => {
                    if (status === 201) {
                        dispatch(favouritePost(postId));
                    }
                },

                error => errorCallback()
            );
    }
}

export const tryUnfavouritePost = (postId, errorCallback) => {
    return dispatch => {
        unfavouritePostRequest(postId)
            .then(
                status => {
                    if (status === 200) {
                        dispatch(unfavouritePost(postId));
                    }
                },

                error => errorCallback()
            );
    }
}
