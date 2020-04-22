import {
    LOGIN,
    LOGOUT
} from "../action-types/action-types";
import {
    postOneTimeToken,
    checkJWTToken
} from "../../apis/auth";
import { authTokenIsValid } from '../../services/auth-service';

export function login(user) {
    // If a valid login session exists, dispatch LOGIN with the user information from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedUser && authTokenIsValid(storedUser.jwtToken)) {
        return dispatch => {
            dispatch({
                type: LOGIN,
                payload: {
                    "jwtToken": storedUser.jwtToken,
                    "firstName": storedUser.firstName,
                    "lastName": storedUser.lastName,
                    "username": `${storedUser.firstName} ${storedUser.lastName}`,
                    "isAuthenticated": true,
                },
            });
        }
    }

    if ((storedUser && !authTokenIsValid(storedUser.jwtToken)) || !user || !authTokenIsValid(user.jwtToken)) {
        return dispatch => {
            dispatch(logout());
        }
    }

    // Create a new login session, dispatch LOGIN with the passed in user information
    if (user) {
        const userInfo = {
            "jwtToken": user.jwtToken,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": `${user.firstName} ${user.lastName}`,
            "isAuthenticated": true,
        }
        
        localStorage.setItem("user", JSON.stringify(userInfo));
        
        return dispatch => {
            dispatch({
                type: LOGIN,
                payload: userInfo,
            });
        }
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem("user");

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
