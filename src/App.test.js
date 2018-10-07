import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

import Header from './components/Header';

describe('Header component', () => {


  it('renders without crashing - shallow', () => {
    shallow(<App />);
  });


  it('renders Header component', () => {
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it('Header title is h2 with "cookking" text', function() {
    expect(mount(< Header />).find('h2').text()).toBe('cookking');
  });

});
