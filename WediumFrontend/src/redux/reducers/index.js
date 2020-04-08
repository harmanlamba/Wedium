import {
    combineReducers
} from "redux";
import authReducer from "./auth-reducer";
import postTypeReducer from "./post-type-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    postType: postTypeReducer
});

export default rootReducer;