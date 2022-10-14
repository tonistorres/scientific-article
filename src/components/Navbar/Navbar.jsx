import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaConfluence } from 'react-icons/fa';
import { searchLocalStorage } from '../../util/LocalStorage';
import './Navbar.css';
// import './NavbarMediaQuery.css'
// import './NavIPhoneSE.css';
import ModalNotFavorite from '../Modal/ModalNotFavorite';

// https://www.youtube.com/watch?v=ctiDWDq7C8E



export const Navbar = ({ dbFavorite, favoriteItems, dbAuthors, pageCurrent, handleModalNotFavorite }) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [modalValue, setModalValue] = useState(false);


	const checkRedirect = () => {
		try {
			const responseFavorite = searchLocalStorage('Favorite');
			if (responseFavorite === null) {
				alert('Chave Favorite inexistente no LocalHistorage');
			} else {
				if (responseFavorite.length === 0) {
					handleModalNotFavorite();
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
				<FaConfluence size={35} color="#66B175 "/> <span>Dev:T</span>
			</div>
			<div className='ct-favorite-nav'>
				{
					dbFavorite.length > 0 ? (<span> ⭐   {dbFavorite.length}</span>) : null
				}
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
	favoriteItems: PropTypes.number,
	dbAuthors: PropTypes.number,
	handleModalNotFavorite: PropTypes.func,

};
