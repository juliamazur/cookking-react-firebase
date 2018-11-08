import * as React from 'react';
import * as enzyme from 'enzyme';
import Input from './Input';

it('Input container is displayed', () => {
  const tree = enzyme.shallow(<Input/>);
  const container = tree.find({"data-test": 'input'});
  expect(container.length).toEqual(1);
});

describe("Input", () => {
  it('should be defined', () => {
    expect(Input).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = enzyme.shallow(<Input/>);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with props', () => {
    const tree = enzyme.shallow(<Input id="test-input" name="Test" value="test-value"/>);
    expect(tree).toMatchSnapshot();
  });
  it('should call mock function on change', () => {
    const mockFn = jest.fn();
    const event = { target: { value: 'the-value' } };
    const tree = enzyme.shallow(<Input handleChange={mockFn}/>);
    const container = tree.find({"data-test": 'input'});
    expect(container.length).toEqual(1);
    container.simulate('change', event);
    expect(mockFn).toHaveBeenCalled();
  });
});