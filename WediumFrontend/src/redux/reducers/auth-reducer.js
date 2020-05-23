import {
    LOGIN,
    LOGOUT
} from "../action-types/action-types";

const INIT_AUTH_REDUCER_STATE = ({
    user: null,
    firstName: null,
    lastName: null,
    username: null,
    pictureUri: null,
    isAuthenticated: false
});

export default (state = INIT_AUTH_REDUCER_STATE, action) => {
    switch (action.type) {
        // Update state with user information
        case LOGIN:
            state = {
                ...state,
                user: action.payload.jwtToken,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username,
                pictureUri: action.payload.pictureUri,
                isAuthenticated: true
            };
            break;

        case LOGOUT:
            // On logout, set user jwt token to empty and falsify isAuthenticated
            state = {
                ...state,
                user: '',
                isAuthenticated: false
            };
            break;

        default:
            break;
    };
    return state;
}