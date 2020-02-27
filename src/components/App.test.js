import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import { SocketProvider } from 'react-socket-io-hooks';

describe('App component', () => {
  it('renders App', () => {
    const wrapper = mount(
      <SocketProvider>
        <App />
      </SocketProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
