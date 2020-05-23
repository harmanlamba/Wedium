import {
    loadPostTypesSuccess,
    loadPostTypesError,
} from "../../redux/actions/post-type-actions";
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
    expect(keys.length).toBe(5);
    expect(keys[1]).toBe("postType");
    expect(store.getState().comment.comments).toStrictEqual([]);
});

it("check load post type success", () => {
    const postTypes = [{
            postType: "Culture"
        },
        {
            postType: "Geography"
        },
        {
            postType: "Health"
        },
        {
            postType: "History"
        },
        {
            postType: "Human Activities"
        },
        {
            postType: "Mathematics"
        },
        {
            postType: "Nature"
        },
        {
            postType: "People"
        },
        {
            postType: "Philosophy"
        },
        {
            postType: "Reference"
        },
        {
            postType: "Religion"
        },
        {
            postType: "Society"
        },
        {
            postType: "Technology"
        }
    ];
    store.dispatch(loadPostTypesSuccess(postTypes));
    expect(store.getState().postType.postTypes.length).toBe(postTypes.length);
    expect(store.getState().postType.postTypes).toStrictEqual(postTypes);
});

it("check loading post types error", () => {
    store.dispatch(loadPostTypesError("Error message"));
    expect(store.getState().postType.postTypes.length).toBe(0);
});