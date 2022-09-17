// https://www.youtube.com/watch?v=fu-enUG2VEE
import React from 'react';
import imgLoading from '../../assets/loading.gif';
import './Modal.css';
import PropTypes from 'prop-types';

function Modal({ valueClass }) {
	return (
		<div
			id='modal-load'
			className={
				valueClass ? 'modal-ct-main-visible' : 'modal-ct-main-none'
			}
		>
			<div className='modal-content'>
				<img className='img-loading' src={imgLoading} alt='loading' />
			</div>
		</div>
	);
}

Modal.propTypes = {
	valueClass: PropTypes.bool,
};
export default Modal;
