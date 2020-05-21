import React from 'react';
import renderer from 'react-test-renderer';
import PostForm from '../../components/create-post/post-form';
import { MemoryRouter } from 'react-router-dom';

it('snapshot with no content matches', () => {
  const tree = renderer
    .create(
      <MemoryRouter keyLength={0}>
        <PostForm />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
