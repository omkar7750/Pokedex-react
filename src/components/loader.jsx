import React from 'react';
// import loaderImage from '../utility/images/loader1.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

export default function Loader(props) {
    // return <><img className='loader-comp' src = {loaderImage} /></>
    return <div className='loader-comp' ><FontAwesomeIcon className='spinner' icon={faSpinner} /></div>
    
}