import React from 'react';
import { shallow } from 'enzyme';

import RecipeForm from './RecipeForm';
import * as enzyme from "enzyme/build/index";


  it('RecipeForm renders without crashing - shallow', () => {
    shallow(<RecipeForm />);
  });

  describe("RecipeForm component", () => {
    it('should be defined', () => {
      expect(RecipeForm).toBeDefined();
    });
    it('should render correctly', () => {
      const wrapper = enzyme.shallow(<RecipeForm/>);
      expect(wrapper).toMatchSnapshot();
    });
    it('handleInputChange changes state', () => {
      const event = { target: { value: 'testValue', name: 'testName' } };
      const wrapper = enzyme.shallow(<RecipeForm/>);
      const instance = wrapper.dive().instance();
      instance.handleInputChange(event);
      expect(instance.state.testName).toBe('testValue');
    });
    it('contains name input', () => {
      const wrapper = enzyme.mount(<RecipeForm/>);
      const nameInput = wrapper.find({"data-test": 'nameInput'});
      expect(nameInput.length).toEqual(1);
    });
    it('contains description input', () => {
      const wrapper = enzyme.mount(<RecipeForm/>);
      const nameInput = wrapper.find({"data-test": 'descInput'});
      expect(nameInput.length).toEqual(1);
    });
  });
