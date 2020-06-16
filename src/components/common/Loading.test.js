import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Loading Component', () => {
  it('should render a Loading', () => {
    const wrapper = shallow(<Loading/ >);
    expect(wrapper).toMatchSnapshot();
  });
});
