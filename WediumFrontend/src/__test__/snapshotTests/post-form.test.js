import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PostForm from '../../components/create-post/post-form';

it('snapshot with no content matches', () => {
  const setRouteLeaveHook = jest.fn();

  let wrapper = shallow(
    <PostForm.WrappedComponent params={{ router: setRouteLeaveHook }} />
  );

  expect(wrapper).toMatchSnapshot();
});
