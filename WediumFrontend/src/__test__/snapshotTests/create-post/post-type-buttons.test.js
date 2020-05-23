import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PostTypeButtons from '../../../components/create-post/post-type-buttons';

it('snapshot postTypeButtons default load', () => {
  const setRouteLeaveHook = jest.fn();

  let wrapper = shallow(
    <PostTypeButtons.WrappedComponent
      params={{
        router: setRouteLeaveHook,
      }}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
