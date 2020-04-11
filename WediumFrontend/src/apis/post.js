import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 15;

export function getPosts(postId) {
    if (postId) {
        return axios.get(API_URL + `/api/post/Get?limit=${LIMIT}&after_id=${postId}`)
            .then(response => { return response.data })
    } else {
        return axios.get(API_URL + `/api/post/Get?limit=${LIMIT}`)
            .then(response => { return response.data })
    }
}