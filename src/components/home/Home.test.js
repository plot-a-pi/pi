import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {},
  useSocketState: () => ({
    stats:  {
      piApproximationArray: [4, 3, 3.5]
    }
  }),
  useSocket: () => ({
    socket: {
      connected: null
    }
  }),
}));

describe('Stats component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
