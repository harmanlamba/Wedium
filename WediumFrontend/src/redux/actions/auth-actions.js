import {
    LOGIN,
    LOGOUT
} from "../action-types/action-types";

export const login = (user) => {
    return {
        type: LOGIN,
        payload: user,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        payload: ""
    }
}
