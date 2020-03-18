import React from 'react';
import { shallow } from 'enzyme';
import MonteCarlo from './MonteCarlo';

describe('MonteCarlo component', () => {
  it('renders the MonteCarlo', () => {
    const wrapper = shallow(<MonteCarlo />);
    expect(wrapper).toMatchSnapshot();
  });
});
