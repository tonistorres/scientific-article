import React, { useState, useEffect, useContext } from 'react';
import ContextHome from '../../components/ContexMetzzer/ContextHome';
import ModalNotFavorite from '../../components/Modal/ModalNotFavorite';
import { Navbar } from '../../components/Navbar/Navbar';
import TableResponsive from '../../components/Table/TableResponsive';
import ScreenSearch from '../../components/ScreenSearch/ScreenSearch';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';
import './HomeWidth.css';
import './HomeHeight.css';

function Home() {
	const {
		dbFavorite,
		handleInput,
		flagMsg,
		handleOptions,
		searchTitle,
		valueSearchInput,
		controlePagina,
		dbAuthors,
		getId,
		modalValue,
		modalValueNot,
		btnNext,
		btnPrevious,
		initialState,
		handleModalNotFavorite,
	} = useContext(ContextHome);

	useEffect(() => {
		const handleApiCORE = async () => {
			try {
				initialState();
			} catch (error) {
				console.log('Error useEffect in Home:', error);
			}
		};
		handleApiCORE();
	}, []);

	return (
		<div className='ct-main-home'>
			<Navbar
				dbFavorite={dbFavorite}
				handleModalNotFavorite={handleModalNotFavorite}
			/>
			<SearchInput
				handleInput={handleInput}
				handleOptions={handleOptions}
				searchTitle={searchTitle}
				valueSearchInput={valueSearchInput}
				controlePagina={controlePagina}
			/>
			<div className='ct-data-base-structure'>
				{dbAuthors.length === 0 ? (
					<ScreenSearch />
				) : (
					<TableResponsive dbAuthors={dbAuthors} getId={getId} />
				)}
			</div>
			<Modal valueClass={modalValue} />
			<ModalNotFavorite valueClass={modalValueNot} flagMsg={flagMsg} />
			<Pagination
				controlePagina={controlePagina}
				btnNext={btnNext}
				btnPrevious={btnPrevious}
				valueSearchInput={valueSearchInput}
			/>
		</div>
	);
}

export default Home;
