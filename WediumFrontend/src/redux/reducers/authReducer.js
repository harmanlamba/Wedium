import {
    LOGIN,
    LOGOUT
} from "../actiontypes/authActionTypes";

const initAuthReducerState = ({
    user: '',
    isAuthenticated: false
});

const authReducer = (state = initAuthReducerState, action) => {
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