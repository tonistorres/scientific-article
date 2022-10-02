import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { Navbar } from '../../components/Navbar/Navbar';
import ContextFavorite from '../../components/ContexMetzzer/ContextFavorite';
import TableFavorite from './TableFavorite/TableFavorite';
import Pagination from './Pagination';
import './Favorite.css';

function Favorite() {
	const {
		initialState,
		dbFavorite,
		currentItens,
		pageCurrent,
		getId,
		setCurrentPage,
		pages,
	} = useContext(ContextFavorite);
	useEffect(() => {
		try {
			initialState();
		} catch (error) {
			console.log(`Erro useEffect Favorite:${error}`);
		}
	}, []);

	return (
		<div className='main-favorite'>
			<Navbar dbFavorite={dbFavorite} />
			<TableFavorite currentItens={currentItens} getId={getId} />
			<Pagination setCurrentPage={setCurrentPage} pages={pages} />
		</div>
	);
}

export default Favorite;
