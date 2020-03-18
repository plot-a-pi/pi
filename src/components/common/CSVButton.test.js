import React from 'react';
import { shallow } from 'enzyme';
import CSVButton from './CSVButton';

describe('CSVButton component', () => {
  it('matches a snapshot', () => {
    const wrapper = shallow(<CSVButton data={[{ x: 1, y: 2 }]} header1={'test header 1'} header2={'test header 2'}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
