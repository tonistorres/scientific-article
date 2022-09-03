import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgMettzer from '../../assets/mettzer.png'
import '../../index.css';

function Header({ favoriteItems, dbFavorite, pageCurrent }) {

    const navigate = useNavigate()

    const handleClickFavorites = () => {
        navigate('/favorite')
    }

    const handleClickHome = () => {
        navigate('/')
    }

    return (
        <div className="ct-main-header">
            <img src={imgMettzer} alt="logo Mettzer" className="logo-mettzer" />
            <h1> {`Scientific Article `}</h1>
            <div>{dbFavorite.length > 0 ? <h1>⭐{favoriteItems}</h1> : null}</div>
            <div>
                {
                    pageCurrent === 'Favorite'
                        ?
                        <button className="btn-ir-favorite" onClick={handleClickHome}>Home</button>
                        :
                        <button className="btn-ir-favorite" onClick={handleClickFavorites}>go Favorites</button>
                }
            </div>
        </div>
    );
}

export default Header;