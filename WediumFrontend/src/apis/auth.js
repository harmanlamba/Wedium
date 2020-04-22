import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export function postOneTimeToken(tokenBlob) {
    return axios.post(API_URL + "/api/user/google", tokenBlob)
        .then(response => {
            return {
                "jwtToken": response.data.jwtToken,
                "firstName": response.data.firstName,
                "lastName": response.data.lastName,
                "username": response.data.username,
            };
        })
        .catch(error => console.log("Axios error message (postToken): " + error.message));
}

export function checkJWTToken(tokenJSON) {
    const tokenJSONConfig = {
        headers: {
            "Authorization": "Bearer " + tokenJSON
        }
    }

    return axios.get(API_URL + "/api/user", tokenJSONConfig)
        .then(response => {
            console.log("Get Request with JWT Token Response");
            console.log(response);
        })
        .catch(error => console.log("Axios error message (checkJWTToken): " + error.message));
}
