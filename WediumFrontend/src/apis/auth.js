import axios from "axios";

const SEND_TOKEN_END_POINT = process.env.REACT_APP_SEND_TOKEN_END_POINT;

export function postOneTimeToken(tokenBlob) {
    return axios.post(SEND_TOKEN_END_POINT + "/api/user/google", tokenBlob)
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

    return axios.get(SEND_TOKEN_END_POINT + "/api/user", tokenJSONConfig)
        .then(response => {
            console.log("Get Request with JWT Token Response");
            console.log(response);
        })
        .catch(error => console.log("Axios error message (checkJWTToken): " + error.message));
}