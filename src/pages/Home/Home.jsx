import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import Header from '../../components/Header/Header';
import TableResponsive from '../../components/Table/TableResponsive';
import ScreenSearch from './ScreenSearch';
import Modal from '../../components/Modal/Modal';
import ContextHome from '../../components/ContexMetzzer/ContextHome';
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
	} = useContext(ContextHome);

	return (
		<div className='main-home'>
			<div className='main-home-sub-header'>
				<Header dbFavorite={dbFavorite} dbAuthors={dbAuthors} />
				<div className='main-group-component-main'>
					<div className='ct-group-searc'>
						<div className='ct-input-text'>
							<div className='ct-sub-input-text'>
								<input
									type='text'
									name='valueSearchInput'
									placeholder='type your search'
									onChange={handleInput}
								/>
							</div>
						</div>
						<div className='ct-select-button'>
							<select
								className='select-style'
								onFocus={handleOptions}
							>
								<option value='title' selected>
									Title
								</option>
							</select>
							<button
								className='btn-go-search'
<<<<<<< HEAD
								// eslint-disable-next-line prettier/prettier, no-unused-vars
									onClick={e =>
=======
								onClick={e =>
>>>>>>> master
									searchTitle(
										valueSearchInput,
										controlePagina,
									)
								}
							>
								Go
							</button>
						</div>
					</div>
				</div>
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
		</div>
	);
}

export default Home;
