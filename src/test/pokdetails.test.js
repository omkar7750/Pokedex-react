import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import PokDetails from '../components/pokdetails';
import Pokedex from '../components/Pokedex';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import 'whatwg-fetch'
const renderComponent = ({ pokId }) =>
  render(
    <MemoryRouter initialEntries={[`/details/${pokId}`]}>
        <Routes>
            <Route path="/details/:pokId" element={<PokDetails />}>
                
            </Route>
        </Routes>
    </MemoryRouter>
  );

const samplePokmon = {
    "id": 2,
    "num": "002",
    "name": "Ivysaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/002.png",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.99 m",
    "weight": "13.0 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 100,
    "egg": "Not in Eggs",
    "spawn_chance": 0.042,
    "avg_spawns": 4.2,
    "spawn_time": "07:00",
    "multipliers": [
      1.2,
      1.6
    ],
    "weaknesses": [
      "Fire",
      "Ice",
      "Flying",
      "Psychic"
    ],
    "prev_evolution": [{
      "num": "001",
      "name": "Bulbasaur"
    }],
    "next_evolution": [{
      "num": "003",
      "name": "Venusaur"
    }]
  }

describe("Test PokDetails component", () => {
    test('renders PokDetails component', async() => {
      const { getByTestId } = renderComponent({ pokId: 2 });
      const comp = getByTestId('pok-details-container');
      
      expect(comp).toBeInTheDocument();
    })

    test("renders Pokemon's number, name, height and weight component", async() => {
        const { getByTestId, getAllByTestId } = renderComponent({ pokId: 2 });
        
        await waitFor(() => {
            const comp = getByTestId('pok-details-pok-num');
            expect(comp.textContent).toEqual(`#${samplePokmon.num}`);
            expect(getByTestId('pok-details-pok-height').textContent).toEqual(samplePokmon.height);
            expect(getByTestId('pok-details-pok-weight').textContent).toEqual(samplePokmon.weight);
            expect(getAllByTestId(/pok-details-pok-types-/)).toHaveLength(samplePokmon.type.length);
            expect(getAllByTestId(/pok-details-pok-weaknesses-/)).toHaveLength(samplePokmon.weaknesses.length);
        })
    })

    test("renders Pokemon's pre-evolution, current and next evolution", async() => { 
        
        const { getByTestId, getAllByTestId } = renderComponent({ pokId: 2 });
        await waitFor(() => {
            const comp = getAllByTestId(/pokecard-/);
            const countToMatch = (samplePokmon.prev_evolution.length || 0) + 1 + (samplePokmon.next_evolution.length || 0);
            expect(comp).toHaveLength(countToMatch);
        })
    })


})