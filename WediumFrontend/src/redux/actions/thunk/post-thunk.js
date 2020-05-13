import {
    loadPostsLoading,
    loadPostsSuccess,
    loadMorePostsSuccess,
    loadPostsError,
    postDetailDirectNavigationSuccess,
    postDetailDirectNavigationError,
    postDetailDirectNavigationLoading,
    filtersUpdate,
} from '../post-actions';
import {
    getPosts,
    getPostDetail,
} from '../../../apis/post';

export const loadInitialPosts = (postType, searchString) => {
    return dispatch => {
        dispatch(loadPostsLoading());

        getPosts(null, postType, searchString)
            .then(
                posts => dispatch(loadPostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}

export const loadMorePosts = (afterPostId, postType, searchString) => {
    return dispatch => {
        getPosts(afterPostId, postType, searchString)
            .then(
                posts => dispatch(loadMorePostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
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

export const updateFilters = (postType, searchString) => {
    return (dispatch) => {
        dispatch(filtersUpdate(postType, searchString));
    }
}