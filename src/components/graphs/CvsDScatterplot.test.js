import React from 'react';
import { shallow } from 'enzyme';
import CvsDScatterplot from './CvsDScatterplot';
import { Provider } from 'react-redux';
import store from '../../store';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => ({
    recentUserPoint: {}
  }), 
  useSocket: () => {}
}));

describe('CvsDScatterplot component', () => {
  it('renders CvsDScatterplot', () => {
    const wrapper = shallow(
      <Provider store={store} >
        <CvsDScatterplot data={[{ circumferene: 3.14, diameter: 1, circumferenceUnit: 'cm' }]} title={'test title'} xLabel={'test x-label'} yLabel={'test y-label'} stats={{}} line={true} />
      </Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
