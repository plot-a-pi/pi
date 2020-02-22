import React from 'react';
import { shallow } from 'enzyme';
import MonteCarloGraph from './MonteCarloGraph';

describe('MonteCarloGraph component', () => {
  it('renders MonteCarloGraph', () => {
    const wrapper = shallow(<MonteCarloGraph />);
    expect(wrapper).toMatchSnapshot();
  });
});
