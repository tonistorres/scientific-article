import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from './Pagination';
import './Favorite.css';
import { isElementType } from '@testing-library/user-event/dist/utils';

function Favorite() {
	const navigate = useNavigate();
	const SET_FAVORITE = 'Favorite';
	const MAX_REGISTER_PER_PAGE = 10;
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
			<Header
				favoriteItems={dbFavorite.length}
				dbAuthors={currentItens.length}
				dbFavorite={dbFavorite}
				pageCurrent={pageCurrent}
			/>
			<div className='ct-sub-main-favorite'>
				<div className='ct-table-fluid'>
					<div className='table overflow-auto'>
						<table className='table-responsive'>
							<tr>
								<thead className='thead-dark'>
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
										<tbody key={isElementType._id}>
											<tr scope='row'>
												<td width='180'>
													{item._source.authors.map(
														(item, index) => (
															<ul
																className='ul-none'
																key={index + 1}
															>
																<li>
																	{`${item}`.substring(
																		0,
																		50,
																	) + '...'}
																</li>
															</ul>
														),
													)}
												</td>
												<td width='160'>
													{item._type}
												</td>
												<td width='390'>
													{`${item._source.title}`.substring(
														0,
														40,
													)}
												</td>
												<td width='490'>
													{`${`${item._source.description}`.substring(
														0,
														490,
													)}...`}
												</td>
												<td width='100'>
													{item._source.urls.map(
														(item, index) => (
															<ul
																className='ul-none'
																key={index + 1}
															>
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
												<td width='100'>
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
