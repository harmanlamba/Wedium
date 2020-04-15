import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 5;

export function getPosts(postId) {
    const endpoint = `/api/post/Get?limit=${LIMIT}` + (postId ? `&after_id=${postId}` : "");
    return axios.get(API_URL + endpoint)
        .then(response => { return response.data })
}
