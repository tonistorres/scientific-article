import React from "react";
import logo from '../../assets/boy.gif';
import './Loading.css';


function Load() {
    return (
        <div className="load-render">
            <div><img src={logo} alt="Name: Mettzer" className="img-logo-load" /></div>
        </div>
    );
}

export default Load; 
