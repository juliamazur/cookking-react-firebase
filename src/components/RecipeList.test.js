import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { shallow } from 'enzyme';
import setupStore from '../setupStore';
import RecipeList from './RecipeList';

describe('RecipeList component', () => {

  let store;
  let wrapper;
  let component;

  beforeEach(() => {
    store = setupStore();
    wrapper = shallow(<RecipeList store={store}/>);
    component = wrapper.dive();
  });

  it('should render a placeholder', () => {
    expect(component.find('.recipe-list-placeholder').exists()).toBe(true);
  });

  // it('should execute renderRecipies', () => {
  //   const renderRecipies = jest.fn();
  //   const wrapperWithFn = shallow(<RecipeList store={store} renderRecipies={renderRecipies}/>);
  //   const componentWithFn = wrapperWithFn.dive();
  //   expect(renderRecipies).toHaveBeenCalledTimes(1);
  // });

});
