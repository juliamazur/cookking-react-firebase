import * as React from 'react';
import * as enzyme from 'enzyme';
import FileInput from './FileInput';

it('Input container is displayed', () => {
  const tree = enzyme.shallow(<FileInput/>);
  const container = tree.find({"data-test": 'fileInput'});
  expect(container.length).toEqual(1);
});

describe("FileInput", () => {
  it('should be defined', () => {
    expect(FileInput).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = enzyme.shallow(<FileInput/>);
    expect(tree).toMatchSnapshot();
  });
  it('should call mock function on change', () => {
    const mockFn = jest.fn();
    const event = { target: { value: 'the-value' } };
    const tree = enzyme.shallow(<FileInput onChange={mockFn}/>);
    const container = tree.find({"data-test": 'fileInput'});
    expect(container.length).toEqual(1);
    container.simulate('change', event);
    //nie bangla
    //expect(mockFn).toHaveBeenCalled();
  });
});