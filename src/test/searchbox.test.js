import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchBox from '../components/searchbox';



describe("Test SearchBox component", () => {
  test('renders SearchBox component', () => {
    render(<SearchBox />);
    const linkElement = screen.getByText(/Name or Number/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('render child input control', () => {
    const component = render(<SearchBox />);
    const inputCtrl = component.getByTestId('searchbox-input');
    expect(inputCtrl).toHaveAttribute('type','text');
    expect(inputCtrl).toBeInTheDocument();
  })

  test('render search button control', () => {
    const component = render(<SearchBox />);
    const searchbtnCtrl = component.getByText('Search');
    expect(searchbtnCtrl).toBeInTheDocument();
  })

  test('Passed handleMSearch gets called on search click', () => {
    const handleMSearch = jest.fn();
    const component = render(<SearchBox handleMSearch = {handleMSearch} />);
    const searchbtnCtrl = component.getByText('Search');
    fireEvent.click(searchbtnCtrl); 
    expect(handleMSearch).toHaveBeenCalled();
  })

  test('Passed handleMSearch gets called on enter key press on input', () => {
    const handleMSearchkeypress = jest.fn();
    const component = render(<SearchBox handleMSearch = {handleMSearchkeypress} />);
    const inputCtrl = component.getByTestId('searchbox-input');
    fireEvent.keyPress(inputCtrl, {key: "Enter", code: "Enter", charCode: 13}); 
    expect(handleMSearchkeypress).toHaveBeenCalled();
  })

})




