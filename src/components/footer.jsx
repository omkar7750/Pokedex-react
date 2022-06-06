import React from 'react';
import {Link} from 'react-router-dom';

import  config from '../config';
const {links: {aboutus}} = config;

export default function Footer(props) {
  return (<div className='footer-container' ><Link className='about-us' to={aboutus.url}>{aboutus.label}</Link></div>)
}