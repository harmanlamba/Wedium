import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PostDetailInfo from '../../../components/post-detail/post-detail-info';

it('snapshot postDetailInfo default load', () => {
  const posts = [
    {
      articleImageUrl: 'Image URL',
      articleUrl: 'Article URL',
      date: '2020-05-21T21:55:24.33',
      description: 'Post Description',
      isFavourited: false,
      isPostLiked: false,
      numberOfLikes: 2,
      postId: 3028,
      postType: 'Culture',
      title: 'Post Title',
      username: 'Bob Bobby',
    },
  ];

  const setRouteLeaveHook = jest.fn();

  let wrapper = shallow(
    <PostDetailInfo.WrappedComponent
      posts={posts}
      post={posts[0]}
      params={{
        router: setRouteLeaveHook,
      }}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
