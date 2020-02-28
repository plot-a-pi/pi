import React from 'react';
import { shallow } from 'enzyme';
import CircumferenceVsDiameterGraph from './CircumferenceVsDiameterGraph';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => ({
    recentUserPoint: {}
  }), 
  useSocket: () => {}
}));

describe('CircumferenceVsDiameterGraph component', () => {
  it('renders CircumferenceVsDiameterGraph', () => {
    const wrapper = shallow(<CircumferenceVsDiameterGraph data={[[1, 2]]} xMax={1} yMax={1}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
