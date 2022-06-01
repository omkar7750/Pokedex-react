import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import config from '../config';
import Loader from './loader';
import { Link } from 'react-router-dom';
import AboutUs from './aboutus';


export default function Gallary(props) { 
    const [imagePath, setImagePath] = useState("")
    const [images, setImages] = useState([]);
    const imgviewRef = useRef([]);

    useEffect(() => {
        fetch(config.dataUrl)
            .then((response) => response.json())
            .then(async(json) => {
                let images = json.pokemon.map((pok) => pok.img);
                setImages(images);
                setImagePath(images[0])
            })
    }, [])

    const viewImage = (img) => {
        setImagePath(img);
    }

    const viewPrevious = () => {
        const imageIndex = images.indexOf(imagePath);
        if(imageIndex == 0) return;
        setImagePath(images[imageIndex - 1])
        imgviewRef.current[images[imageIndex - 1]].scrollIntoView()
    }

    const viewNext = () => {
        const imageIndex = images.indexOf(imagePath);
        if(imageIndex == images.length - 1) return;
        setImagePath(images[imageIndex + 1])
        imgviewRef.current[images[imageIndex + 1]].scrollIntoView()
    }

    return (
        <div className='gallary-container'>
        <div className='gallary'>
            <div className='gal-heading'>Pokemon Gallary</div>
            <div className='gal-nav-bar'>
                <div className='gal-nav-link-container'>
                    <Link className="gal-nav-link gal-link-first" to={'/'}>Home</Link>
                    <Link className="gal-nav-link" to={'/pokdex'}>Pokédex</Link>
                </div>
                <div className='gal-nav-link-container'>
                    <Link className="gal-nav-link gal-link-last" to={'/aboutus'}>About Us</Link>
                </div>
            </div>
            <div className='gal-zoomed-view'>{imagePath ?
                <>
                    <FontAwesomeIcon className={'gal-image-slide-icon ' + (imagePath == images[0]? "disabled" : "")} icon={faChevronLeft} onClick={viewPrevious} />
                    <img src={imagePath} className="zoomed-image" />
                    <FontAwesomeIcon className={'gal-image-slide-icon ' + (imagePath == images[images.length - 1]? "disabled" : "")} icon={faChevronRight} onClick={viewNext} />
                </>: <Loader /> }
            </div>
            <div className='gal-images-to-view'>{
                images.map((img, i) => {
                    return (<img src={img} ref={(el) => imgviewRef.current[img] = el} key={`imgview-${i}`} onClick={() => viewImage(img)} className={"imgview " + (img == imagePath? "gal-img-active": "")} />)
                })
            }</div>
        </div>
        </div>
    )
}
