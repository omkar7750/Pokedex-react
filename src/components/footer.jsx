import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer(props) {
  return (<div className='footer-container' ><Link className='about-us' to={'/aboutus'}>About Us</Link></div>)
}