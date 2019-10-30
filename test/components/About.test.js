import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import About from '../../example/components/About';

configure({ adapter: new Adapter() });

describe(`<About />`, () => {
  it('1. Should has a h2', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('h2').length).toBe(1);
  });
});
