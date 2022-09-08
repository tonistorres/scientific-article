import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { getWorks, getTitle } from '../../services/Api';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import Load from "../../components/Loading/Load";
import '../../index.css';

function Home() {
    const [dbAuthors, setAuthors] = useState([]);
    const [dbFavorite, setFavorites] = useState([]);
    const [dbStateOptions, setStateOptions] = useState('works');
    const [inputControlSearch, setInputControl] = useState(false);
    const [valueSearchInput, setValueSearchInput] = useState('');
    const [controlePagina, setControlePagina] = useState(1);

    useEffect(() => {
        const handleApiCORE = async () => {
            try {
                initialState();
            } catch (error) {
                console.log("Error useEffect in Home:", error);
            }
        }
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
            console.log("Error useEffect dbStateOptions:", error);
        }
    }, [dbStateOptions]);

    useEffect(() => {
        try {
            const listRender = dbAuthors.reduce((acc, curr) => {
                const arr = dbFavorite.filter((e) => e._id === curr._id);
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
    }

    const checKeyFavoriteExist = () => {
        try {
            const responseFavorite = searchLocalStorage("Favorite");
            if (responseFavorite === null) {
                saveLocalStorage("Favorite", []);
                setFavorites([]);
            } else {
                setFavorites(responseFavorite)
            }    
        } catch (error) {
            console.log(`Erro function checkFavoriteExist:${error}`);
        }
    }

    const searchAPI = async () => {
        try {
            const response = await getWorks(`/${dbStateOptions}?apiKey=${process.env.REACT_APP_API_KEY}`);
            checKeyFavoriteExist();
            setAuthors(response);
        } catch (error) {
            console.log(`Erro function searcAPI:${error}`);
        }
    }

    const searchTitle = async (valueSearchInput, controlePagina) => {
        try {
            if (valueSearchInput === "" || !valueSearchInput || valueSearchInput.length === 0) {
                alert('Digite algo na Pesquisa');
            } else {
                const response = await getTitle(`/title:${valueSearchInput}?page=${controlePagina}&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}`);
                if (response !== null) {
                    checKeyFavoriteExist();
                    console.log('Dentro da Função dbAuthors', dbAuthors);
                    if (dbAuthors === null) {
                        setAuthors([])
                    } else {
                        setAuthors(response);
                    }
                } else {
                    alert('Não foi encontrado o item pesquisado me nossa base renderizando lista inicial');
                    searchAPI();
                }
            }
        } catch (error) {
            console.log(`Erro function searcTitle:${error}`);
        }
    }

    const feedInitial = () => {
        try {
            searchAPI();
        } catch (error) {
            console.log(`Erro function feedInitial:${error}`);
        }
    }

    const getId = (id) => {
        try {
            const checkListFavorited = dbFavorite.some((item) => item._id === id);
            if (!checkListFavorited) {
                const listResulting = dbAuthors.filter((item) => item._id !== id);
                setAuthors([...listResulting]);
                saveLocalStorage("ListResulting", [...listResulting])
                const itemAddFavorite = dbAuthors.filter((item) => item._id === id)
                setFavorites([...dbFavorite, ...itemAddFavorite]);
                saveLocalStorage("Favorite", [...dbFavorite, ...itemAddFavorite]);
            } else {
                alert('Item já Favoritado :)');
            }
        } catch (error) {
            console.log(`Erro function getId:${error}`);
        }
    }

    const handleOptions = (evt) => {
        try {
            const { value } = evt.target;
            console.log('handleOptions', value);
            console.log('typeValue', typeof (value));
            if (value === 'works') {
                setStateOptions(value)
            } else {
                setStateOptions(value);
            }
        } catch (error) {
            console.log(`Erro function handleOptions:${error}`);
        }
    }

    const handleInput = (evt) => {
        try {
            const { value } = evt.target;
            setValueSearchInput(value);            
        } catch (error) {
            console.log(`Erro function handleInput:${error}`);
        }
    }

    const btnNext = (valueSearchInput, controlePagina) => {
        try {
            if (inputControlSearch && valueSearchInput) {
                let count = controlePagina + 1
                setControlePagina(count)
                searchTitle(valueSearchInput, count);
            } else {
                if (inputControlSearch === false && valueSearchInput === '') {
                    alert('Para paginar faça uma pesquisa digite algo no input input');
                    valueSearchInput.focus();
                } else {
                    alert('Preencha o campo de pesquisa')
                }
            }
        } catch (error) {
            console.log(`Erro function paginationNext:${error}`);
        }
    }

    const btnPrevious = (valueSearchInput, controlePagina) => {
        try {
            if (controlePagina > 1) {
                let count = controlePagina - 1;
                setControlePagina(count);
                searchTitle(valueSearchInput, count);
            } else {
                alert('Chagamos na ultima Pagina')
            }
        } catch (error) {
            console.log(`Erro function paginationNext:${error}`);
        }
    }

    return (
        <div>
            {!dbAuthors.length ? <Load /> :
                <div className="ct-main-home">
                    <Header dbFavorite={dbFavorite} dbAuthors={dbAuthors} />
                    <div className="ct-search">
                        {
                            inputControlSearch
                                ?
                                <input
                                    type="text"
                                    name="valueSearchInput"
                                    placeholder="type your search"
                                    onChange={handleInput}
                                />
                                :
                                null
                        }

                        <div className="ct-sub-search">
                            <select className="select-style" onChange={handleOptions}>
                                <option selected value="works">Works</option>
                                <option value="title">Title</option>
                            </select>
                            <button className="btn-go-search" onClick={(e) => searchTitle(valueSearchInput, controlePagina)} disabled={!inputControlSearch}>Go</button>
                        </div>

                    </div>
                    <table className="table">
                        <tr>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" >Authors</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description(s)</th>
                                    <th scope="col">url(s)</th>
                                    <th scope="col">Favorite</th>
                                </tr>
                            </thead>
                            {dbAuthors.length > 0 && dbAuthors.map((item, index) => {
                                return (
                                    <tbody>
                                        <tr key={index + 1} scope="row">
                                            <td>{item._source.authors.map(item => <ul className="ul-none"><li>{item}</li></ul>)}</td>
                                            <td>{item._type}</td>
                                            <td>{item._source.title}</td>
                                            <td>{item._source.description}</td>
                                            <td>{
                                                item._source.urls
                                                    .map(item => <ul className="ul-none">
                                                        <li><a href={item} target="_blank" rel="noreferrer" >{item}</a>
                                                        </li>
                                                    </ul>
                                                    )
                                            }
                                            </td>
                                            <td >
                                                <div className="btn-favorite">
                                                    <button className="btn-size-favorite" onClick={() => getId(item._id)}><FaStar size={30} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </tr>
                    </table>
                    <Pagination
                        controlePagina={controlePagina}
                        btnNext={btnNext}
                        btnPrevious={btnPrevious}
                        valueSearchInput={valueSearchInput}
                    />
                </div>
            }
        </div>
    );
}

export default Home;