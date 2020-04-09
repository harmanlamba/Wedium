import {
    LOGIN,
    LOGOUT
} from "../action-types/action-types";

const INIT_AUTH_REDUCER_STATE = ({
    user: null,
    firstName: null,
    lastName: null,
    username: null,
    isAuthenticated: false
});

function authReducer(state = INIT_AUTH_REDUCER_STATE, action) {
    switch (action.type) {
        case LOGIN:
            state = {
                ...state,
                user: action.payload.jwtToken,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username,
                isAuthenticated: true
            };
            break;
        case LOGOUT:
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

export default authReducer;
