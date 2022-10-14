import React from 'react';
import PropTypes from 'prop-types';
import './SearchInputMediaHeight.css';
import './SearchInput.css';
// import './SearchInputMediaWidth.css';
// import './SearchIPhoneSE.css';

export const SearchInput = ({
	handleInput,
	handleOptions,
	searchTitle,
	valueSearchInput,
	controlePagina,
}) => {
	return (
		<div className='main-group-component'>
			<input
				type='text'
				name='valueSearchInput'
				placeholder='type your search'
				onChange={handleInput}
			/>
			<div className='ct-select-button'>
				<select className='select-style' onFocus={handleOptions}>
					<option value='title' selected>
						Title
					</option>
				</select>
				<button
					className='btn-go-search'
					onClick={e => searchTitle(valueSearchInput, controlePagina)}
				>
					Search
				</button>
			</div>
		</div>
	);
};

SearchInput.propTypes = {
	valueSearchInput: PropTypes.string,
	handleInput: PropTypes.func,
	handleOptions: PropTypes.func,
	searchTitle: PropTypes.func,
	controlePagina: PropTypes.number,
};
