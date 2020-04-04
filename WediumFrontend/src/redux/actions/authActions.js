import {
    LOGIN,
    LOGOUT
} from "../actiontypes/authActionTypes";
import axios from "axios";

const SEND_TOKEN_END_POINT = "https://localhost:44300/";

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
        axios.post(SEND_TOKEN_END_POINT + "auth/google", tokenBlob)
            .then(response => {
                const token = response.data.token;
                dispatch(login(token));

                // TODO: Temp Testing 
                // const tempConfig = {
                //     headers: {
                //         Authorization: "Bearer " + token
                //     }
                // }

                // axios.get("https://localhost:44300/auth/", tempConfig)
                //     .then((response => {
                //         console.log("Get Request with JWT Token Response");
                //         console.log(response);
                //     }));
                
            })
            .catch(error => console.log("Axios error message (sendToken): " + error.message));
    }
}