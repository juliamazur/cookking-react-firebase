import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { shallow } from 'enzyme';

import App from './App';
import setupStore from './setupStore';

import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

describe('RecipeList component', () => {

  let store;
  let wrapper;
  let component;

  beforeEach(() => {
    store = setupStore();
    wrapper = shallow(<App />);
  });

  it('renders without crashing - shallow', () => {
    shallow(<App />);
  });

  it('renders without crashing - deep', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Provider store={store}>
        <App />
     </Provider>
    , div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders Header component', () => {
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it('Header title is h2 with "cookking" text', function() {
    expect(mount(< Header />).find('h2').text()).toBe('cookking');
  });

  it('renders RecipeList component', () => {
    expect(wrapper.contains(<RecipeList />)).toBe(true);
  });

  it('renders RecipeForm component', () => {
      expect(wrapper.contains(<RecipeForm />)).toBe(true);
  });
});
