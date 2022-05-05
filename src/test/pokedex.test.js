import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Pokedex from '../components/Pokedex';


describe("Test Pokedex component", () => {
  test('renders Pokedex component', () => {
    render(<Pokedex />);
    const linkElement = screen.getByText(/Pokedex/i);
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

  test('render Pok list container', () => {
    const component = render(<Pokedex />);
    const AdvSearchComp = component.getByTestId('pokListContainer');
    expect(AdvSearchComp).toBeInTheDocument();
  })

})




