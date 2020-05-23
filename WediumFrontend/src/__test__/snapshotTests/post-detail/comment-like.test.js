import React from 'react';
import { shallow } from 'enzyme';

import CommentLike from '../../../components/post-detail/comment/comment-like';

it('snapshot commentLike default load', () => {
  const user = 1;
  const numberOfLikes = 0;
  const commentId = 1;
  const parentCommentId = null;
  const isCommentLiked = false;

  let wrapper = shallow(
    <CommentLike
      user={user}
      numberOfLikes={numberOfLikes}
      commentId={commentId}
      parentCommentId={parentCommentId}
      isCommentLiked={isCommentLiked}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('snapshot commentLike for child comment load', () => {
  const user = 1;
  const numberOfLikes = 0;
  const commentId = 2;
  const parentCommentId = 1;
  const isCommentLiked = false;

  let wrapper = shallow(
    <CommentLike
      user={user}
      numberOfLikes={numberOfLikes}
      commentId={commentId}
      parentCommentId={parentCommentId}
      isCommentLiked={isCommentLiked}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('snapshot commentLike with liked component load', () => {
  const user = 1;
  const numberOfLikes = 5;
  const commentId = 2;
  const parentCommentId = 1;
  const isCommentLiked = true;

  let wrapper = shallow(
    <CommentLike
      user={user}
      numberOfLikes={numberOfLikes}
      commentId={commentId}
      parentCommentId={parentCommentId}
      isCommentLiked={isCommentLiked}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
