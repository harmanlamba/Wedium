import {
    LOAD_POSTS_LOADING,
    LOAD_POSTS_SUCCESS,
    LOAD_MORE_POSTS_SUCCESS,
    LOAD_POSTS_ERROR,
    LIKE_POST,
    UNLIKE_POST,
    FAVOURITE_POST,
    UNFAVOURITE_POST
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
            const editedLikedPosts = [...state.posts];
            const likedPostIndex = editedLikedPosts.findIndex(p => p.postId === action.postId);
            if (likedPostIndex !== -1 && editedLikedPosts.length && editedLikedPosts[likedPostIndex]) {
                editedLikedPosts[likedPostIndex].isPostLiked = true;
                editedLikedPosts[likedPostIndex].numberOfLikes += 1;
            }

            return {
                ...state,
                posts: editedLikedPosts
            }
        
        case UNLIKE_POST:
            const editedUnlikedPosts = [...state.posts];
            const unlikedPostIndex = editedUnlikedPosts.findIndex(p => p.postId === action.postId);
            if (unlikedPostIndex !== -1 && editedUnlikedPosts.length && editedUnlikedPosts[unlikedPostIndex]) {
                editedUnlikedPosts[unlikedPostIndex].isPostLiked = false;
                editedUnlikedPosts[unlikedPostIndex].numberOfLikes -= 1;
            }

            return {
                ...state,
                posts: editedUnlikedPosts
            }

            case FAVOURITE_POST:
            const editedFavouritedPosts = [...state.posts];
            const favouriteIndex = editedFavouritedPosts.findIndex(p => p.postId === action.postId);
            if (favouriteIndex !== -1 && editedFavouritedPosts.length && editedFavouritedPosts[favouriteIndex]) {
                editedFavouritedPosts[favouriteIndex].isFavourited = true;
            }

            return {
                ...state,
                posts: editedFavouritedPosts
            }
        
        case UNFAVOURITE_POST:
            const editedUnfavouritedPosts = [...state.posts];
            const unfavouriteIndex = editedUnfavouritedPosts.findIndex(p => p.postId === action.postId);
            if (unfavouriteIndex !== -1 && editedUnfavouritedPosts.length && editedUnfavouritedPosts[unfavouriteIndex]) {
                editedUnfavouritedPosts[unfavouriteIndex].isFavourited = false;
            }

            return {
                ...state,
                posts: editedUnfavouritedPosts
            }

        default:
            return state;
    }
}
