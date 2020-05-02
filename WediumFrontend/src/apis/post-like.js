import axios from "axios";

import { createHeader } from "./util/header-util"

const API_URL = process.env.REACT_APP_API_URL;

export const likePostRequest = (postId, token) => {
    const header = createHeader();

    const body = {
        postId
    }

    return axios.post(`${API_URL}/api/postlike/post`, body, header)
        .then(response => { return response.status });
} 

export const unlikePostRequest = (postId, token) => {
    const header = createHeader();

    const body = {
        postId
    }

    return axios.post(`${API_URL}/api/postlike/delete`, body, header)
        .then(response => { return response.status });
}