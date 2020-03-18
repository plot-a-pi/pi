import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal component', () => {
  it('renders the Modal', () => {
    const wrapper = shallow(<Modal modalTitle={'test-title'} modalInstructions={{ instructions: 'test instructions' }} showModal={true} toggleModal={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
  });
});

