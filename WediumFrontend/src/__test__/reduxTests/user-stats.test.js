import { 
    loadUserStatsError, 
    loadUserStatsSuccess 
} from "../../redux/actions/user-stats-actions";
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
    expect(keys[4]).toBe("userStats");

    const initUserStats = ({
        createPostCount: null,
        favouritePostCount: null,
    });

    expect(store.getState().userStats).toStrictEqual(initUserStats);
});

it("check load user stats", () => {
    const userStats = ({
        createPostCount: 2,
        favouritePostCount: 5,
        userStatsLoading: false,
        postLikeCount: 4
    });

    store.dispatch(loadUserStatsSuccess(userStats));
    expect(store.getState().userStats).toStrictEqual(userStats);
});

it("check load user stats on error", () => {
    store.dispatch(loadUserStatsError("Error message"));

    const userStatsErrorState = ({
        createPostCount: null,
        favouritePostCount: null,
        favouritePostCount: null,
        userStatsLoading: false
    });

    expect(store.getState().userStats).toStrictEqual(userStatsErrorState);
});