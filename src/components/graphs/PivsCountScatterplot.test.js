import React from 'react';
import { shallow } from 'enzyme';
import PivsCountScatterplot from './PivsCountScatterplot';

describe('PivsCountScatterplot component', () => {
  it('renders PivsCountScatterplot', () => {
    const wrapper = shallow(<PivsCountScatterplot data={[[1, 2]]} title={'test title'} xLabel={'test x-label'} yLabel={'test y-label'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
