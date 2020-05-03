import { login, logout } from '../auth-actions';
import { authTokenIsValid } from '../../../services/auth-service';
import { postOneTimeToken } from "../../../apis/auth";

export function tryLogin(user) {
    // If a valid login session exists, dispatch login with the user information from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && authTokenIsValid(storedUser.jwtToken)) {
        const userInfo = {
            "jwtToken": storedUser.jwtToken,
            "firstName": storedUser.firstName,
            "lastName": storedUser.lastName,
            "username": `${storedUser.firstName} ${storedUser.lastName}`,
            "pictureUri": storedUser.pictureUri,
            "isAuthenticated": true,
        }
        return dispatch => {
            dispatch(login(userInfo));
        }
    }

    // If the user's token has expired, log them out
    if ((storedUser && !authTokenIsValid(storedUser.jwtToken)) || !user || !authTokenIsValid(user.jwtToken)) {
        return dispatch => {
            dispatch(logout());
        }
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem("user");
        dispatch(logout());
    }
}

export function sendTokenAndLogin(tokenBlob) {
    return dispatch => {
        postOneTimeToken(tokenBlob)
            .then(user => {
                const userInfo = {
                    "jwtToken": user.jwtToken,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "username": `${user.firstName} ${user.lastName}`,
                    "pictureUri": user.pictureUri,
                    "isAuthenticated": true,
                }

                localStorage.setItem("user", JSON.stringify(userInfo));

                dispatch(login(userInfo));
            });
    }
}
