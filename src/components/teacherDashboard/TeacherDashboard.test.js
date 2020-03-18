import React from 'react';
import { shallow } from 'enzyme';
import TeacherDashboard from './TeacherDashboard';

jest.mock('../../firebase/AuthProvider', () => ({
  useUser: () => {}, 
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => {}, 
}));

describe('TeacherDashboard component', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(<TeacherDashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
