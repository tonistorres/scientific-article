import React from 'react';
import { FaStar } from 'react-icons/fa';
import { NotContent } from './NotContent/NotContent';
import { NotContentAuthors } from './NotContent/NotContentAuthors';
import { LinkBroken } from './LinkBroken/LinkBroken';
import PropTypes from 'prop-types';
import './TableFavoriteIPhoneSE.css';

function TableFavorite({ currentItens, getId }) {
	function capitalize(word) {
		return word
			.split('')
			.map((letter, index) =>
				index ? letter.toLowerCase() : letter.toUpperCase(),
			)
			.join('');
	}

	function treatingResultDescription(str) {
		if (str === 'null' || str === '' || str === '...') {
			return <NotContent />;
		} else {
			return str;
		}
	}

	return (
		<div className='content-main'>
			<table className='table table-sm'>
				<tr>
					<thead>
						<tr>
							<th scope='col' className='line-break-authors-th'>
								Authors
							</th>
							<th scope='col' className='line-break-type-th'>
								Type
							</th>
							<th scope='col' className='line-break-title-th'>
								Title
							</th>
							<th
								scope='col'
								className='line-break-decription-th'
							>
								Description(s)
							</th>
							<th scope='col' id='line-break-url-th'>
								url(s)
							</th>
							<th scope='col' id='line-break-favorite-th'>
								Favorite
							</th>
						</tr>
					</thead>
					{currentItens.length > 0 &&
						currentItens.map((item, index) => {
							return (
								<tbody key={index + 1}>
									<td className='line-break-authors-td'>
										{item._source.authors.length > 0 ? (
											item._source.authors
												.slice(0, 2)
												.map((item, index) => (
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
												))
										) : (
											<ul>
												<li>
													<NotContentAuthors />
												</li>
											</ul>
										)}
									</td>
									<td className='line-break-type-td'>
										{capitalize(
											`${item._type}`.substring(0, 20) +
												'...',
										)}
									</td>
									<td className='line-break-title-td'>
										{capitalize(
											`${item._source.title}
										`.substring(0, 150),
										)}
									</td>
									<td className='line-break-decription-td'>
										{treatingResultDescription(
											`${item._source.description}`.substring(
												0,
												150,
											),
										)}
									</td>
									<td id='line-break-url-td'>
										{item._source.urls.length ? (
											item._source.urls.map(
												(item, index) => (
													<ul
														className='ul-none'
														key={index + 1}
													>
														<li>
															<a
																href={item}
																target='_blank'
																rel='noreferrer'
															>
																{`${item}`.substring(
																	0,
																	20,
																) + '...'}
															</a>
														</li>
													</ul>
												),
											)
										) : (
											<LinkBroken />
										)}
									</td>
									<td
										width='100'
										className='line-break-favorite-td'
									>
										<div className='div-btn-favorite'>
											<button
												id='btn-favorite'
												onClick={() => getId(item._id)}
											>
												<FaStar
													size={30}
													color='#66B175'
												/>
											</button>
										</div>
									</td>
								</tbody>
							);
						})}
				</tr>
			</table>
		</div>
	);
}

TableFavorite.propTypes = {
	currentItens: PropTypes.array,
	getId: PropTypes.func,
};

export default TableFavorite;
