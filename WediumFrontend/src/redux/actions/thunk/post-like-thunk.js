import { likePost, unlikePost } from '../post-actions';
import { likePostRequest, unlikePostRequest } from '../../../apis/post-like';

export const tryLikePost = (postId) => {
    return dispatch => {
        likePostRequest(postId)
            .then(status => {
                if (status === 201) {
                    dispatch(likePost(postId));
                }
            })
    }
}

export const tryUnlikePost = (postId) => {
    return dispatch => {
        unlikePostRequest(postId)
            .then(status => {
                if (status === 200) {
                    dispatch(unlikePost(postId));
                }
            })
    }
}