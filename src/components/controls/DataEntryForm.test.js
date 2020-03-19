import React from 'react';
import { mount } from 'enzyme';
import DataEntryForm from './DataEntryForm';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => {}, 
  useSocket: () => {}
}));

describe('DataEntryForm component', () => {
  it('renders the DataEntryForm', () => {
    const wrapper = mount(
      <Provider store={store} >
        <BrowserRouter>
          <DataEntryForm />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

