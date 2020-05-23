import {
  LOAD_POSTS_LOADING,
  LOAD_POSTS_SUCCESS,
  LOAD_MORE_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  LIKE_POST,
  UNLIKE_POST,
  FAVOURITE_POST,
  UNFAVOURITE_POST,
  POST_DETAIL_DIRECT_NAVIGATION_SUCCESS,
  POST_DETAIL_DIRECT_NAVIGATION_ERROR,
  POST_DETAIL_DIRECT_NAVIGATION_LOADING,
} from '../action-types/action-types';

const INIT_POST_REDUCER_STATE = {
  posts: [],
};

export default (state = INIT_POST_REDUCER_STATE, action) => {
  switch (action.type) {
    case LOAD_POSTS_LOADING:
      return {
        ...state,
        initialPostsLoading: true,
          posts: [],
          postTypeFilter: action.postType,
          searchStringFilter: action.searchString,
          profileFilter: action.profileFilter
      };

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
      const likedPostIndex = editedLikedPosts.findIndex(
        (p) => p.postId === action.postId
      );

      // If liked post exists in state.posts, update state to liked post
      if (
        likedPostIndex !== -1 &&
        editedLikedPosts.length &&
        editedLikedPosts[likedPostIndex]
      ) {
        editedLikedPosts[likedPostIndex].isPostLiked = true;
        editedLikedPosts[likedPostIndex].numberOfLikes += 1;
      }

      return {
        ...state,
        posts: editedLikedPosts,
      };

    case POST_DETAIL_DIRECT_NAVIGATION_SUCCESS:
      const reduxStorePostLength = [...state.posts].length;
      const editedPosts = [...state.posts];
      const postIndex = editedPosts.findIndex(
        (p) => p.postId === action.post.postId
      );

      // If filtered post is fonud in state.posts, update state of the post(s) found
      if (postIndex === -1) {
        return {
          ...state,
          posts: [...state.posts, action.post],
          loadingPostDetails: false,
        };
      } else if (reduxStorePostLength === 0) {
        return {
          ...state,
          posts: [...state.posts, action.post],
          loadingPostDetails: false,
        };
      } else {
        editedPosts[postIndex].articleBody = action.post.articleBody;
        return {
          ...state,
          posts: editedPosts,
          loadingPostDetails: false,
        };
      }

      case POST_DETAIL_DIRECT_NAVIGATION_ERROR:
        return {
          ...state,
          posts: [...state.posts],
            loadingPostDetails: false,
        };

      case POST_DETAIL_DIRECT_NAVIGATION_LOADING:
        return {
          ...state,
          loadingPostDetails: true,
        };

      case UNLIKE_POST:
        const editedUnlikedPosts = [...state.posts];
        const unlikedPostIndex = editedUnlikedPosts.findIndex(
          (p) => p.postId === action.postId
        );

        // If post to unlike exists in state.posts, update state to unlike post
        if (
          unlikedPostIndex !== -1 &&
          editedUnlikedPosts.length &&
          editedUnlikedPosts[unlikedPostIndex]
        ) {
          editedUnlikedPosts[unlikedPostIndex].isPostLiked = false;
          editedUnlikedPosts[unlikedPostIndex].numberOfLikes -= 1;
        }

        return {
          ...state,
          posts: editedUnlikedPosts,
        };

      case FAVOURITE_POST:
        const editedFavouritedPosts = [...state.posts];
        const favouriteIndex = editedFavouritedPosts.findIndex(
          (p) => p.postId === action.postId
        );

        // If post exists in state.posts, update state to favourite post
        if (
          favouriteIndex !== -1 &&
          editedFavouritedPosts.length &&
          editedFavouritedPosts[favouriteIndex]
        ) {
          editedFavouritedPosts[favouriteIndex].isFavourited = true;
        }

        return {
          ...state,
          posts: editedFavouritedPosts,
        };

      case UNFAVOURITE_POST:
        const editedUnfavouritedPosts = [...state.posts];
        const unfavouriteIndex = editedUnfavouritedPosts.findIndex(
          (p) => p.postId === action.postId
        );

        // If post to exists in state.posts, update state to unfavourite post
        if (
          unfavouriteIndex !== -1 &&
          editedUnfavouritedPosts.length &&
          editedUnfavouritedPosts[unfavouriteIndex]
        ) {
          editedUnfavouritedPosts[unfavouriteIndex].isFavourited = false;
        }

        return {
          ...state,
          posts: editedUnfavouritedPosts,
        };

      default:
        return state;
  }
}