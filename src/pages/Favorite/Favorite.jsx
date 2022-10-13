import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import TableFavorite from './TableFavorite/TableFavorite';
// import { Navbar } from '../../components/Navbar/Navbar';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
// import Pagination from './Pagination';
import './Favorite.css';

function Favorite() {
	const navigate = useNavigate();
	const SET_FAVORITE = 'Favorite';
	const MAX_REGISTER_PER_PAGE = 10;
	const [pageCurrent, setPageCurrent] = useState('Favorite');
	const [dbFavorite, setDbFavorite] = useState([]);
	const [itensPerPage, setItensPerPage] = useState(MAX_REGISTER_PER_PAGE);
	const [currentPage, setCurrentPage] = useState(0);
	const pages = Number(Math.ceil(dbFavorite.length / itensPerPage));
	const startIndex = currentPage * itensPerPage;
	const endIndex = startIndex + itensPerPage;
	const currentItens = dbFavorite.slice(Number(startIndex), Number(endIndex));

	useEffect(() => {
		try {
			initialState();
		} catch (error) {
			console.log(`Erro useEffect Favorite:${error}`);
		}
	}, []);

	const initialState = () => {
		try {
			setPageCurrent(SET_FAVORITE);
			setItensPerPage(MAX_REGISTER_PER_PAGE);
			const responseFavorite = searchLocalStorage('Favorite');
			if (responseFavorite === null) {
				saveLocalStorage('Favorite', []);
				setDbFavorite([]);
			} else {
				setDbFavorite(responseFavorite);
			}
		} catch (error) {
			console.log(`Erro function checkFavoriteExist:${error}`);
		}
	};

	const getId = id => {
		try {
			const listFilter = dbFavorite.filter(item => item._id !== id);
			setDbFavorite(listFilter);
			saveLocalStorage('Favorite', [...listFilter]);
			checkRedirect();
		} catch (error) {
			console.log(`Erro function getId:${error}`);
		}
	};

	const handleClickHome = () => {
		navigate('/home');
	};

	const checkRedirect = () => {
		try {
			const responseFavorite = searchLocalStorage('Favorite');
			if (responseFavorite === null) {
				handleClickHome();
			} else if (responseFavorite.length === 0) {
				handleClickHome();
			}
		} catch (error) {
			console.log(`Erro function checkFavoriteExist:${error}`);
		}
	};

	useEffect(() => {
		try {
			setCurrentPage(0);
		} catch (error) {
			console.log(`Erro useEffect itensPerPage:${error}`);
		}
	}, [itensPerPage]);

	return (
		<div className='main-favorite'>
			{/* <Navbar
				favoriteItems={dbFavorite.length}
				dbAuthors={currentItens.length}
				dbFavorite={dbFavorite}
				pageCurrent={pageCurrent}
			/> */}
			{/* <TableFavorite currentItens={currentItens} getId={getId} /> */}
			{/* <Pagination setCurrentPage={setCurrentPage} pages={pages} /> */}
		</div>
	);
}

export default Favorite;
