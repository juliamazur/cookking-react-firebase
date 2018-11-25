import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

import Header from './components/Header';

describe('Header component', () => {


  it('renders without crashing - shallow', () => {
    shallow(<App />);
  });


  it('renders Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it('Header title contains "cookking" text', function() {
    expect(mount(< Header />).text()).toContain('cookking');
  });

});
