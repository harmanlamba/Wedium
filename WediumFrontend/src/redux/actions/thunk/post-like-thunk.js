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
        dispatch(likePost(postId));
        likePostRequest(postId)
            .then(
                status => {
                    if (status !== 201 && status !== 200) {
                        dispatch(unlikePost(postId));
                        errorCallback();
                    }
                },
                
                error => {
                    dispatch(unlikePost(postId));
                    errorCallback();
                }
            );
    }
}

export const tryUnlikePost = (postId, errorCallback) => {
    return dispatch => {
        dispatch(unlikePost(postId));
        unlikePostRequest(postId)
            .then(
                status => {
                    if (status !== 200 && status !== 204) {
                        dispatch(likePost(postId));
                        errorCallback();
                    }
                },

                error => {
                    dispatch(likePost(postId));
                    errorCallback();
                }
            );
    }
}
