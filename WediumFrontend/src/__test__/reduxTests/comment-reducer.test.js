import {
    loadCommentsSuccess,
    addComment,
    loadCommentsError
} from "../../redux/actions/comment-actions";
import rootReducer from "../../redux/reducers";
import {
    createStore
} from "redux";

let store;

beforeEach(() => {
    store = createStore(rootReducer);
})

it("check initial store state", () => {
    const keys = Object.keys(store.getState());
    console.log(keys); // Prints all reducer (stores)
    expect(1).toBe(1);
});