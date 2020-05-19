import axios from 'axios';
import {
    loadPostsLoading,
    loadPostsSuccess,
    loadMorePostsSuccess,
    loadPostsError,
    postDetailDirectNavigationSuccess,
    postDetailDirectNavigationError,
    postDetailDirectNavigationLoading,
} from '../post-actions';
import {
    getPosts,
    getPostDetail,
} from '../../../apis/post';

export const loadInitialPosts = (cancelToken, postType, searchString, profileFilter) => {
    return dispatch => {
        dispatch(loadPostsLoading(postType, searchString, profileFilter));

        getPosts(cancelToken, null, postType, searchString, profileFilter)
            .then(
                posts => dispatch(loadPostsSuccess(posts)),

                error => {
                    if (!axios.isCancel(error)) {
                        dispatch(loadPostsError(error.message || 'Unexpected error occured.'))
                    }
                }
            );
    }
}

export const loadMorePosts = (cancelToken, afterPostId, postType, searchString, profileFilter) => {
    return dispatch => {
        getPosts(cancelToken, afterPostId, postType, searchString, profileFilter)
            .then(
                posts => dispatch(loadMorePostsSuccess(posts)),

                error =>  {
                    if (!axios.isCancel(error)) {
                        dispatch(loadPostsError(error.message || 'Unexpected error occured.'))
                    }
                }
            );
    }
}

export const fetchPostDetails = (postId) => {
    return (dispatch) => {

        dispatch(postDetailDirectNavigationLoading());
        getPostDetail(postId).then(
           post => dispatch(postDetailDirectNavigationSuccess(post)),
           
           error => dispatch(postDetailDirectNavigationError(error.message || "Unexpected error occured")),
        );
    }
}
