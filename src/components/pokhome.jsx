import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import Footer from './footer';


export default function PokHome(props) {
  return (
    <div className='pokhome'>
        <div className='pokhome-heading'>welcome to <div className='pokhome-title'><span>Pokemon </span><span className='secpart'>World</span></div></div>
        <div className='pokhome-nav'><Link id="pokdexLink" data-testid={`link-pokdex`} to={'/pokdex'}>Explore Pokédex</Link><Link id="gallaryLink" data-testid={`link-pokdex`} to={'/gallary'}>Gallary</Link></div>
        <div className='pokhome-desc-footer-container'>
          <div className='pokhome-description'>{config.pokHomeDescription}</div>
        </div>
        <Footer />
    </div>
  );
}
