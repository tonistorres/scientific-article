import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
// import { apiCore, apiCoreEndPoint } from '../../services/Api';

import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import '../../index.css';

function Home() {
    const [dbAuthors, setAuthors] = useState([]);
    const [dbFavorite, setFavorites] = useState([]);

    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbAuthors.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbAuthors.slice(startIndex, endIndex)


    const initialState = () => {
        try {
            saveLocalStorage("Disfavor", []);
            saveLocalStorage("DbHome", []);
            verifyKeyDbAuthorsExistLocalStorage();
            verifyKeyFavoriteExistLocalStorage();
        } catch (error) {
            console.log(`Erro function initialState:${error}`);
        }

    }


    const verifyKeyDbAuthorsExistLocalStorage = () => {
        const checkKey = searchLocalStorage('DadosAPI');
        if (!checkKey) {
            saveLocalStorage("DadosAPI", [])
            setAuthors([])
        }
        setAuthors(searchLocalStorage('DadosAPI'));
    }


    const verifyKeyFavoriteExistLocalStorage = () => {
        const checkKey = searchLocalStorage("Favorite");
        if (!checkKey) {
            saveLocalStorage("Favorite", [])
            setFavorites([])
        }
        setFavorites(searchLocalStorage('Favorite'));
    }




    useEffect(() => {
        const handleApiCORE = async () => {
            try {
                initialState()

                //    removeAllLocalStorage() 
                // const response = await apiCore.get();
                // console.log(response.data.results);
                // setAuthors(response.data.results)
                // if (dbAuthors) {
                //  saveLocalStorage('DadosAPI', response.data.results)

                // setFavorites(searchLocalStorage('DbHome'))
                // setRender(searchLocalStorage('DadosAPI'))

                //  }
            } catch (error) {
                console.log("Error useEffect in Home:", error);
            }
        }
        handleApiCORE();
    }, []);


    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])


    const getId = (id) => {
        const addItemFilter = dbAuthors.filter((item) => item.id !== id);
        setAuthors([...addItemFilter])
        const itemAddFavorite = dbAuthors.filter((item) => item.id === id)
        setFavorites([...dbFavorite, ...itemAddFavorite]);
        saveLocalStorage("Favorite", dbFavorite);
    }

    return (
        <div>
            <div className="ct-main-home">
                <h1>{`dbAuthors:${dbAuthors.length}`}</h1>
                <h1>{`dbFavorites:${dbFavorite.length}`}</h1>
           
                <Header
                    favoriteItems={dbFavorite.length}
                    dbFavorite={dbFavorite}
                />
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
                                    <tr key={item.id} scope="row">
                                        <td>{item.authors.map(item => <ul className="ul-none"><li>{item.name}</li></ul>)}</td>
                                        <td>{item.links.map(item => <ul className="ul-none"><li>{item.type}</li></ul>)}</td>
                                        <td>{item.title}</td>
                                        <td>{item.abstract}</td>
                                        <td>{
                                            item.dataProviders
                                                .map(item => <ul className="ul-none">
                                                    <li><a href={item.url} target="_blank" rel="noreferrer" >{item.url}</a>
                                                    </li>
                                                </ul>
                                                )
                                        }
                                        </td>
                                        <td >
                                            <div className="btn-favorite">
                                                <button className="btn-size-favorite" onClick={() => getId(item.id)}><FaStar size={30} /></button>
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
                    pages={pages}
                    itensPerPage={itensPerPage}
                    setItensPerPage={setItensPerPage}
                />
            </div>
        </div>
    );
}

export default Home;
