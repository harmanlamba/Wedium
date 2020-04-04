import axios from "axios";

const SEND_TOKEN_END_POINT = "https://localhost:44300/api/";

export function postOneTimeToken(tokenBlob) {
    return axios.post(SEND_TOKEN_END_POINT + "auth/google", tokenBlob)
        .then(response => {
            return response.data.jwtToken;
        })
        .catch(error => console.log("Axios error message (postToken): " + error.message));
}

export function checkJWTToken(tokenJSON) {
    const tokenJSONConfig = {
        headers: {
            Authorization: "Bearer " + tokenJSON
        }
    }

    return axios.get(SEND_TOKEN_END_POINT + "auth", tokenJSONConfig)
        .then(response => {
            console.log("Get Request with JWT Token Response");
            console.log(response);
        })
        .catch(error => console.log("Axios error message (checkJWTToken): " + error.message));
}