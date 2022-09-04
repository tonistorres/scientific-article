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
    const [dbHomeStateRender, setHomeState] = useState([])


    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbHomeStateRender.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbHomeStateRender.slice(startIndex, endIndex)

    const initialState = () => {
        // alert('Primeira Execução:initialState')

        try {
            const checkDisfavor = searchLocalStorage("Disfavor");
            const checkDbHome = searchLocalStorage("DbHome");
            const checkDbFavorite = searchLocalStorage("Favorite");
            console.log('----------------------------------------------------------');
            console.log('1: Checando se existe Disfavor e DbHome e checkDbFavorite ');
            console.log('1.1 - Disfavor(localStorage):', checkDisfavor);
            console.log('1.2 - Checando se existe DbHome(localStorage)', checkDbHome);
            console.log('1.3 - Checando Tamanho DbFavorite(localStorage)', checkDbFavorite);
            console.log('----------------------------------------------------------');

            if (checkDisfavor === null && checkDbHome === null) {
                console.log('* Criando as chaves Disfavor e DbHome');
                saveLocalStorage("Disfavor", [])
                saveLocalStorage("DbHome", [])
                console.log('1.1 - Disfavor(localStorage):', checkDisfavor);
                console.log('1.2 - Checando se existe DbHome(localStorage)', checkDbHome);
            }

            if (checkDbFavorite.length && checkDbHome.length === 0) {
                saveLocalStorage("DbHome", checkDbFavorite)
            }

            //    reloadUpdateDBLogicHomePage()

        } catch (error) {
            console.log(`Erro useEffect initialState:${error}`);
        }
    }


// trabalhando rederização de forma acoplada
    const reloadUpdateDBLogicHomePage = () => {
        try {
            setDbFavorite([...searchLocalStorage("Favorite")])
            setDisfavor([...searchLocalStorage("Disfavor")]) 
            // alert('reload execute')
            // console.log('dbFavorite',dbFavorite);
            // console.log('dbDisfavor',dbDisfavorLocalStorage);
            const renderHome = dbFavorite.filter(function (item) {
                return !dbDisfavorLocalStorage.includes(item)
            })
            // saveLocalStorage("DbHome", [...renderHome])
            setHomeState([...renderHome])

        } catch (error) {
            console.log(`Erro useEffect initialState:${error}`);
        }

    }

    useEffect(() => {
        try {
            initialState()
            
        } catch (error) {
            console.log(`Erro useEffect Favorite:${error}`);
        }
    }, [])

    useEffect(() => {
        try {
            // alert('3: useEffect dbHomeStateRender salvando localstorage')
            // console.log('UseEffectRender dbHomeStateRender', dbHomeStateRender);
            saveLocalStorage("DbHome", dbHomeStateRender)
        } catch (error) {
            console.log(`Erro useEffect HomeStateRender:${error}`);
        }
    }, [dbHomeStateRender])


    useEffect(() => {
        try {
            // alert('2:Escuta em dbDisfavorLocalStorage: Salve LocalStorage Disfavor e reloadUpdate')
            // console.log('2: dbFavorite useEffect:', dbFavorite);
            // console.log('3: dbDisfavor useEffect:', dbDisfavorLocalStorage);
            saveLocalStorage("Disfavor", dbDisfavorLocalStorage)
            reloadUpdateDBLogicHomePage()
        } catch (error) {
            console.log(`Erro useEffect itensPerPage:${error}`);
        }
    }, [dbDisfavorLocalStorage])


    useEffect(() => {
        try {
            setCurrentPage(0)
        } catch (error) {
            console.log(`Erro useEffect itensPerPage:${error}`);
        }
    }, [itensPerPage])


    // OLHAR COM CALMA ESSSA LOGICA
    // useEffect(() => {
    //     try {
    //         // alert('Linha Execução: UseEffect DbFavorite')
    //         const verifyDbhome = searchLocalStorage("DbHome")
    //         alert('SALVAR NO STORAGE SERÁ RS')
    //         if (searchDbHome.length && dbFavorite.length ) {
    //             saveLocalStorage("DbHome", dbFavorite)
    //         }
    //     } catch (error) {
    //         console.log(`Erro useEffect dbFavorite:${error}`);
    //     }

    // }, [dbFavorite])

    const getId = (id) => {
        try {
            setDbFavorite([...dbFavorite.filter((item) => item.id !== id)])
            setDisfavor([...dbDisfavorLocalStorage, ...dbFavorite.filter((item) => item.id === id)])
            console.log('1 array restante dbFavorites:', dbFavorite.filter((item) => item.id !== id));
            console.log('2: Item removido:', [...dbDisfavorLocalStorage, ...dbFavorite.filter((item) => item.id === id)]);
            // console.log('3: dbDisfavor:', dbDisfavorLocalStorage);
            alert('1 Qdo Click:MODIFICANDO lista em dbFavorite')
        } catch (error) {
            console.log(`Erro useEffect getId:${error}`);
        }
    }

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