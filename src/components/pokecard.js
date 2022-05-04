import React from 'react';
import { Link } from 'react-router-dom';

export default function Pokecard(props) {
  return (
    <li className="li">
      <figure className="pokimg">
        <Link to={'/details/' + props.id}>
          <img src={props.img} />
        </Link>
      </figure>
      <div className="pok-info">
        <p className="pok-id">#{props.num}</p>
        <h5 className="pok-name">{props.name}</h5>
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
