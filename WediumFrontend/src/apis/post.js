import axios from 'axios';

import { createHeader } from './util/header-util';

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 8;

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

  if (profileFilter && profileFilter.getFavouritesOnly) {
    endpoint = `${API_URL}/api/favourite/Get`;
  } else if (profileFilter && profileFilter.getPostLikesOnly) {
    endpoint = `${API_URL}/api/postlike/Get`;
  } else if (profileFilter && profileFilter.getCreatedOnly) {
    endpoint = `${API_URL}/api/post/GetCreated`;
  } else {
    endpoint = `${API_URL}/api/post/Get`;

    if (postType) {
      queryString += `&postType=${postType}`;
    }
  
    if (searchString) {
      queryString += `&search=${searchString}`;
    }
  }

  return axios.get(`${endpoint}${queryString}`, header)
    .then((response) => {
      return response.data;
    });
};

export const createPost = (postDto) => {
  const header = createHeader();
  const endpoint = `${API_URL}/api/post/Post`;

  return axios
    .post(endpoint, postDto, header)
    .then((response) => {
      return {
        status: response.status,
        UriLocation: response.headers.location,
      };
    })
    .catch((error) => {
      console.log('Axios error message (createPosts): ' + error.message);
      return error.response.status;
    });
};

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
