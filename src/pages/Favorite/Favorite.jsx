import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from './Pagination';
import './Favorite.css';

function Favorite() {
	const navigate = useNavigate();

	const [pageCurrent, setPageCurrent] = useState('Favorite');
	const [dbFavorite, setDbFavorite] = useState([]);
	const [itensPerPage, setItensPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(0);
	const pages = Number(Math.ceil(dbFavorite.length / itensPerPage));
	const startIndex = currentPage * itensPerPage;
	const endIndex = startIndex + itensPerPage;
	const currentItens = dbFavorite.slice(startIndex, endIndex);

	useEffect(() => {
		try {
			initialState();
		} catch (error) {
			console.log(`Erro useEffect Favorite:${error}`);
		}
	}, []);

	const initialState = () => {
		try {
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
			<Header
				favoriteItems={dbFavorite.length}
				dbAuthors={currentItens.length}
				dbFavorite={dbFavorite}
				pageCurrent={pageCurrent}
			/>
			<div className='ct-sub-main-favorite'>
				<div className='ct-table-fluid'>
					<div className='table overflow-auto table-max-width'>
						<table>
							<tr>
								<thead className='thead-light'>
									<tr>
										<th scope='col'>Authors</th>
										<th scope='col'>Type</th>
										<th scope='col'>Title</th>
										<th scope='col'>Description(s)</th>
										<th scope='col'>url(s)</th>
										<th scope='col'>Favorite</th>
									</tr>
								</thead>

								{currentItens.length > 0 &&
									currentItens.map(item => (
										// eslint-disable-next-line react/jsx-key
										<tbody>
											<tr key={item._id} scope='row'>
												<td>
													{item._source.authors.map(
														item => (
															// eslint-disable-next-line react/jsx-key
															<ul className='ul-none'>
																<li>{item}</li>
															</ul>
														),
													)}
												</td>
												<td>{item._type}</td>
												<td>{item._source.title}</td>
												<td>{`${`${item._source.description}`.substring(
													0,
													150,
												)}...`}</td>
												<td>
													{item._source.urls.map(
														item => (
															// eslint-disable-next-line react/jsx-key
															<ul className='ul-none'>
																<li>
																	<a
																		href={
																			item
																		}
																		target='_blank'
																		rel='noreferrer'
																	>
																		Link
																	</a>
																</li>
															</ul>
														),
													)}
												</td>
												<td>
													<div className='btn-favorite'>
														<button
															className='btn-size-favorite'
															onClick={() =>
																getId(item._id)
															}
														>
															<FaStar size={30} />
														</button>
													</div>
												</td>
											</tr>
										</tbody>
									))}
							</tr>
						</table>
					</div>
				</div>
			</div>
			<Pagination setCurrentPage={setCurrentPage} pages={pages} />
		</div>
	);
}

export default Favorite;
