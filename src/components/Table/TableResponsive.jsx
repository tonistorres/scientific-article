import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Table.css';
import PropTypes from 'prop-types';

function TableResponsive({ dbAuthors, getId }) {
	function capitalize(word) {
		return word
		  .split('')
		  .map((letter, index) =>
			index ? letter.toLowerCase() : letter.toUpperCase(),
		  )
		  .join('');
	  }

	  console.log('Aqui inicia a saga',capitalize('tonis alberto torres ferreira'));
	return (
		<div className='ct-table-fluid'>
			<table className='table table-sm'>
				<tr>
					<thead>
						<tr>
							<th scope='col'>Authors</th>
							<th scope='col' className='line-break-type'>
								Type
							</th>
							<th scope='col' className='line-break-title'>
								Title
							</th>
							<th scope='col'>Description(s)</th>
							<th scope='col'>url(s)</th>
							<th scope='col'>Favorite</th>
						</tr>
					</thead>
					{dbAuthors.length > 0 &&
						dbAuthors.map((item, index) => {
							return (
								<tbody key={index + 1}>
									<td className='line-break-authors'>
										{item._source.authors.map(
											(item, index) => (
												<ul
													className='ul-none'
													key={index + 1}
												>
													<li>
														{capitalize(`${item}`.substring(
															0,
															50,
														) + '...')}
													</li>
												</ul>
											),
										)}
									</td>
									<td className='line-break-type'>
										{capitalize(`${item._type}`.substring(0, 20) +
											'...')}
									</td>
									<td className='line-break-title'>
										{capitalize(`${item._source.title}
										`.substring(0, 150))}
									</td>
									<td className='line-break-description'>
										{`${item._source.description}`.substring(
											0,
											150,
										)}
									</td>
									<td className='line-break-link'>
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
														>
															{`${item}`.substring(
																0,
																20,
															) + '...'}
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
