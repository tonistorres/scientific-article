import React, { useState, useEffect } from 'react';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import { getTitle } from '../../services/Api';
import ContextHome from './ContextHome';
import PropTypes from 'prop-types';

function HomeProvider({ children }) {
	const [dbAuthors, setAuthors] = useState([]);
	const [dbFavorite, setFavorites] = useState([]);
	const [dbStateOptions, setStateOptions] = useState('works');
	const [inputControlSearch, setInputControl] = useState(false);
	const [valueSearchInput, setValueSearchInput] = useState('');
	const [controlePagina, setControlePagina] = useState(1);
	const [modalValue, setModalValue] = useState(false);

	useEffect(() => {
		const handleApiCORE = async () => {
			try {
				initialState();
			} catch (error) {
				console.log('Error useEffect in Home:', error);
			}
		};
		handleApiCORE();
	}, []);

	useEffect(() => {
		try {
			if (dbStateOptions === 'works') {
				setInputControl(false);
				searchAPI();
			} else {
				setInputControl(true);
			}
		} catch (error) {
			console.log('Error useEffect dbStateOptions:', error);
		}
	}, [dbStateOptions]);

	useEffect(() => {
		try {
			const listRender = dbAuthors.reduce((acc, curr) => {
				const arr = dbFavorite.filter(e => e._id === curr._id);
				if (arr.length < 1) {
					acc.push(curr);
				}
				return acc;
			}, []);
			setAuthors(listRender);
		} catch (error) {
			console.log(`Erro function useEffect dbFavorite:${error}`);
		}
	}, [dbFavorite]);

	const initialState = () => {
		try {
			feedInitial();
		} catch (error) {
			console.log(`Erro function initialState:${error}`);
		}
	};

	const feedInitial = () => {
		try {
			searchAPI();
		} catch (error) {
			console.log(`Erro function feedInitial:${error}`);
		}
	};

	const checKeyFavoriteExist = () => {
		try {
			const responseFavorite = searchLocalStorage('Favorite');
			if (responseFavorite === null) {
				saveLocalStorage('Favorite', []);
				setFavorites([]);
			} else {
				setFavorites(responseFavorite);
			}
		} catch (error) {
			console.log(`Erro function checkFavoriteExist:${error}`);
		}
	};

	const searchAPI = async () => {
		try {
			checKeyFavoriteExist();
		} catch (error) {
			console.log(`Erro function searcAPI:${error}`);
		}
	};

	const searchTitle = async (valueSearchInput, controlePagina) => {
		try {
			if (
				valueSearchInput === '' ||
				!valueSearchInput ||
				valueSearchInput.length === 0
			) {
				alert('Digite algo na Pesquisa');
			} else {
				setModalValue(true);
				const response = await getTitle(
					// eslint-disable-next-line no-undef
					`/title:${valueSearchInput}?page=${controlePagina}&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}`,
				);
				setModalValue(false);
				if (response !== null) {
					checKeyFavoriteExist();
					if (dbAuthors === null) {
						setAuthors([]);
					} else {
						setAuthors(response);
					}
				} else {
					alert(
						'Não foi encontrado o item pesquisado me nossa base renderizando lista inicial',
					);
					searchAPI();
				}
			}
		} catch (error) {
			console.log(`Erro function searcTitle:${error}`);
		}
	};

	const getId = id => {
		try {
			const checkListFavorited = dbFavorite.some(item => item._id === id);
			if (!checkListFavorited) {
				const listResulting = dbAuthors.filter(item => item._id !== id);
				setAuthors([...listResulting]);
				saveLocalStorage('ListResulting', [...listResulting]);
				const itemAddFavorite = dbAuthors.filter(
					item => item._id === id,
				);
				setFavorites([...dbFavorite, ...itemAddFavorite]);
				saveLocalStorage('Favorite', [
					...dbFavorite,
					...itemAddFavorite,
				]);
			} else {
				alert('Item já Favoritado :)');
			}
		} catch (error) {
			console.log(`Erro function getId:${error}`);
		}
	};

	const handleOptions = evt => {
		try {
			const { value } = evt.target;
			if (value === 'works') {
				setStateOptions(value);
			} else {
				setStateOptions(value);
			}
		} catch (error) {
			console.log(`Erro function handleOptions:${error}`);
		}
	};

	const handleInput = evt => {
		try {
			const { value } = evt.target;
			setValueSearchInput(value);
		} catch (error) {
			console.log(`Erro function handleInput:${error}`);
		}
	};

	const btnNext = (valueSearchInput, controlePagina) => {
		try {
			if (inputControlSearch && valueSearchInput) {
				let count = controlePagina + 1;
				setControlePagina(count);
				searchTitle(valueSearchInput, count);
			} else {
				if (inputControlSearch === false && valueSearchInput === '') {
					alert(
						'Para paginar faça uma pesquisa digite algo no input input',
					);
					valueSearchInput.focus();
				} else {
					let count = controlePagina + 1;
					setControlePagina(count);
					searchTitle(valueSearchInput, count);
				}
			}
		} catch (error) {
			console.log(`Erro function paginationNext:${error}`);
		}
	};

	const btnPrevious = (valueSearchInput, controlePagina) => {
		try {
			if (controlePagina > 1) {
				let count = controlePagina - 1;
				setControlePagina(count);
				searchTitle(valueSearchInput, count);
			} else {
				alert('Chagamos à pagina inicial');
			}
		} catch (error) {
			console.log(`Erro function paginationNext:${error}`);
		}
	};

	return (
		<ContextHome.Provider
			value={{
				dbFavorite,
				handleInput,
				handleOptions,
				searchTitle,
				valueSearchInput,
				controlePagina,
				dbAuthors,
				getId,
				modalValue,
				btnNext,
				btnPrevious,
			}}
		>
			{children}
		</ContextHome.Provider>
	);
}

HomeProvider.propTypes = {
	children: PropTypes.element,
};

export default HomeProvider;
