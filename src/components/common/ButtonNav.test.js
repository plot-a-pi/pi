import React from 'react';
import { shallow } from 'enzyme';
import ButtonNav from './ButtonNav';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    location: null
  }),
}));

describe('ButtonNav', () => {
  it('should render ButtonNav', () => {
    const wrapper = shallow(<ButtonNav />);
    expect(wrapper).toMatchSnapshot();
  });
});
