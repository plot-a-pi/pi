import React from 'react';
import { shallow } from 'enzyme';
import PiCrawler from './PiCrawler';

describe('PiCrawler Component', () => {
  it('should render a PiCrawler', () => {
    const wrapper = shallow(<PiCrawler/ >);
    expect(wrapper).toMatchSnapshot();
  });
});
