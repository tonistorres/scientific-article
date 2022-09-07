import React from "react";
import { useNavigate } from "react-router-dom";
import imgMettzer from '../../assets/mettzer.png'
import '../../index.css';

function Header({  dbFavorite, pageCurrent, dbAuthors }) {

    const navigate = useNavigate();

    const handleClickFavorites = () => {
        navigate('/favorite');
    }

    const handleClickHome = () => {
        navigate('/home')
    }

    return (
        <div className="ct-main-header">
            <div><img src={imgMettzer} alt="logo Mettzer" className="logo-mettzer" /></div>
            <div><h1> {`Scientific Article `}</h1></div>
            <div>{dbFavorite.length > 0 ? <h1> Favorite: ⭐{dbFavorite.length}</h1> : null}</div>
         
            <div>   
                {
                    pageCurrent === 'Favorite'
                        ?
                        <button className="btn-ir-favorite" onClick={handleClickHome}>Home</button>
                        :
                        
                        <div className="ct-size-header">
                         <button className="btn-ir-favorite" onClick={handleClickFavorites}>
                            <p>go Favorites</p>
                        </button>
                        <div className="media-resp-length"><h1>Length: 🌟 {dbAuthors.length}</h1></div>
                        </div>
                }
            </div>
        </div>
    );
}

export default Header;