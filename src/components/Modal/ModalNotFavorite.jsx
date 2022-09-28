// https://www.youtube.com/watch?v=fu-enUG2VEE
import React from 'react';
import imgLoading from '../../assets/loading.gif';
import './ModalNotFavorite.css';
import PropTypes from 'prop-types';

function ModalNotFavorite({ valueClass }) {
	return (
		<div
			id='modal-load'
			className={
				valueClass ? 'modal-ct-main-visible' : 'modal-ct-main-none'
			}
		>
			<div className='modal-content'>
				<h4><strong>Não existe Item Favoritado!!</strong></h4>
			</div>
		</div>
	);
}

ModalNotFavorite.propTypes = {
	valueClass: PropTypes.bool,
};
export default ModalNotFavorite;
