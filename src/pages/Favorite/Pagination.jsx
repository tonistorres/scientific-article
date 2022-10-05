import React from 'react';
import './PaginationIPhoneSE.css';
import PropTypes from 'prop-types';

function Pagination({ setCurrentPage, pages }) {
	return (
		<div className='ct-pagination-favorite'>
			<div className='ct-butons'>
				{Array.from(Array(pages), (item, index) => (
					<button
						key={index}
						className='btn-pagination'
						value={index}
						onClick={e => setCurrentPage(Number(e.target.value))}
					>
						<strong>{index + 1}</strong>
					</button>
				))}
			</div>
		</div>
	);
}

Pagination.propTypes = {
	setCurrentPage: PropTypes.number,
	pages: PropTypes.number,
};

export default Pagination;
