import React from 'react';
import renderer from 'react-test-renderer';
import {
  shallow
} from 'enzyme';

import PostForm from '../../../components/create-post/post-form';

it('snapshot postform default load', () => {
  const setRouteLeaveHook = jest.fn();

  let wrapper = shallow( <
    PostForm.WrappedComponent params = {
      {
        router: setRouteLeaveHook,
      }
    }
    />
  );

  expect(wrapper).toMatchSnapshot();
});