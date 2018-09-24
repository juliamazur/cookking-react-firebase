import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { shallow } from 'enzyme';
import setupStore from '../setupStore';
import RecipeForm from './RecipeForm';

describe('RecipeForm component', () => {

  let store;
  let wrapper;
  let component;

  beforeEach(() => {
    store = setupStore();
    wrapper = shallow(<RecipeForm store={store}/>);
    component = wrapper.dive();
  });

  it('should render a placeholder', () => {
    expect(component.find('.recipe-form-placeholder').exists()).toBe(true);
  });

});
