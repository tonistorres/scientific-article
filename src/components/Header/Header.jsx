import React from "react";
import { useNavigate } from "react-router-dom";
import imgMettzer from '../../assets/metzzerTop.png';
import './Header.css';

function Header({ dbFavorite, pageCurrent, dbAuthors }) {

    const navigate = useNavigate();

    const handleClickFavorites = () => {
        navigate('/favorite');
    }

    const handleClickHome = () => {
        navigate('/home')
    }
    return (

        <div className="navbar">
            <img src={imgMettzer} alt="logo Mettzer" className="logo-mettzer" />
            {/* <div ><span>Article</span></div> */}
            {dbFavorite.length > 0 ? <span > Favorited ⭐{dbFavorite.length}</span> : null}
            <div >
                {
                    pageCurrent === 'Favorite'
                        ?
                        <button onClick={handleClickHome}>Home</button>
                        :
                        <div>
                            <button
                                className="btn-ir-favorite"
                                onClick={handleClickFavorites}
                            >
                                <p>go Favorites</p>
                            </button>
                        </div>
                }
            </div>
        </div>
    );
}


export default Header;

