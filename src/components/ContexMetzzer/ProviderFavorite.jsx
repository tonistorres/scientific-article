// // import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
// // import ContextFavorite from './ContextFavorite';
// // import PropTypes from 'prop-types';

// // function ProviderFavorite({ children }) {
// // 	const navigate = useNavigate();
// // 	const SET_FAVORITE = 'Favorite';
// // 	const MAX_REGISTER_PER_PAGE = 10;
// // 	const [pageCurrent, setPageCurrent] = useState('Favorite');
// // 	const [dbFavorite, setDbFavorite] = useState([]);
// 	// // define o numero de itens que quer ter por pagina
// 	// const [itensPerPage, setItensPerPage] = useState(10);
// 	// // a pagina que esta vendo no momento por padrão iniciamos na primeira pagina
// 	// const [currentPage, setCurrentPage] = useState(0);

// 	// // calculos para descobrir numero de paginas que terei dependendo da quantidade de dados recebidas
// 	// const pages = Number(Math.ceil(dbFavorite.length / itensPerPage));
// 	// // agora vamos fatiar nosso array de index
// 	// const startIndex = currentPage * itensPerPage;
// 	// const endIndex = startIndex + itensPerPage;

// 	// const currentItens = dbFavorite.slice(startIndex, endIndex);


// 	const initialState = () => {
// 		try {
// 			setPageCurrent(SET_FAVORITE);
// 			setItensPerPage(MAX_REGISTER_PER_PAGE);
// 			const responseFavorite = searchLocalStorage('Favorite');
// 			if (responseFavorite === null) {
// 				saveLocalStorage('Favorite', []);
// 				setDbFavorite([]);
// 			} else {
// 				setDbFavorite(responseFavorite);
// 			}
// 		} catch (error) {
// 			console.log(`Erro function checkFavoriteExist:${error}`);
// 		}
// 	};

// 	const getId = id => {
// 		try {
// 			const listFilter = dbFavorite.filter(item => item._id !== id);
// 			setDbFavorite(listFilter);
// 			saveLocalStorage('Favorite', [...listFilter]);
// 			checkRedirect();
// 		} catch (error) {
// 			console.log(`Erro function getId:${error}`);
// 		}
// 	};

// 	const handleClickHome = () => {
// 		navigate('/home');
// 	};

// 	const checkRedirect = () => {
// 		try {
// 			const responseFavorite = searchLocalStorage('Favorite');
// 			if (responseFavorite === null) {
// 				handleClickHome();
// 			} else if (responseFavorite.length === 0) {
// 				handleClickHome();
// 			}
// 		} catch (error) {
// 			console.log(`Erro function checkFavoriteExist:${error}`);
// 		}
// 	};


// 	return (
// 		<ContextFavorite.Provider
// 			value={{
// 				initialState,
// 				dbFavorite,
// 				currentItens,
// 				pageCurrent,
// 				getId,
// 				setCurrentPage,
// 				pages
// 			}}
// 		>
// 			{children}
// 		</ContextFavorite.Provider>
// 	);
// }

// ProviderFavorite.propTypes = {
// 	children: PropTypes.element,
// };

// export default ProviderFavorite;
