import axios from "axios";

import {
  createHeader
} from "./util/header-util";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Request to create favouriting of post entry for a user
 */
export const favouritePostRequest = (postId) => {
  const header = createHeader();
  const endpoint = `${API_URL}/api/favourite/post`;

  const body = {
    postId,
  };

  return axios.post(endpoint, body, header).then((response) => {
    return response.status;
  });
};

/**
 * Request to delete favouriting of a post entry for a user
 */
export const unfavouritePostRequest = (postId) => {
  const header = createHeader();
  const endpoint = `${API_URL}/api/favourite/delete`;

  const body = {
    postId,
  };

  return axios.post(endpoint, body, header).then((response) => {
    return response.status;
  });
};