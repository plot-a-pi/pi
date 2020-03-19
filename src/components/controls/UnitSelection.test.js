import React from 'react';
import { mount } from 'enzyme';
import UnitSelection from './UnitSelection';
import { Provider } from 'react-redux';
import store from '../../store';

describe('UnitSelection component', () => {
  it('renders the UnitSelection component', () => {
    const wrapper = mount(
      <Provider store={store} >
        <UnitSelection />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
