import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import imgMettzer from '../../assets/metzzerTop.png';
import './Header.css';
import { searchLocalStorage } from '../../util/LocalStorage';

function Header({ dbFavorite, pageCurrent }) {
	const navigate = useNavigate();

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

	return (
		<div className='navbar'>
			<img src={imgMettzer} alt='logo Mettzer' className='logo-mettzer' />
			{dbFavorite.length > 0 ? (
				<span> Favorited ⭐{dbFavorite.length}</span>
			) : null}
			<div>
				{pageCurrent === 'Favorite' ? (
					<button onClick={handleClickHome}>Home</button>
				) : (
					<div>
						<button
							className='btn-ir-favorite'
							onClick={checkRedirect}
						>
							<p>go Favorites</p>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

Header.propTypes = {
	dbFavorite: PropTypes.array,
	pageCurrent: PropTypes.string,
};

export default Header;
