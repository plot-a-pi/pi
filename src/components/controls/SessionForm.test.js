import React from 'react';
import { mount } from 'enzyme';
import SessionForm from './SessionForm';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => {}, 
  useSocket: () => {}
}));

describe('SessionForm component', () => {
  it('renders the SessionForm', () => {
    const wrapper = mount(
      <BrowserRouter>
        <SessionForm match={{ params: 'test params' }}/>
      </BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
