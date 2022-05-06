import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Pokedex from '../components/Pokedex';
import { BrowserRouter } from 'react-router-dom';
import 'whatwg-fetch'

describe("Test Pokedex component", () => {
  test('renders Pokedex component', () => {
    render(<Pokedex />);
    const linkElement = screen.getByText(/Pokédex/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('render SearchBox child component', () => {
    const component = render(<Pokedex />);
    const searchboxComp = component.getByLabelText('Name or Number');
    expect(searchboxComp).toBeInTheDocument();
  })

  test('render AdvancedSearch child component', () => {
    const component = render(<Pokedex />);
    const AdvSearchComp = component.getByText('Show Advanced Search');
    expect(AdvSearchComp).toBeInTheDocument();
  })

  test('render Pok list container', async() => {
    const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
    await waitFor(() =>{ 
      expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    })
    
  })

  test('Test searchbox filtering', async() => {
    const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
    
    await waitFor(() =>{
      const inputCtrl = component.getByTestId('searchbox-input');
      fireEvent.change(inputCtrl, {target: {value: 'char'}});
      const searchboxSearchbtn = component.getByTestId('searchboxSearchbtn');
      fireEvent.click(searchboxSearchbtn);
      expect(component.getAllByAltText('pok-image')).toHaveLength(3);

    });
  })

  test('Test advanced search and reset functionality', async() => {
    const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
  
    await waitFor(() =>{
      const advSearchAccordion = component.getByTestId('advancedSearch');
      fireEvent.click(advSearchAccordion);
      fireEvent.click(component.getByTestId('type-Flying'));
      fireEvent.click(component.getByTestId('type-Fire'));
      fireEvent.click(component.getByTestId('advSearchBtn'));
      expect(component.getAllByAltText('pok-image')).toHaveLength(2);

      fireEvent.click(component.getByTestId('resetBtn'));
      expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    });
  })

  test('Test combination of adv. search , reset and searchbox filter', async() => {
    const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
  
    await waitFor(() =>{

      const inputCtrl = component.getByTestId('searchbox-input');
      fireEvent.change(inputCtrl, {target: {value: 'char'}});
      const searchboxSearchbtn = component.getByTestId('searchboxSearchbtn');
      fireEvent.click(searchboxSearchbtn);
      expect(component.getAllByAltText('pok-image')).toHaveLength(3);

      const advSearchAccordion = component.getByTestId('advancedSearch');
      fireEvent.click(advSearchAccordion);
      fireEvent.click(component.getByTestId('type-Flying'));
      fireEvent.click(component.getByTestId('type-Fire'));
      fireEvent.click(component.getByTestId('advSearchBtn'));
      expect(component.getAllByAltText('pok-image')).toHaveLength(1);

      fireEvent.change(inputCtrl, {target: {value: ''}});
      fireEvent.click(searchboxSearchbtn);
      expect(component.getAllByAltText('pok-image')).toHaveLength(2);

      fireEvent.change(inputCtrl, {target: {value: 'char'}});
      fireEvent.click(searchboxSearchbtn);
      fireEvent.click(component.getByTestId('resetBtn'));
      expect(component.getAllByAltText('pok-image')).toHaveLength(3);

      fireEvent.change(inputCtrl, {target: {value: ''}});
      fireEvent.click(searchboxSearchbtn);
      expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    });
  })

})




