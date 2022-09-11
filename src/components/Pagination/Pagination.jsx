import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

function Pagination({
	setCurrentPage,
	btnNext,
	controlePagina,
	btnPrevious,
	valueSearchInput,
}) {
	return (
		<div className='ct-pagination'>
			<div className='ct-buttons'>
				<button
					// eslint-disable-next-line prettier/prettier, no-unused-vars
          onClick={(e) => btnPrevious(valueSearchInput, controlePagina)}
					className='btn-pagination'
				>
					Previous
				</button>

				{Array.from(Array(), (item, index) => {
					return (
						<div
							key={index}
							className='div-pagination'
							value={index}
							// eslint-disable-next-line prettier/prettier
              onClick={(e) => setCurrentPage(Number(e.target.value))}
						>
							<span>pg:{controlePagina}</span>
						</div>
					);
				})}

				<button
					// eslint-disable-next-line prettier/prettier, no-unused-vars
          onClick={(e) => btnNext(valueSearchInput, controlePagina)}
					className='btn-next'
				>
					Next
				</button>
			</div>
		</div>
	);
}

Pagination.propTypes = {
	setCurrentPage: PropTypes.number,
	valueSearchInput: PropTypes.string,
	btnPrevious: PropTypes.func,
	btnNext: PropTypes.func,
	controlePagina: PropTypes.number,
};
export default Pagination;
