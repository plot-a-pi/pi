import React from 'react';
import { shallow } from 'enzyme';
import Scatterplot from './Scatterplot';

describe('Scatterplot component', () => {
  it('renders Scatterplot', () => {
    const wrapper = shallow(<Scatterplot data={[[1, 2]]} xMax={1} yMax={1}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
