import axios from "axios";

const API_URL = "https://localhost:44300/api";

export function getPostTypes() {
    return axios.get(API_URL + "/posttype/Get")
        .then(response => { return response.data })
}