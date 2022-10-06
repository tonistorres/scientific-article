// https://www.youtube.com/watch?v=fu-enUG2VEE
import React from 'react';
import imgLoading from '../../assets/loading.gif';
// import './ModalNotFavorite.css';
import './ModalFavoriteIPhoneSE.css';
import PropTypes from 'prop-types';

function ModalNotFavorite({ valueClass, flagMsg }) {

const modaListening = (str)=>{
	switch(str) {

		case "notfavorite":   return (<h1><p>There is not  </p><p>favorite item!!</p></h1>);
		case "btnprevious":   return (<h1><p>We are at the</p><p> beginning of </p><p>the pagination!!</p></h1>);
		case "btnnextsearch": return (<h1><p>Empty search field!!</p></h1>);
		case "searchDigite":  return (<h1><p>type something </p><p>in the search</p></h1>);
		case "notSearch": return (<h1><p>Data not </p><p>found in API</p></h1>);
		case "itemFavorited": return (<h1><p>Already </p><p>favorited item</p></h1>);
		default:      return <h1>Return empity </h1>
	  }

}
	return (
		<div
			id='modal-load'
			className={
				valueClass ? 'modal-ct-main-visible' : 'modal-ct-main-none'
			}
		>
			<div className='modal-content'>
				{
					modaListening(flagMsg)
				}

			</div>
		</div>
	);
}

ModalNotFavorite.propTypes = {
	valueClass: PropTypes.bool,
};
export default ModalNotFavorite;
