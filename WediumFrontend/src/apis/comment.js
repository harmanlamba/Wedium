import axios from "axios";

import {
    createHeader
} from "./util/header-util";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Request to create comment given the comment load (commentDto)
 * which takes in {postId, parentCommentId, Body, CommentTypeId} 
 */
export const commentPostRequest = (commentDto) => {
    const header = createHeader();
    const endpoint = `${API_URL}/api/Comment/Post`;

    return axios
        .post(endpoint, commentDto, header)
        .then((response) => {
            return {
                status: response.status,
                commentDto: response.data
            };
        })
        .catch((error) => {
            console.log('Axios error message (createComment): ' + error.message);
            return error.response.status;
        });
}

/** 
 * Request to get comments given the postId
 */
export const commentGetRequest = (postId) => {
    const header = createHeader();
    const endpoint = `${API_URL}/api/comment/get/${postId}`;

    return axios.get(endpoint, header)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Axios error message (getCommentRequest): " + error.message)
            return error.response.status;
        });
}