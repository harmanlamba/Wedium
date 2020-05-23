import React from 'react';
import renderer from 'react-test-renderer';

import SearchBar from '../../../components/header/search-bar';

it('snapshot searchBar default load', () => {
  const tree = renderer.create(<SearchBar postType={"People"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
