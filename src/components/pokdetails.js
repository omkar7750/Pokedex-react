import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pokecard from './pokecard';

import config from '../config.js';

export default function PokDetails() {
  let { pokId } = useParams();
  const [pok, setPok] = useState({});
  const [prev_evolution, setPrev_evolution] = useState([]);
  const [next_evolution, setNext_evolution] = useState([]);

  useEffect(() => {
    fetch(config.dataUrl)
      .then((response) => response.json())
      .then((json) => {
        setPrev_evolution([]);
        setNext_evolution([]);
        let selectedPok = json.pokemon.find((pok) => pok.id == pokId);

        if (selectedPok.prev_evolution && selectedPok.prev_evolution.length) {
          let prevEvolutionNumArr = selectedPok.prev_evolution.map(
            (po) => po.num
          );

          let preEvolution = json.pokemon.filter((pok) =>
            prevEvolutionNumArr.includes(pok.num)
          );
          setPrev_evolution(preEvolution);
        }

        if (selectedPok.next_evolution && selectedPok.next_evolution.length) {
          let nextEvolutionNumArr = selectedPok.next_evolution.map(
            (po) => po.num
          );

          let nextEvolution = json.pokemon.filter((pok) =>
            nextEvolutionNumArr.includes(pok.num)
          );
          setNext_evolution(nextEvolution);
        }

        setPok(selectedPok);
      });
  }, [pokId]);

  return (
    <div>
      <div>
        <div id="pokIdName">
          {pok.name}
          <span className="pokemon-number">#{pok.num}</span>
        </div>
        <section className="section pokedex-pokemon-details">
          <div className="column-6 push-1">
            <div className="pokedex-pokemon-profile">
              <div className="profile-images">
                <img className="active" src={pok.img} alt={pok.name} />
              </div>
            </div>

            <div className="abilities">
              <div className="height-weight">
                <div>
                  <div className="pokdetails-cat-title">Height</div>
                  <div>{pok.height}</div>
                </div>
                <div>
                  <div className="pokdetails-cat-title">Weight</div>
                  <div>{pok.weight}</div>
                </div>
              </div>

              <div className="pokdetails-cat-title">Type</div>
              {pok.type &&
                pok.type.map((t) => (
                  <span className="pill background-color-dragon">{t}</span>
                ))}

              <div className="pokdetails-cat-title">Weaknesses</div>
              {pok.weaknesses &&
                pok.weaknesses.map((t) => (
                  <span className="pill background-color-dragon">{t}</span>
                ))}
            </div>
          </div>
          <div className="evolution-container">
            <div className="evolution-title">Evolution</div>
            <div className="evolution-cards">
              <ul>
                {prev_evolution && prev_evolution.length ? (
                  prev_evolution.map((prePok) => {
                    return <Pokecard {...prePok} />;
                  })
                ) : (
                  <></>
                )}
                {pok && pok.type && <Pokecard {...pok} />}
                {next_evolution && next_evolution.length ? (
                  next_evolution.map((prePok) => {
                    return <Pokecard {...prePok} />;
                  })
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
          <Link to={'/'}>
            <button id="msearchbtn">Back To Home</button>
          </Link>
        </section>
      </div>
    </div>
  );
}
