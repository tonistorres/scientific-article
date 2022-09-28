import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { Navbar } from '../../components/Navbar/Navbar';
import ContextFavorite from '../../components/ContexMetzzer/ContextFavorite';
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
			<Navbar
				// favoriteItems={dbFavorite.length}
				// dbAuthors={currentItens.length}
				dbFavorite={dbFavorite}
				// pageCurrent={pageCurrent}
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
									currentItens.map((item, idx) => (
										<tbody key={idx + 1}>
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
