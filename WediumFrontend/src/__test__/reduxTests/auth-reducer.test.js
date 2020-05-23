import {
    login,
    logout,
} from "../../redux/actions/auth-actions";
import rootReducer from "../../redux/reducers";
import {
    createStore
} from "redux";

let store;

beforeEach(() => {
    store = createStore(rootReducer);
})

it("check initial store state", () => {
    const initialUserState = {
        firstName: null,
        isAuthenticated: false,
        lastName: null,
        pictureUri: null,
        user: null,
        username: null,
    }

    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(5);
    expect(keys[0]).toBe("auth");
    expect(store.getState().auth).toStrictEqual(initialUserState);
});

it("check user login success state", () => {
    const user = {
        firstName: "Bob",
        isAuthenticated: true,
        jwtToken: "jwtToken",
        lastName: "Jenkins",
        pictureUri: "somePhoto",
        username: "Bob Jenkins"
    }
    store.dispatch(login(user));

    expect(store.getState().auth).toBeTruthy();
    expect(store.getState().auth.isAuthenticated).toBe(true);
    expect(store.getState().auth.username).toBe(user.username);
    expect(store.getState().auth.user).toBe(user.jwtToken);
});

it("check user logout success state", () => {
    const user = {
        firstName: "Bob",
        isAuthenticated: true,
        jwtToken: "jwtToken",
        lastName: "Jenkins",
        pictureUri: "somePhoto",
        username: "Bob Jenkins"
    }
    store.dispatch(login(user));

    store.dispatch(logout());

    expect(store.getState().auth).toBeTruthy();
    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(store.getState().auth.user).toBe("");
});