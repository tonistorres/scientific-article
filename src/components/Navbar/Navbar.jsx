import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaConfluence } from 'react-icons/fa';
import { searchLocalStorage } from '../../util/LocalStorage';
import './Navbar.css';
import './NavbarMediaQuery.css'
// https://www.youtube.com/watch?v=ctiDWDq7C8E



export const Navbar = ({ dbFavorite,favoriteItems,dbAuthors,pageCurrent }) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const checkRedirect = () => {
		try {
			const responseFavorite = searchLocalStorage('Favorite');
			if (responseFavorite === null) {
				alert('Clave Favorite inexistente no LocalHistorage');
			} else {
				if (responseFavorite.length === 0) {
					alert('Não existe dados Favoritados');
				} else {
					handleClickFavorites();
				}
			}
		} catch (error) {
			console.log(`Erro function checkRedirect:${error}`);
		}
	};

	const handleClickFavorites = () => {
		navigate('/favorite');
	};

	const handleClickHome = () => {
		navigate('/home');
	};

	const handleLogout = () => {
		navigate('/');
	}


	return (
		<div className="Navbar">
			<div className="nav-logo">
				<FaConfluence size={45} /> <span>Dev:T</span>
			</div>
			<div className='ct-favorite-nav'>
				<span> ⭐   {dbFavorite.length}</span>
			</div>
			<div className={`nav-links ${isOpen && 'open'}`}>
				<button className='button-link-nav' onClick={handleClickHome}>Home</button>
				<button className='button-link-nav' onClick={checkRedirect}>Favorite</button>
				<button className='button-link-nav' onClick={handleLogout}>Logout</button>
			</div>

			<div
				className={`nav-toggle ${isOpen && 'open'}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="bar"></div>
			</div>
		</div>
	);
};

Navbar.propTypes = {
	dbFavorite: PropTypes.array,
	pageCurrent: PropTypes.string,
	favoriteItems:PropTypes.array,
	dbAuthors: PropTypes.array,

};
