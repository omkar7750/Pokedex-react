import React from 'react';
import { Link } from 'react-router-dom';
import NavButton from './floatingnavbtn';

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
                    Pokémon are living creatures that inhabit the Pokémon world, living alongside, and usually helping, humans. Pokémon have been seen within this world as being both supplements and replacements for animals and plants that exist within the real world. Most people respect Pokémon and treat them kindly, yet there exist people who take advantage of them and exploit their abilities for their own gain. Pokémon have feelings and can also understand the human language to some extent. Recreations of natural ecosystems are done with Pokémon. While some Pokémon have abilities that are normal or only slightly distorted from reality, many more Pokémon have abilities that are completely original and have no counterparts within the real world. Other Pokémon are based on legends that exist in our world such as Ho-Oh being based on a phoenix.
                </div>
                <div className='aboutus-pikachu-image'></div>
            </div>
        </div>
    </div>
  </>
  )
}