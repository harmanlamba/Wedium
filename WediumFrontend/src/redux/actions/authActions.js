import {
    LOGIN,
    LOGOUT
} from "../actiontypes/authActionTypes";
import {
    postOneTimeToken,
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
        postOneTimeToken(tokenBlob)
        .then(jwtToken => {
            dispatch(login(jwtToken));
            
            //TODO: Here for testing purposes
            checkJWTToken(jwtToken);
        });
        
    
        
    }
}