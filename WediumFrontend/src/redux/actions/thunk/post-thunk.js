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
        // Provide loading on fetching posts
        dispatch(loadPostsLoading(postType, searchString, profileFilter));

        getPosts(cancelToken, null, postType, searchString, profileFilter)
            .then(
                // On receive of posts, update state and stop loading state
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
                // On receive of posts, update state with additional posts
                posts => dispatch(loadMorePostsSuccess(posts)),

                error => {
                    if (!axios.isCancel(error)) {
                        dispatch(loadPostsError(error.message || 'Unexpected error occured.'))
                    }
                }
            );
    }
}

export const fetchPostDetails = (postId) => {
    return (dispatch) => {
        // On fetch of post details, enable loading
        dispatch(postDetailDirectNavigationLoading());

        getPostDetail(postId).then(
            // On receive of post details, update state with post details and stop loading
            post => dispatch(postDetailDirectNavigationSuccess(post)),

            error => dispatch(postDetailDirectNavigationError(error.message || "Unexpected error occured")),
        );
    }
}