import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Table.css';
import PropTypes from 'prop-types';

function TableArticle({ dbAuthors, getId }) {
	return (
		<div className='table overflow-auto table-max-width'>
			<table className='rTable'>
				<tbody>
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

					{dbAuthors.length > 0 &&
						dbAuthors.map(item => {
							return (
								<tr key={item._id} scope='row'>
									<td width='180'>
										{item._source.authors.map(
											(item, index) => (
												<ul
													className='ul-none'
													key={index + 1}
												>
													<li>{item}</li>
												</ul>
											),
										)}
									</td>
									<td width='160'>{item._type}</td>
									<td width='390'>{item._source.title}</td>
									<td width='490'>
										{`${item._source.description}`.substring(
											0,
											50,
										) + '...'}
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
															href={item}
															target='_blank'
															rel='noreferrer'
														>{`Link`}</a>
													</li>
												</ul>
											),
										)}
									</td>
									<td width='100'>
										<div className='btn-favorite'>
											<button
												className='btn-size-favorite'
												// eslint-disable-next-line prettier/prettier, no-unused-vars
												onClick={(e) => getId(item._id)}
											>
												<FaStar size={30} />
											</button>
										</div>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

TableArticle.propTypes = {
	dbAuthors: PropTypes.array,
	getId: PropTypes.func,
};

export default TableArticle;
