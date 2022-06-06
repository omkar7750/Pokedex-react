import React from 'react';
import { Link } from 'react-router-dom';

export default function FloatingNavButton(props) {
  return (
    <Link className="nav-btn-link" to={'/'}>
      <div className="nav-btn"></div>
    </Link>
  );
}
