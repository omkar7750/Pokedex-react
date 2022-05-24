import React from 'react';
import { Link } from 'react-router-dom';

export default function FloatingNavButton(props) {
  return (<Link to={'/'}><div className='nav-btn'></div></Link>)
}