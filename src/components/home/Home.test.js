import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';
describe('Home component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot(); 
  });
});
