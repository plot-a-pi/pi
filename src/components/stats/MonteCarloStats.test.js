import React from 'react';
import { shallow } from 'enzyme';
import MonteCarloStats from './MonteCarloStats';

describe('MonteCarloStats component', () => {
  it('renders the MonteCarloStats', () => {
    const wrapper = shallow(<MonteCarloStats piApproximation={3} dartsTotal={10} circleTotal={5} />);
    expect(wrapper).toMatchSnapshot();
  });
});
