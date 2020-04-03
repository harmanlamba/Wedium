import {
    LOGIN,
    LOGOUT
} from "../actiontypes/authActionTypes";
import axios from "axios";

const SEND_TOKEN_END_POINT = "https://localhost:44300/auth/google";

export function login(token) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            payload: token
        });
    }
}

export function logout() {
    console.log("Logging out");

    return dispatch => {
        dispatch({
            type: LOGOUT,
            payload: ""
        });
    }
}

export function sendToken(tokenBlob) {
    console.log("Token blob: " + tokenBlob);

    return dispatch => {
        axios.post(SEND_TOKEN_END_POINT, "tokenBlob")
            .then(response => {
                response.json().then(user => {
                    const token = user.token;
                    console.log("Google token received:" + token);
                    dispatch(login(token));
                });
            })
            .catch(error => console.log("Axios error message (sendToken): " + error.message));
    }
}