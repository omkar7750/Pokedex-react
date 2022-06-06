import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
     faHome, faImages, faPeopleGroup, faClose
  } from '@fortawesome/free-solid-svg-icons';

import  config from '../config';
const {links: {home, aboutus, gallary}} = config;

export default function SideNav(props) {
    return (
        <div className="sidebar">
            <div className='sidebar-close' ><FontAwesomeIcon onClick={props.closeSideBar} className='sidebar-close-icon' icon={faClose} /></div>
            <Link to={home.url}><FontAwesomeIcon className='sidebar-list-item-icon' icon={faHome} />{home.label}</Link>
            <Link to={gallary.url}><FontAwesomeIcon className='sidebar-list-item-icon' icon={faImages} /> {gallary.label}</Link>
            <Link to={aboutus.url}><FontAwesomeIcon className='sidebar-list-item-icon' icon={faPeopleGroup} /> {aboutus.label}</Link>
        </div>
    )

}