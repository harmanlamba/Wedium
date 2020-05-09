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

export function loadInitialPosts(postType, searchString) {
    return dispatch => {
        dispatch(loadPostsLoading());

        getPosts(null, postType, searchString)
            .then(
                posts => dispatch(loadPostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}

export function loadMorePosts(afterPostId, postType, searchString) {
    return dispatch => {
        getPosts(afterPostId, postType, searchString)
            .then(
                posts => dispatch(loadMorePostsSuccess(posts)),

                error => dispatch(loadPostsError(error.message || 'Unexpected error occured.')));
    }
}

export function fetchPostDetails(postId){
    return (dispatch) => {

        dispatch(postDetailDirectNavigationLoading());
        getPostDetail(postId).then(
           post => dispatch(postDetailDirectNavigationSuccess(post)),
           
           error => dispatch(postDetailDirectNavigationError(error.message || "Unexpected error occured")),
        );
    }
}
