import React from 'react';
import logoBoy from '../../assets/boy.gif';
import './Home';

function ScreenSearch() {
	return (
		<div className='ct-search-title-boy'>
			{/* <h1>Faça sua Pesquisa</h1> */}
			<img src={logoBoy} alt='Logo Boy' />
		</div>
	);
}

export default ScreenSearch;
