import React from 'react';
import Stats from './Stats';
import { shallow } from 'enzyme';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => {}, 
  useSocket: () => {}
}));

describe('Stats component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Stats />);
    expect(wrapper).toMatchSnapshot(); 
  });
});
