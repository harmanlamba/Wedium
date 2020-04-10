import {
    LOGIN,
    LOGOUT
} from "../action-types/action-types";
import {
    postOneTimeToken,
    checkJWTToken
} from "../../apis/auth";

function login(user) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            payload: user
        });
    }
}

export function logout() {
    return dispatch => {
        dispatch({
            type: LOGOUT,
            payload: ""
        });
    }
}

export function sendToken(tokenBlob) {
    return dispatch => {
        postOneTimeToken(tokenBlob)
        .then(user => {
            dispatch(login(user));
        }); 
    }
}