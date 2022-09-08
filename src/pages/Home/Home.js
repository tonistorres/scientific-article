import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { getWorks } from '../../services/Api';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import Load from "../../components/Loading/Load";
import '../../index.css';

function Home() {
    const NUMBER_PAGES_CONST = 1;
    const [dbAuthors, setAuthors] = useState([]);
    const [dbFavorite, setFavorites] = useState([]);
    const [dbStateOptions, setStateOptions] = useState('works');
    const [inputControlSearch, setInputControl] = useState(false);

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = dbAuthors.slice(startIndex, endIndex);

    useEffect(() => {
        if (dbStateOptions === 'works') {
            setInputControl(false);
        } else {
            setInputControl(true);
        }

    }, [dbStateOptions])


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
        setCurrentPage(0);
    }, [itensPerPage])




    useEffect(() => {
        const listRender = dbAuthors.reduce((acc, curr) => {
            const arr = dbFavorite.filter((e) => e._id === curr._id);
            if (arr.length < 1) {
                acc.push(curr);
            }
            return acc;
        }, [])

        setAuthors(listRender);

    }, [dbFavorite])


    const initialState = () => {
        try {
            feedInitial();
        } catch (error) {
            console.log(`Erro function initialState:${error}`);
        }
    }

    const checKeyFavoriteExist = () => {
        const responseFavorite = searchLocalStorage("Favorite");
        if (responseFavorite === null) {
            saveLocalStorage("Favorite", []);
            setFavorites([]);
        } else {
            setFavorites(responseFavorite)
        }
    }

    const searchAPI = async () => {
        try {
            let response = await getWorks(`/${dbStateOptions}?apiKey=${process.env.REACT_APP_API_KEY}`);
            checKeyFavoriteExist();
            setAuthors(response);

        } catch (error) {
            console.log(`Erro function searcAPI:${error}`);
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

    const paginationControl = () => {
        const checkListingResultLocalStorage = searchLocalStorage('ListResulting')
        if (!checkListingResultLocalStorage) {
            const pages = NUMBER_PAGES_CONST;
            return pages;
        } else {
            const pages = Number(Math.ceil(dbAuthors.length / itensPerPage));
            return pages;
        }
    }
    return (
        <div>
            {!currentItens.length ? <Load /> :
                <div className="ct-main-home">
                    <Header dbFavorite={dbFavorite} dbAuthors={dbAuthors} />
                    <div className="ct-search">
                        {inputControlSearch ? <input type="text" placeholder="type your search" /> : null}
                        <div className="ct-sub-search">
                            <select className="select-style">
                                <option selected value="works">Works</option>
                                {/* <option value="Authors">Authors</option> */}
                                {/* <option selected value="language">Language</option>                                 */}
                            </select>
                            <button className="btn-go-search">Go</button>
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
                            {currentItens.length > 0 && currentItens.map((item) => {
                                return (
                                    <tbody>
                                        <tr key={item._id} scope="row">
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
                        setCurrentPage={setCurrentPage}
                        pages={paginationControl()}
                        itensPerPage={itensPerPage}
                        setItensPerPage={setItensPerPage}
                    />
                </div>
            }
        </div>
    );
}

export default Home;