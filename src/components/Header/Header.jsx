import React from "react";
import imgMettzer from '../../assets/mettzer.png'
import '../../index.css';

function Header() {
    return (
        <div className="ct-main-header">
            <img src={imgMettzer} alt="logo Mettzer" className="logo-mettzer" />
            <div className="ct-header-name">
                <h1>Scientific Article</h1>
            </div>
        </div>
    );
}

export default Header;