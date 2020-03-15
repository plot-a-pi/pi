import React from 'react';
import { shallow } from 'enzyme';
import CvsDScatterplot from './CvsDScatterplot';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => ({
    recentUserPoint: {}
  }), 
  useSocket: () => {}
}));

describe('CvsDScatterplot component', () => {
  it('renders CvsDScatterplot', () => {
    const wrapper = shallow(<CvsDScatterplot data={[[1, 2]]} title={'test title'} xLabel={'test x-label'} yLabel={'test y-label'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
