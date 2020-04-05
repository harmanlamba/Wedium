import {
    LOGIN,
    LOGOUT
} from "../actiontypes/authActionTypes";

const INIT_AUTH_REDUCER_STATE = ({
    user: '',
    isAuthenticated: false
});

function authReducer(state = INIT_AUTH_REDUCER_STATE, action) {
    switch (action.type) {
        case LOGIN:
            state = {
                ...state,
                user: action.payload,
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