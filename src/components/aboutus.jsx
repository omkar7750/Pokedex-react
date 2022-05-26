import React from 'react';
import { Link } from 'react-router-dom';
import NavButton from './floatingnavbtn';
import config from '../config';

export default function AboutUs(props) {
  return (
  <>
    <div className='aboutus-container' >
        <div className='sub-container-a'>
            <div className='aboutus-title'>About Us</div>
            <div className='aboutus-pokdex-nav'>
                <Link to={'/pokdex'} className='aboutus-pokdex-link'>Explore Pokedex</Link>
                <NavButton />            
            </div>
            <div className='aboutus-content'>
                <div className='desc'>
                    {config.aboutusContent}
                </div>
                <div className='aboutus-pikachu-image'></div>
            </div>
        </div>
    </div>
  </>
  )
}