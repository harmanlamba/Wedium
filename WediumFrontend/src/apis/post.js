import axios from 'axios';

import { createHeader } from './util/header-util';

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 15;

export const getPosts = (cancelToken, afterPostId, postType, searchString, getFavouritesOnly) => {
  const header = createHeader();
  var queryString = `?limit=${LIMIT}`;

  if (cancelToken) {
    header.cancelToken = cancelToken;
  }

  if (afterPostId) {
    queryString += `&after_id=${afterPostId}`;
  }

  if (postType && !getFavouritesOnly) {
    queryString += `&postType=${postType}`;
  }

  if (searchString && !getFavouritesOnly) {
    queryString += `&search=${searchString}`;
  }

  let endpoint;

  if (getFavouritesOnly) {
    endpoint = `${API_URL}/api/favourite/Get${queryString}`;
  } else {
    endpoint = `${API_URL}/api/post/Get${queryString}`;
  }

  return axios.get(endpoint, header)
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
