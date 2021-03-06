import React from 'react';
import { Link } from 'react-router-dom';

export default function Pokecard(props) {
  return (
    <li data-testid={`pokecard-${props.id}`} className="li">
      <figure className="pokimg">
        <Link  to={'/details/' + props.id}>
          <img src={props.img} alt={`pok-image`} />
        </Link>
      </figure>
      <div className="pok-info">
        <p data-testid="pokid" className="pok-id">#{props.num}</p>
        <h5 data-testid="pokname" className="pok-name">{props.name}</h5>
        <div className="abilities">
          {props.type.map((t, tindex) => (
            <span
              key={`ability-${tindex}`}
              className="pill background-color-dragon"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}
