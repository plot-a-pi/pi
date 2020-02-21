import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe('Nav component', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper).toMatchSnapshot();
  });
});
