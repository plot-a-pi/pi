import React from 'react';
import { shallow } from 'enzyme';
import Scatterplot from './Scatterplot';

describe('Scatterplot component', () => {
  it('renders Scatterplot', () => {
    const wrapper = shallow(<Scatterplot />);
    expect(wrapper).toMatchSnapshot();
  });
});
