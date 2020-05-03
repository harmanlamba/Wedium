import { likePost, unlikePost } from '../post-actions';
import { likePostRequest, unlikePostRequest } from '../../../apis/post-like';

export const tryLikePost = (postId, errorCallback) => {
    return dispatch => {
        likePostRequest(postId)
            .then(
                status => {
                    if (status === 201) {
                        dispatch(likePost(postId));
                    }
                },
                
                error => errorCallback()
            );
    }
}

export const tryUnlikePost = (postId, errorCallback) => {
    return dispatch => {
        unlikePostRequest(postId)
            .then(status => {
                    if (status === 200) {
                        dispatch(unlikePost(postId));
                    }
                },

                error => errorCallback()
            );
    }
}
