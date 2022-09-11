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
									<td className='td-mw-authors'>
										{item._source.authors.map(item => (
											// eslint-disable-next-line react/jsx-key
											<ul className='ul-none'>
												<li>{item}</li>
											</ul>
										))}
									</td>
									<td className='td-mw-type'>{item._type}</td>
									<td className='td-mw-title'>
										{item._source.title}
									</td>
									<td className='td-mw-descrip'>
										{`${item._source.description}`.substring(
											0,
											50,
										) + '...'}
									</td>
									<td className='td-mw-url'>
										{item._source.urls.map(item => (
											// eslint-disable-next-line react/jsx-key
											<ul className='ul-none'>
												<li>
													<a
														href={item}
														target='_blank'
														rel='noreferrer'
													>{`Link`}</a>
												</li>
											</ul>
										))}
									</td>
									<td className='td-mw-button'>
										<div className='btn-favorite'>
											<button
												className='btn-size-favorite'
												onClick={() => getId(item._id)}
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
