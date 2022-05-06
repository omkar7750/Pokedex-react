import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import PokeCard from '../components/pokecard';
import { BrowserRouter } from 'react-router-dom';
import 'whatwg-fetch'
const samplePokmon = {
    "id": 1,
    "num": "001",
    "name": "Bulbasaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.71 m",
    "weight": "6.9 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 25,
    "egg": "2 km",
    "spawn_chance": 0.69,
    "avg_spawns": 69,
    "spawn_time": "20:00",
    "multipliers": [1.58],
    "weaknesses": [
      "Fire",
      "Ice",
      "Flying",
      "Psychic"
    ],
    "next_evolution": [{
      "num": "002",
      "name": "Ivysaur"
    }, {
      "num": "003",
      "name": "Venusaur"
    }]
  }

describe("Test PokeCard component", () => {
  test('renders PokeCard component', () => {
    let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    const linkElement = component.getByTestId(`pokecard-${samplePokmon.id}`); 
    expect(linkElement).toBeInTheDocument();
    
  })

  test('renders Pok image in the rendered component', () => {
    let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    const linkElement = component.getByAltText(`pok-image`); 
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('src', samplePokmon.img);
  })

  test('renders passed pok name', () => {
    let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    const linkElement = component.getByTestId(`pokname`); 
    expect(linkElement.textContent).toEqual(samplePokmon.name);
    
  })

  test('renders passed pok number', () => {
    let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    const linkElement = component.getByTestId(`pokid`); 
    expect(linkElement.textContent).toEqual(`#${samplePokmon.num}`);
  })

  test('renders pok types for current pokemon', () => {
    let component = render(<BrowserRouter><PokeCard {...samplePokmon } /></BrowserRouter>);
    const linkElement1 = component.getByText(samplePokmon.type[0]); 
    expect(linkElement1).toBeInTheDocument();

    const linkElement2 = component.getByText(samplePokmon.type[1]); 
    expect(linkElement2).toBeInTheDocument();
  })
  
})