import React from 'react';
import { shallow } from 'enzyme';

import RecipeForm from './RecipeForm';

describe('RecipeForm component', () => {


  it('renders without crashing - shallow', () => {
    shallow(<RecipeForm />);
  });

  it('renders without crashing - shallow', () => {

  });

  //
  // it('renders Header component', () => {
  //   const wrapper = shallow(<App />);
  //   expect(wrapper.contains(<Header />)).toBe(true);
  // });
  //
  // it('Header title is h2 with "cookking" text', function() {
  //   expect(mount(< Header />).find('h2').text()).toBe('cookking');
  // });

});
