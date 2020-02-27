import React from 'react';
import { shallow } from 'enzyme';
import ButtonNav from './ButtonNav';

describe('ButtonNav', () => {
  it('should render ButtonNav', () => {
    const wrapper = shallow(<ButtonNav />);
    expect(wrapper).toMatchSnapshot();
  });
});
