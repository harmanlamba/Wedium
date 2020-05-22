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
    expect(keys.length).toBe(5);
    expect(keys[3]).toBe("comment");
    expect(store.getState().comment.comments).toStrictEqual([]);
});

it("check load comments", () => {
    let comments = [{
        body: "This is a comment",
        commentId: 1,
        commentTypeId: 1,
        date: "2020-05-21T21:56:36.933",
        inverseParentComment: [],
        parentCommentId: null,
        postId: 123,
        userId: 123,
        userName: "Bob Shaw",
    }];
    store.dispatch(loadCommentsSuccess(comments));

    expect(store.getState().comment.comments.length).toBe(1);
    expect(store.getState().comment.comments).toStrictEqual(comments);
    expect(store.getState().comment.comments[0].commentId).toBe(1);
});

it("check load child comment", () => {
    let comments = [{
        body: "This is a parent comment",
        commentId: 1,
        commentTypeId: 1,
        date: "2020-05-21T21:56:36.933",
        inverseParentComment: [{
            body: "This is a child comment",
            commentId: 2,
            commentTypeId: 1,
            date: "2020-05-21T21:56:36.933",
            inverseParentComment: [],
            parentCommentId: 1,
            postId: 123,
            userId: 123,
            userName: "Mike Shaw",
        }],
        parentCommentId: null,
        postId: 123,
        userId: 123,
        userName: "Bob Shaw",
    }];
    store.dispatch(loadCommentsSuccess(comments));

    expect(store.getState().comment.comments[0].inverseParentComment.length).toBe(1);
    expect(store.getState().comment.comments[0].inverseParentComment[0]).toStrictEqual(comments[0].inverseParentComment[0]);
    expect(store.getState().comment.comments[0].inverseParentComment[0].commentId).toBe(2);
});

it("check add comment", () => {
    let comments = [{
        body: "This is a comment",
        commentId: 1,
        commentTypeId: 1,
        date: "2020-05-21T21:56:36.933",
        inverseParentComment: [],
        parentCommentId: null,
        postId: 123,
        userId: 123,
        userName: "Bob Shaw",
    }];
    store.dispatch(loadCommentsSuccess(comments));

    // Add comment
    let commentToAdd = {
        body: "This is a comment",
        commentId: 2,
        commentTypeId: 1,
        date: "2020-05-21T21:56:36.933",
        inverseParentComment: [],
        parentCommentId: null,
        postId: 123,
        userId: 123,
        userName: "Billy Shaw",
    };
    store.dispatch(addComment(commentToAdd));

    expect(store.getState().comment.comments.length).toBe(2)
    expect(store.getState().comment.comments[0]).toStrictEqual(commentToAdd);
});

it("check add child comment", () => {
    let comments = [{
        body: "This is a comment",
        commentId: 1,
        commentTypeId: 1,
        date: "2020-05-21T21:56:36.933",
        inverseParentComment: [],
        parentCommentId: null,
        postId: 123,
        userId: 123,
        userName: "Bob Shaw",
    }];
    store.dispatch(loadCommentsSuccess(comments));

    // Add comment
    let childCommentToAdd = {
        body: "This is a comment",
        commentId: 2,
        commentTypeId: 1,
        date: "2020-05-21T21:56:36.933",
        inverseParentComment: [],
        parentCommentId: 1,
        postId: 123,
        userId: 123,
        userName: "Billy Shaw",
    };
    store.dispatch(addComment(childCommentToAdd));

    expect(store.getState().comment.comments.length).toBe(1)
    expect(store.getState().comment.comments[0].inverseParentComment.length).toBe(1)
    expect(store.getState().comment.comments[0].inverseParentComment[0]).toStrictEqual(childCommentToAdd)
});

it("check load comment on error", () => {
    // TODO
});