import {
    combineReducers
} from "redux";
import authReducer from "./auth-reducer";
import postTypeReducer from "./post-type-reducer";
import postReducer from "./post-reducer";
import commentReducer from "./comment-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    postType: postTypeReducer,
    post: postReducer,
    comment: commentReducer,
});

export default rootReducer;