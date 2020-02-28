import React from 'react';
import { shallow } from 'enzyme';
import ButtonNav from './ButtonNav';

jest.mock('../../firebase/AuthProvider.js', () => ({
  useUser: () => {},
}));

describe('ButtonNav', () => {
  it('should render ButtonNav', () => {
    const wrapper = shallow(<ButtonNav />);
    expect(wrapper).toMatchSnapshot();
  });
});
