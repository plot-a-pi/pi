import React from 'react';
import { shallow } from 'enzyme';
import ScatterGraph from './ScatterGraph';

describe('ScatterGraph component', () => {
  it('renders ScatterGraph', () => {
    const wrapper = shallow(<ScatterGraph data={[[1, 2]]} xMax={1} xLabel={'sample x-label'} yMax={1} yLabel={'sample y-label'} title={'sample title'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
