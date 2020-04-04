import axios from "axios";

const SEND_TOKEN_END_POINT = "https://localhost:44300/api/";

export function postToken(tokenBlob) {
    return axios.post(SEND_TOKEN_END_POINT + "auth/google", tokenBlob)
        .then(response => {
            return response.data.token;
        })
        .catch(error => console.log("Axios error message (postToken): " + error.message));
}

export function checkJWTToken(tokenJSON) {
    return axios.get(SEND_TOKEN_END_POINT + "auth", tokenJSON)
        .then(response => {
            console.log("Get Request with JWT Token Response");
            console.log(response);
        })
        .catch(error => console.log("Axios error message (checkJWTToken): " + error.message));
}