import React from 'react';
import { mount } from 'enzyme';
import DataEntryForm from './DataEntryForm';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-socket-io-hooks', () => ({
  useEmitEvent: () => {}, 
  useSocketState: () => {}, 
  useSocket: () => {}
}));

describe('DataEntryForm component', () => {
  it('renders the DataEntryForm', () => {
    const wrapper = mount(
      <BrowserRouter>
        <DataEntryForm />
      </BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

