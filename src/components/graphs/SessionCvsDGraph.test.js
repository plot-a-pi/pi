import React from 'react';
import { shallow } from 'enzyme';
import SessionCvsDGraph from './SessionCvsDGraph';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => ({
    recentUserPoint: {}
  }), 
  useSocket: () => ({
    socket: {
      connected: null
    }
  }),
}));

describe('SessionCvsDGraph component', () => {
  it('renders SessionCvsDGraph', () => {
    const wrapper = shallow(<SessionCvsDGraph match={{ params: { id: '1' } }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
