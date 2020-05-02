import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const LIMIT = 5;

export function getPosts(postId) {
    const endpoint = `/api/post/Get?limit=${LIMIT}` + (postId ? `&after_id=${postId}` : "");
    return axios.get(API_URL + endpoint)
        .then(response => {
            return response.data;
        })
}

export function createPost(postDto) {
    const endpoint = '/api/post/Post';

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const tokenJSONConfig = {
        headers: {
            "Authorization": "Bearer " + storedUser.jwtToken
        }
    }

    return axios.post(API_URL + endpoint, postDto, tokenJSONConfig)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            console.log("Axios error message (createPosts): " + error.message)
            return error.response.status;
        });
}
