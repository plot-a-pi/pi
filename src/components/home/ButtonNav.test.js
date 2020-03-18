import React from 'react';
import { shallow } from 'enzyme';
import ButtonNav from './ButtonNav';

describe('ButtonNav Component', () => {
  it('should render a ButtonNav', () => {
    const wrapper = shallow(<ButtonNav/ >);
    expect(wrapper).toMatchSnapshot();
  });
});
