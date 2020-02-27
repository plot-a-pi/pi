import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => {}, 
  useSocket: () => {}
}));
describe('App component', () => {
  it('renders App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
