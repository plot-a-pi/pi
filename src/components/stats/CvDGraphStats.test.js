import React from 'react';
import { shallow } from 'enzyme';
import CvDGraphStats from './CvDGraphStats';

describe('CvDGraphStats component', () => {
  it('renders the CvDGraphStats', () => {
    const wrapper = shallow(<CvDGraphStats stats={{ mean: 3, count: 10 }}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
