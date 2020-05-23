import axios from 'axios';

import {
  createHeader
} from './util/header-util';

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 15; //Get posts limit in Feed

/**
 * Request to get all posts given the threshold, filtering, and search input strings
 * cancelToken - to cancel old api request (if requests were applied too many times)
 * afterPostId - last received post (fetches post after that)
 */
export const getPosts = (cancelToken, afterPostId, postType, searchString, profileFilter) => {
  const header = createHeader();
  var queryString = `?limit=${LIMIT}`;
  let endpoint;

  if (cancelToken) {
    header.cancelToken = cancelToken;
  }

  if (afterPostId) {
    queryString += `&after_id=${afterPostId}`;
  }

  // Handle filtering for user's profile centred posts
  if (profileFilter && profileFilter.getFavouritesOnly) {
    endpoint = `${API_URL}/api/favourite/Get`;
  } else if (profileFilter && profileFilter.getPostLikesOnly) {
    endpoint = `${API_URL}/api/postlike/Get`;
  } else if (profileFilter && profileFilter.getCreatedOnly) {
    endpoint = `${API_URL}/api/post/GetCreated`;
  } else {
    endpoint = `${API_URL}/api/post/Get`;

    // Filter through post type selection
    if (postType) {
      queryString += `&postType=${postType}`;
    }

    // Filter through search string
    if (searchString) {
      queryString += `&search=${searchString}`;
    }
  }

  return axios.get(`${endpoint}${queryString}`, header)
    .then((response) => {
      return response.data;
    });
};

/**
 * Make request to backend to create a post given postDto
 * postDto consists of (ArticleTitle, ArticleUrl, Title, Description, PostType)
 */
export const createPost = (postDto) => {
  const header = createHeader();
  const endpoint = `${API_URL}/api/post/Post`;

  return axios
    .post(endpoint, postDto, header)
    .then((response) => {
      return {
        status: response.status,
        UriLocation: response.headers.location, // location of where the post was created
      };
    })
    .catch((error) => {
      console.log('Axios error message (createPosts): ' + error.message);
      return error.response.status;
    });
};

/**
 * Request to get a post's and its corresponding article contents given a postId
 */
export const getPostDetail = (postId) => {
  const header = createHeader();
  const endpoint = `${API_URL}/api/post/Get/${postId}`;

  return axios
    .get(endpoint, header)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(
        'Axios error message (getPostDetailRequest): ' + error.message
      );
      return error.response.status;
    });
};