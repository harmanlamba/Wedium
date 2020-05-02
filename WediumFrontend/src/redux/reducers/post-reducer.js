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
            var posts = [...state.posts];
            var index = posts.findIndex(i => i.postId === action.postId);
            posts[index].isPostLiked = true;

            return {
                ...state,
                posts
            }
        
        case UNLIKE_POST:
            var posts = [...state.posts];
            var index = posts.findIndex(i => i.postId === action.postId);    
            posts[index].isPostLiked = false;

            return {
                ...state,
                posts
            }

        default:
            return state;
    }
}
