import React from "react";
import {FaStar} from 'react-icons/fa'
import '../../index.css';

function StarRating() {
    return ( <button className="btn-size-favorite"><FaStar size={30}/></button> );
}

export default StarRating;