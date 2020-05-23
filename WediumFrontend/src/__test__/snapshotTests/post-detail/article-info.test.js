import React from 'react';
import { shallow } from 'enzyme';

import ArticleInfo from '../../../components/post-detail/article-info';

it('snapshot articleInfo default load', () => {
  const post = {
    articleTitle: 'Title',
    articleBody: 'Body',
    articleImageUrl: 'Image',
  };

  let wrapper = shallow(<ArticleInfo post={post} />);

  expect(wrapper).toMatchSnapshot();
});

it('snapshot postform load with missing image', () => {
  const MISSING_IMAGE_URL =
    'https://image.flaticon.com/icons/svg/570/570975.svg';

  const post = {
    articleTitle: 'Title',
    articleBody: '<p>Body</p>',
    articleImageUrl: MISSING_IMAGE_URL,
  };

  let wrapper = shallow(<ArticleInfo post={post} />);

  expect(wrapper).toMatchSnapshot();
});
