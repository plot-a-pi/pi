import React from 'react';
import { shallow } from 'enzyme';
import MonteCarloControls from './MonteCarloControls';

describe('MonteCarloControls component', () => {
  it('renders the MonteCarloControls', () => {
    const wrapper = shallow(<MonteCarloControls actions={[{ name: 'test-name', text: 'test-text', actionCreator: () => {} }]}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
