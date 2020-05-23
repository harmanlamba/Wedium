import React from 'react';
import { shallow } from 'enzyme';

import PostCard from '../../../components/post-feed/post-card';

it('snapshot PostCard default load', () => {
  const posts = [
    {
      articleImageUrl: 'Image URL',
      articleUrl: 'Article URL',
      date: '',
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
    <PostCard.WrappedComponent
      post={posts[0]}
      params={{
        router: setRouteLeaveHook,
      }}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
