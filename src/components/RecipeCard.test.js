import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { shallow } from 'enzyme';
import setupStore from '../setupStore';
import RecipeCard from './RecipeCard';

describe('RecipeCard component', () => {

  let store;
  let wrapper;
  let component;

  beforeEach(() => {
    store = setupStore();
    wrapper = shallow(<RecipeCard store={store}/>);
    component = wrapper.dive();
  });

  it('should render a Card', () => {

  });

});
