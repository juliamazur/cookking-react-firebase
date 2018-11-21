import * as React from 'react';
import * as enzyme from 'enzyme';
import TextInput from './TextInput';

it('Input container is displayed', () => {
  const tree = enzyme.shallow(<TextInput/>);
  const container = tree.find({"data-test": 'input'});
  expect(container.length).toEqual(1);
});

describe("TextInput", () => {
  it('should be defined', () => {
    expect(TextInput).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = enzyme.shallow(<TextInput/>);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with props', () => {
    const tree = enzyme.shallow(<TextInput id="test-input" name="Test" value="test-value"/>);
    expect(tree).toMatchSnapshot();
  });
  it('should call mock function on change', () => {
    const mockFn = jest.fn();
    const event = { target: { value: 'the-value' } };
    const tree = enzyme.shallow(<TextInput handleChange={mockFn}/>);
    const container = tree.find({"data-test": 'input'});
    expect(container.length).toEqual(1);
    container.simulate('change', event);
    expect(mockFn).toHaveBeenCalled();
  });
});