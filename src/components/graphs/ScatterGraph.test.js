import React from 'react';
import { shallow } from 'enzyme';
import ScatterGraph from './ScatterGraph';

describe('ScatterGraph component', () => {
  it('renders ScatterGraph', () => {
    const wrapper = shallow(<ScatterGraph />);
    expect(wrapper).toMatchSnapshot();
  });
});
