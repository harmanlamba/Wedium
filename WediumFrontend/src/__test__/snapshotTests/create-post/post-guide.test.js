import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PostGuide from '../../../components/create-post/post-guide';

it('snapshot postGuide default load', () => {
  const tree = renderer.create(<PostGuide />).toJSON();
  expect(tree).toMatchSnapshot();
});
