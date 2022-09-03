import React, { useState, useEffect } from "react";
import Header from '../../components/Header/Header';
import { FaStar } from 'react-icons/fa';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import '../../index.css';


function Favorite() {

    const [pageCurrent, setPageCurrent] = useState('Favorite')
    const [dbFavoriteLocalStorage, setDbFavorite] = useState([])
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbFavoriteLocalStorage.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbFavoriteLocalStorage.slice(startIndex, endIndex)


    // Logica corrigida: Buscando informção localStorage
    useEffect(() => {
        try {
            const result = searchLocalStorage("Favorites")
            setDbFavorite([...result])
        } catch (error) {
            console.log(`Erro useEffect Favorites:${error}`);
        }
    }, [])


    const getId = (id) => {
        const listFilter = dbFavoriteLocalStorage.filter((item) => item.id !== id)
        setDbFavorite(listFilter)
        alert('MODIFICANDO lista em dbFavoriteLocalStorage')
        console.log('Lista Filter Favorites:', listFilter);

    }

    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])



    useEffect(() => {
        alert('ESCUTEI dbFavoriteLocalStorage foi ALTERADO. Vou já efetuar a logica');
        saveLocalStorage("Desfavoritado", dbFavoriteLocalStorage)
        saveLocalStorage("Length", dbFavoriteLocalStorage.length)
    }, [dbFavoriteLocalStorage])


    return (
        <div>
            <div className="ct-main-home">
                <Header
                    favoriteItems={dbFavoriteLocalStorage.length}
                    dbFavorite={dbFavoriteLocalStorage}
                    pageCurrent={pageCurrent}
                />
                <table class="table">
                    <tr>
                        <thead class="thead-light">
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

export default Favorite;