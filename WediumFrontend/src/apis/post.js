import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export function getPosts(postId) {
    console.log(postId);
    if (postId) {
        return axios.get(API_URL + "/api/post/Get/" + postId)
            .then(response => { return response.data })
    } else {
        return axios.get(API_URL + "/api/post/Get")
            .then(response => { return response.data })
    }
}