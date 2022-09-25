import React from 'react';
import logoBoy from '../../assets/boy.gif';
import './ScreenSearch.css';
import './ScreenSearchHeigth.css';

function ScreenSearch() {
	return (
		<div className='ct-search-title-boy'>
			<img src={logoBoy} alt='Logo Boy' />
		</div>
	);
}

export default ScreenSearch;