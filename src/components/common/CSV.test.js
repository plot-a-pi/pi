import React from 'react';
import { shallow } from 'enzyme';
import CSV from './CSV';

describe('CSV component', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(<CSV csvData={{ data: [[1, 1]] }} header1={'test'} header2={'snapshot'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
