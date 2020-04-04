import {
    LOGIN,
    LOGOUT
} from "../actionTypes/authActionTypes";
import {
    postToken,
    checkJWTToken
} from "../../apis/auth";

function login(token) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            payload: token
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
        const token = postToken(tokenBlob);
        dispatch(login(token));

        // //TODO: Temp Testing 
        // const tokenJSON = {
        //     headers: {
        //         Authorization: "Bearer " + token
        //     }
        // }
        // checkJWTToken(tokenJSON);
    }
}