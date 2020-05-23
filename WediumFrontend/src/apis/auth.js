import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Make user login request to backend through tokenBlob.
 * Where tokenBlob is the response received from google auth response button
 * in components 
 */
export const postOneTimeToken = (tokenBlob) => {
    const endpoint = "/api/user/google";

    return axios.post(API_URL + endpoint, tokenBlob)
        .then(response => {
            return {
                "jwtToken": response.data.jwtToken,
                "firstName": response.data.firstName,
                "lastName": response.data.lastName,
                "username": response.data.username,
                "pictureUri": response.data.pictureUri
            };
        })
        .catch(error => console.log("Axios error message (postToken): " + error.message));
}

/**
 * Check user given jwt token in backend
 */
export const checkJWTToken = (tokenJSON) => {
    const endpoint = "/api/user";
    const tokenJSONConfig = {
        headers: {
            "Authorization": "Bearer " + tokenJSON
        }
    }

    return axios.get(API_URL + endpoint, tokenJSONConfig)
        .then(response => {
            console.log("Get Request with JWT Token Response");
            console.log(response);
        })
        .catch(error => console.log("Axios error message (checkJWTToken): " + error.message));
}