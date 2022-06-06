import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';

import  config from '../config';
const {links: {pokedex, gallary}} = config;


export default function PokHome(props) {
  return (
    <div className='pokhome'>
        <div className='pokhome-heading'>welcome to <div className='pokhome-title'><span>Pokemon </span><span className='secpart'>World</span></div></div>
        <div className='pokhome-nav'>
          <Link id="pokdexLink" data-testid={`link-pokdex`} to={pokedex.url}>{pokedex.label}</Link>
          <Link id="gallaryLink" data-testid={`link-pokdex`} to={gallary.url}>{gallary.label}</Link>
        </div>
        <div className='pokhome-desc-footer-container'>
          <div className='pokhome-description'>{config.pokHomeDescription}</div>
        </div>
        <Footer />
    </div>
  );
}
