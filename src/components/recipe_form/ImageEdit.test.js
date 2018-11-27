import * as React from 'react';
import * as enzyme from 'enzyme';
import ImageEdit from './ImageEdit';


describe("ImageEdit", () => {
  it('should be defined', () => {
    expect(ImageEdit).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = enzyme.shallow(<ImageEdit/>);
    expect(tree).toMatchSnapshot();
  });
  it('should call mock function on click', () => {
    const mockFn = jest.fn();
    const event = { target: { value: 'the-value' } };
    const tree = enzyme.shallow(<ImageEdit onClick={mockFn}/>);
    tree.simulate('click', event);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  //e2e
  
});