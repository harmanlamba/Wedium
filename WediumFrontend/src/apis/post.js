import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 5;

export function getPosts(postId) {
    const endpoint = `/api/post/Get?limit=${LIMIT}` + (postId ? `&after_id=${postId}` : "");
    return axios.get(API_URL + endpoint)
        .then(response => {
            return response.data
        })
}

export function createPost(postDto) {
    const endpoint = '/api/post/Post';

    return axios.post(API_URL + endpoint, postDto)
        .then(response => console.log(response))
        .catch(error => console.log("Axios error message (createPosts): " + error.message));
}