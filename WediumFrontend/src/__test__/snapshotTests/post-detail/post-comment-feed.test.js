import React from 'react';
import renderer from 'react-test-renderer';
import {
  shallow
} from 'enzyme';

import PostCommentFeed from '../../../components/post-detail/comment/post-comment-feed';

it('snapshot postCommentFeed default load', () => {
  const user = {
    firstName: 'null',
    isAuthenticated: false,
    jwtToken: 'null',
    lastName: 'null',
    pictureUri: 'null',
    username: 'null',
  };

  const comments = [];

  const setRouteLeaveHook = jest.fn();

  let wrapper = shallow( <
    PostCommentFeed.WrappedComponent user = {
      user
    }
    comments = {
      comments
    }
    params = {
      {
        router: setRouteLeaveHook,
      }
    }
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('snapshot postCommentFeed with comments load', () => {
  const user = {
    firstName: 'null',
    isAuthenticated: false,
    jwtToken: 'null',
    lastName: 'null',
    pictureUri: 'null',
    username: 'null',
  };

  const comments = [{
    body: 'This is a comment',
    commentId: 1,
    commentTypeId: 1,
    date: '2020-05-21T21:56:36.933',
    inverseParentComment: [],
    parentCommentId: null,
    postId: 123,
    userId: 123,
    userName: 'Bob Shaw',
  }, ];

  const setRouteLeaveHook = jest.fn();

  let wrapper = shallow( <
    PostCommentFeed.WrappedComponent user = {
      user
    }
    comments = {
      comments
    }
    params = {
      {
        router: setRouteLeaveHook,
      }
    }
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('snapshot postCommentFeed with user authenticated load', () => {
  const user = {
    firstName: 'Bob',
    isAuthenticated: true,
    jwtToken: 'jwtToken',
    lastName: 'Jenkins',
    pictureUri: 'somePhoto',
    username: 'Bob Jenkins',
  };

  const comments = [{
    body: 'This is a comment',
    commentId: 1,
    commentTypeId: 1,
    date: '2020-05-21T21:56:36.933',
    inverseParentComment: [],
    parentCommentId: null,
    postId: 123,
    userId: 123,
    userName: 'Bob Shaw',
  }, ];

  const setRouteLeaveHook = jest.fn();

  let wrapper = shallow( <
    PostCommentFeed.WrappedComponent user = {
      user
    }
    comments = {
      comments
    }
    params = {
      {
        router: setRouteLeaveHook,
      }
    }
    />
  );

  expect(wrapper).toMatchSnapshot();
});