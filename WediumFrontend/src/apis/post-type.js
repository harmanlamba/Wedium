import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getPostTypes = () => {
    return axios.get(API_URL + "/api/posttype/")
        .then(response => { return response.data })
}
