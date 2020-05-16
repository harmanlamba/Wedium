import axios from "axios";

import {
    createHeader
} from "./util/header-util";

const API_URL = process.env.REACT_APP_API_URL;

export const commentPostRequest = (commentDto) => {
    const header = createHeader();
    const endpoint = `${API_URL}/api/Comment/Post`;

    return axios
        .post(endpoint, commentDto, header)
        .then((response) => {
            return {
                status: response.status,
                UriLocation: response.headers.location,
            };
        })
        .catch((error) => {
            console.log('Axios error message (createComment): ' + error.message);
            return error.response.status;
        });
}

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