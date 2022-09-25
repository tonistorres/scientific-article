import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import './PaginationHeight.css';
import './PaginationWidth.css';

function Pagination({
	btnNext,
	controlePagina,
	btnPrevious,
	valueSearchInput,
}) {
	return (
		<div className='ct-pagination'>
			<div className='ct-buttons'>
				<button
					onClick={e => btnPrevious(valueSearchInput, controlePagina)}
					className='btn-pagination'
				>
					Previous
				</button>

				<div className='div-pagination'>
					<span>Page:{controlePagina}</span>
				</div>

				<button
					onClick={e => btnNext(valueSearchInput, controlePagina)}
					className='btn-next'
				>
					Next
				</button>
			</div>
		</div>
	);
}

Pagination.propTypes = {
	valueSearchInput: PropTypes.string,
	btnPrevious: PropTypes.func,
	btnNext: PropTypes.func,
	controlePagina: PropTypes.number,
};
export default Pagination;
