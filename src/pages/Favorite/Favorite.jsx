import React, { useState, useEffect } from "react";
import Header from '../../components/Header/Header';
import { FaStar } from 'react-icons/fa';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import '../../index.css';


function Favorite() {

    const [pageCurrent, setPageCurrent] = useState('Favorite')
    const [dbFavorite, setDbFavorite] = useState([])
    const [dbDisfavorLocalStorage, setDisfavor] = useState([])
    const [dbHome, setHome] = useState([])



    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbFavorite.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbFavorite.slice(startIndex, endIndex)


    // Logica corrigida: Buscando informção localStorage
    useEffect(() => {
        try {
            const result = searchLocalStorage("Favorites")
            setDbFavorite([...result])
            saveLocalStorage("Disfavor", [])
            saveLocalStorage("DbHome", [])  

        } catch (error) {
            console.log(`Erro useEffect Favorites:${error}`);
        }
    }, [])


    useEffect(() => {
        const searchDbHome = searchLocalStorage("DbHome")
        alert('SALVAR NO STORAGE SERÁ RS')
        if (searchDbHome.length === 0 && dbFavorite.length > 0) {
            saveLocalStorage("DbHome", dbFavorite)
        }
    }, [dbFavorite])


    // useEffect(() => {
    //     alert("Component WillUnMount")
    //     const searchFavorites = searchLocalStorage("Favorites")
    //     const searchDisfavor = searchLocalStorage("Disfavor")
    //     const searchDbHome = searchLocalStorage("DbHome")
    //     console.log('Favorite',searchFavorites.length);
    //     console.log('Disfavor',searchDisfavor.length);
    //     console.log('DbHome',searchDbHome.length);
    //      if(searchFavorites.length>0 && searchDisfavor.length===0 && searchDbHome.length===0){
    //         alert('salvando no localStorage')
    //         saveLocalStorage("DbHome",searchFavorites)
    //          return () => console.log('Salvo em DbHome localStorage');
    //      }

    // }, [dbHome])



    const getId = (id) => {
        const listFilter = dbFavorite.filter((item) => item.id !== id)
        setDbFavorite([...listFilter])
        const itemRemove = dbFavorite.filter((item) => item.id === id)
        console.log('Item removido:', itemRemove);
        setDisfavor([...dbDisfavorLocalStorage, ...itemRemove])
        alert('MODIFICANDO lista em dbFavorite')
    }


    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])



    // Escutador em dbFavorite component didUpdate
    useEffect(() => {
        // alert('Salvando no LocalStorage');
        saveLocalStorage("Disfavor", dbDisfavorLocalStorage)
        const renderHome = dbFavorite.filter(function (item) {
            return !dbDisfavorLocalStorage.includes(item)
        })
        saveLocalStorage("DbHome", [...renderHome])
    }, [dbDisfavorLocalStorage])

    return (
        <div>
            <div className="ct-main-home">
                <Header
                    favoriteItems={dbFavorite.length}
                    dbFavorite={dbFavorite}
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
                                <th scope="col">Disfavor</th>
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