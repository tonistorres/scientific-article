import React from "react";
import logo from '../../assets/loading.gif';
import './Loading.css';


function Load() {
    return (
        <div className="load-render">
            <div><img src={logo} alt="Name: Mettzer" /></div>
        </div>
    );
}

export default Load; 
