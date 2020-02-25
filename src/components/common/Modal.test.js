import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal component', () => {
  it('renders the Modal', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });
});

