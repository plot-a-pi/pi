import React from 'react';
import { shallow } from 'enzyme';
import TeacherSessions from './TeacherSessions';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => ({
    recentUserPoint: {},
    sessions: []
  }), 
  useSocket: () => ({
    socket: {
      connected: null
    }
  }),
}));

jest.mock('../../firebase/AuthProvider', () => ({
  useUser: () => ({
    displayName: 'test-display-name'
  }), 
}));

describe('TeacherSessions component', () => {
  it('renders the TeacherSessions', () => {
    const wrapper = shallow(<TeacherSessions />);
    expect(wrapper).toMatchSnapshot();
  });
});
