import React from 'react';
import { shallow } from 'enzyme';
import DataEntryForm from './DataEntryForm';

describe('DataEntryForm component', () => {
  it('renders the DataEntryForm', () => {
    const wrapper = shallow(<DataEntryForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

