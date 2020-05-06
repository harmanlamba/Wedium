import axios from "axios";

import { createHeader } from "./util/header-util"

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 5;

export function getPosts(postId) {
    const header = createHeader();
    const endpoint = `${API_URL}/api/post/Get?limit=${LIMIT}` + (postId ? `&after_id=${postId}` : "");

    return axios.get(endpoint, header)
        .then(response => { 
            return response.data 
        })
}

export function createPost(postDto) {
    const header = createHeader();
    const endpoint = `${API_URL}/api/post/Post`;

    return axios.post(endpoint, postDto, header)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            console.log("Axios error message (createPosts): " + error.message)
            return error.response.status;
        });
}

export const favouritePostRequest = (postId) => {
    const header = createHeader();
    const endpoint = `${API_URL}/api/favourite/post`;

    const body = {
        postId
    };

    return axios.post(endpoint, body, header)
        .then(response => { 
            return response.status 
        });
} 

export const unfavouritePostRequest = (postId) => {
    const header = createHeader();
    const endpoint = `${API_URL}/api/favourite/delete`;

    const body = {
        postId
    };

    return axios.post(endpoint, body, header)
        .then(response => { 
            return response.status 
        });
}
