import {
    LOAD_POSTS_LOADING,
    LOAD_POSTS_SUCCESS,
    LOAD_MORE_POSTS_SUCCESS,
    LOAD_POSTS_ERROR,
    LIKE_POST,
    UNLIKE_POST,
} from '../action-types/action-types';

const INIT_POST_REDUCER_STATE = ({
    posts: []
});

export default function events(state = INIT_POST_REDUCER_STATE, action) {
    switch (action.type) {
        case LOAD_POSTS_LOADING:
            return {
                ...state,
                initialPostsLoading: true,
            }

        case LOAD_POSTS_SUCCESS:            
            return {
                ...state,
                posts: [...action.posts],
                initialPostsLoading: false,
            };

        case LOAD_MORE_POSTS_SUCCESS:            
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
            };

        case LOAD_POSTS_ERROR:
            return {
                ...state,
                posts: [...state.posts],
                initialPostsLoading: false,
            };
        
        case LIKE_POST:
            var editedLikedPosts = [...state.posts];
            var likedPostIndex = editedLikedPosts.findIndex(p => p.postId === action.postId);
            editedLikedPosts[likedPostIndex].isPostLiked = true;
            editedLikedPosts[likedPostIndex].numberOfLikes += 1;

            return {
                ...state,
                posts: editedLikedPosts
            }
        
        case UNLIKE_POST:
            var editedUnlikedPosts = [...state.posts];
            var unlikedPostIndex = editedUnlikedPosts.findIndex(p => p.postId === action.postId);
            editedUnlikedPosts[unlikedPostIndex].isPostLiked = false;
            editedUnlikedPosts[unlikedPostIndex].numberOfLikes -= 1;

            return {
                ...state,
                posts: editedUnlikedPosts
            }

        default:
            return state;
    }
}
