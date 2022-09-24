import React, { useState, useEffect, useContext } from 'react';
import ContextHome from '../../components/ContexMetzzer/ContextHome';
import Header from '../../components/Header/Header';
import TableResponsive from '../../components/Table/TableResponsive';
import ScreenSearch from './ScreenSearch';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';
import { SearchInput } from './SearchInput';
import '../../index.css';
import './Home.css';

function Home() {
	const {
		dbFavorite,
		handleInput,
		handleOptions,
		searchTitle,
		valueSearchInput,
		controlePagina,
		dbAuthors,
		getId,
		modalValue,
		btnNext,
		btnPrevious,
		initialState,
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
			<Header dbFavorite={dbFavorite} dbAuthors={dbAuthors} />
			<SearchInput
				handleInput={handleInput}
				handleOptions={handleOptions}
				searchTitle={searchTitle}
				valueSearchInput={valueSearchInput}
				controlePagina={controlePagina}
			/>

			{dbAuthors.length === 0 ? (
				<ScreenSearch />
			) : (
				<TableResponsive dbAuthors={dbAuthors} getId={getId} />
			)}
			<Modal valueClass={modalValue} />
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
