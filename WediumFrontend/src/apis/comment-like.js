import axios from "axios";

import {
    createHeader
} from "./util/header-util";

const API_URL = process.env.REACT_APP_API_URL;

/** 
 * Request create like with user for a given comment
 */
export const likeCommentRequest = (commentId) => {
    const header = createHeader();
    const endpoint = `${API_URL}/api/commentLike/post`;

    const body = {
        commentId
    };

    return axios.post(endpoint, body, header)
        .then(response => {
            return response.status
        });
}

/**
 * Request delete like with user for a given comment
 */
export const unlikeCommentRequest = (commentId) => {
    const header = createHeader();
    const endpoint = `${API_URL}/api/commentLike/delete`;

    const body = {
        commentId
    };

    return axios.post(endpoint, body, header)
        .then(response => {
            return response.status
        });
}