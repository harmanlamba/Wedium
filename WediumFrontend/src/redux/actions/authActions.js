import {
    LOGIN,
    LOGOUT
} from "../actiontypes/authActionTypes";
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
            
            //TODO: Here for testing purposes
            // checkJWTToken(user.jwtToken);
        }); 
    }
}