import React from 'react';
import { shallow } from 'enzyme';
import CircumferenceVsDiameterGraph from './CircumferenceVsDiameterGraph';

describe('CircumferenceVsDiameterGraph component', () => {
  it('renders CircumferenceVsDiameterGraph', () => {
    const wrapper = shallow(<CircumferenceVsDiameterGraph data={[[1, 2]]} xMax={1} yMax={1}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
