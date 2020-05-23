import {
    loadPostsSuccess, loadMorePostsSuccess, loadPostsError
} from "../../redux/actions/post-actions"
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
    expect(keys[2]).toBe("post");
    expect(store.getState().post.posts).toStrictEqual([]);
});

it("check load posts", () => {
    const posts = [{
        postId: 1,
        date: '2020-05-23T18:29:23.207',
        title: 'A new dance to learn while inside?',
        description: '<p><strong>Russians </strong>are hella <strong>strong </strong>to perform this dance</p>',
        username: 'Eric Leung',
        postType: 'Culture',
        articleUrl: 'https://en.wikipedia.org/wiki/Russian_folk_dance',
        articleBody: '<p><b>Russian folk dance</b> is an important part of Russian culture. ',
        articleTitle: 'Russian folk dance',
        articleImageUrl: 'www.jpg.com',
        numberOfLikes: 2,
        isPostLiked: true,
        isFavourited: false,
        hasMore: true
    }];

    store.dispatch(loadPostsSuccess(posts));

    expect(store.getState().post.posts.length).toBe(1);
    expect(store.getState().post.posts).toStrictEqual(posts);
    expect(store.getState().post.posts[0].postId).toBe(1);
});

it("check load check more posts", () => {
    const posts = [{
        postId: 2,
        date: '2020-05-23T18:29:23.207',
        title: 'A new dance to learn while inside?',
        description: '<p><strong>Nigerians </strong>are hella <strong>strong </strong>to perform this dance</p>',
        username: 'Eric Leung',
        postType: 'Culture',
        articleUrl: 'https://en.wikipedia.org/wiki/Russian_folk_dance',
        articleBody: '<p><b>Nigerian shakku shakku dance</b> is an important part of Nigerian culture. ',
        articleTitle: 'Nigerian shakku shakku dance',
        articleImageUrl: 'www.jpg.com',
        numberOfLikes: 2,
        isPostLiked: true,
        isFavourited: false,
        hasMore: true
    }];

    store.dispatch(loadMorePostsSuccess(posts));

    expect(store.getState().post.posts.length).toBe(1);
    expect(store.getState().post.posts).toStrictEqual(posts);
    expect(store.getState().post.posts[0].postId).toBe(2);
});

it("check load posts on error", () => {
    store.dispatch(loadPostsError("Error message"));

    expect(store.getState().post.posts.length).toBe(0);
});