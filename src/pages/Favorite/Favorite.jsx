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
    // const [dbHomeState, setHomeState] = useState([])


    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbFavorite.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbFavorite.slice(startIndex, endIndex)


    // alert('Pontas Soltas')


    const initialState = () => {
        try {
            const resultDisfavor = searchLocalStorage("Disfavor")
            const resultDbHome = searchLocalStorage("DbHome")
            
            if(resultDisfavor===null && resultDbHome===null){
                alert('Execute initialState')
                saveLocalStorage("Disfavor", [])
                saveLocalStorage("DbHome", []) 
            }    
        } catch (error) {
            console.log(`Erro useEffect initialState:${error}`);
        }
    }

    initialState()
    

    // Logica corrigida: Buscando informção localStorage
    useEffect(() => {
        try {
            // alert('Linha Execução: DidMount')
            const result = searchLocalStorage("Favorites")
            setDbFavorite([...result])
            
        } catch (error) {
            console.log(`Erro useEffect Favorites:${error}`);
        }
    }, [])


    useEffect(() => {
        try {
            alert('Linha Execução: UseEffect DbFavorite')
            const searchDbHome = searchLocalStorage("DbHome")
            alert('SALVAR NO STORAGE SERÁ RS')
            if (searchDbHome.length === 0 && dbFavorite.length > 0) {
                saveLocalStorage("DbHome", dbFavorite)
            }
        } catch (error) {
            console.log(`Erro useEffect dbFavorite:${error}`);
        }

    }, [dbFavorite])





    const getId = (id) => {
        const listFilter = dbFavorite.filter((item) => item.id !== id)
        setDbFavorite([...listFilter])
        const itemRemove = dbFavorite.filter((item) => item.id === id)
        console.log('Item removido:', itemRemove);
        setDisfavor([...dbDisfavorLocalStorage, ...itemRemove])
        alert('MODIFICANDO lista em dbFavorite')
    }


    useEffect(() => {
        try {
            alert('Linha Execução: itensPerPage')
            setCurrentPage(0)
        } catch (error) {
            console.log(`Erro useEffect itensPerPage:${error}`);
        }

    }, [itensPerPage])



    // Escutador em dbFavorite component didUpdate
    useEffect(() => {
        // alert('Linha Execução: dbDisfavorLocalTorage')

        try {

            saveLocalStorage("Disfavor", dbDisfavorLocalStorage)
            const renderHome = dbFavorite.filter(function (item) {
                return !dbDisfavorLocalStorage.includes(item)
            })
            saveLocalStorage("DbHome", [...renderHome])
        } catch (error) {
            console.log(`Erro useEffect itensPerPage:${error}`);
        }


    }, [dbDisfavorLocalStorage])

    return (

        <div>
            {/* {alert('Render')} */}
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