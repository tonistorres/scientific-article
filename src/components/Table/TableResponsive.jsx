import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Table.css';
import PropTypes from 'prop-types';

function TableResponsive({ dbAuthors, getId }) {
	return (
		<div className='ct-table-fluid'>
			<table className='table table-sm'>
				<tr>
					<thead>
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
						dbAuthors.map((item, index) => {
							return (
								<tbody key={index + 1}>
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
												onClick={() => getId(item._id)}
											>
												<FaStar size={30} />
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

TableResponsive.propTypes = {
	dbAuthors: PropTypes.array,
	getId: PropTypes.func,
};

export default TableResponsive;
