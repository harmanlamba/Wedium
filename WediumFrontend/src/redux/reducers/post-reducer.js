import {
    LOAD_POSTS_LOADING,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_ERROR,
    LIKE_POST,
    UNLIKE_POST
} from '../action-types/action-types';

const INIT_POST_REDUCER_STATE = ({
    posts: []
});

export default function events(state = INIT_POST_REDUCER_STATE, action) {
    switch (action.type) {
        case LOAD_POSTS_LOADING:
            return {
                ...state
            };
        case LOAD_POSTS_SUCCESS:            
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
            };

        case LOAD_POSTS_ERROR:
            return {
                ...state,
                posts: [...state.posts],
            };
        
        case LIKE_POST:
            var editedLikedPosts = [...state.posts];
            editedLikedPosts[editedLikedPosts.findIndex(p => p.postId === action.postId)].isPostLiked = true;

            return {
                ...state,
                posts: editedLikedPosts
            }
        
        case UNLIKE_POST:
            var editedUnlikedPosts = [...state.posts];
            editedUnlikedPosts[editedUnlikedPosts.findIndex(p => p.postId === action.postId)].isPostLiked = false;

            return {
                ...state,
                posts: editedUnlikedPosts
            }

        default:
            return state;
    }
}
