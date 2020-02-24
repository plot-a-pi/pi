import React from 'react';
import { shallow } from 'enzyme';
import MonteCarloDartsGraph from './MonteCarloDartsGraph';

describe('MonteCarloDartsGraph component', () => {
  it('renders MonteCarloGraph', () => {
    const wrapper = shallow(<MonteCarloDartsGraph />);
    expect(wrapper).toMatchSnapshot();
  });
});
