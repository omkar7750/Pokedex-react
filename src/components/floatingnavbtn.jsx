import React from 'react';
import { Link } from 'react-router-dom';

import  config from '../config';
const {links: {home}} = config;

export default function FloatingNavButton(props) {
  return (<Link className='nav-btn-link' to={home.url}><div className='nav-btn'></div></Link>)
}