import React, { useState, useEffect } from "react";
import Header from '../../components/Header/Header';
import { FaStar } from 'react-icons/fa';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import '../../index.css';


function Favorite() {

    const [pageCurrent, setPageCurrent] = useState('Favorite')
    const [dbFavorite, setDbFavorite] = useState([]) // precisa 
    const [dbDisfavorLocalStorage, setDisfavor] = useState([]) // precisa
    const [dbHomeStateRender, setHomeState] = useState([]) // precisa 


    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbFavorite.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbFavorite.slice(startIndex, endIndex);


    const initialState = async () => {
        try {
            const checkDbFavorite = await searchLocalStorage("Favorite");
            const checkDisfavor = await searchLocalStorage("Disfavor");
            if (checkDbFavorite.length && !checkDisfavor.length) {
                // alert('if')
                setDbFavorite(checkDbFavorite)
                setHomeState(checkDbFavorite)
                saveLocalStorage("DbHome", checkDbFavorite)
            }else{
                // alert('else')
                setDbFavorite(checkDbFavorite)
                setDisfavor(checkDisfavor)
               
             

            const feedingFavoriteList = await searchLocalStorage("Favorite")
            setDbFavorite([...feedingFavoriteList])
            
            }
        } catch (error) {
            console.log(`Erro function initialState:${error}`);
        }
    }

    useEffect(() => {
        try {
            initialState() // 1ª execução 

        } catch (error) {
            console.log(`Erro useEffect Favorite:${error}`);
        }
    }, [])


    const renderPageFavorite = (arrayFavorite, arrayDisfavor) => {
        return arrayFavorite.filter(function (item) {
            return !arrayDisfavor.includes(item)
        })
    }

    const getId = (id) => {
        const addInListResulting = searchLocalStorage('ListResulting');
        const listFilter = dbFavorite.filter((item) => item.id !== id)
        setDbFavorite([...listFilter])
        console.log(listFilter);
        saveLocalStorage("Favorite",[...listFilter]) // ficar de olho nessa alteração
        const itemRemove = dbFavorite.filter((item) => item.id === id)
        setDisfavor([...dbDisfavorLocalStorage, ...itemRemove])
        saveLocalStorage("Disfavor", [...dbDisfavorLocalStorage,...itemRemove])
        saveLocalStorage('ListResulting',[...addInListResulting,...itemRemove])
        alert('MODIFICANDO lista em dbFavorite')
    }


    useEffect(() => {
        try {
            setCurrentPage(0)
        } catch (error) {
            console.log(`Erro useEffect itensPerPage:${error}`);
        }
    }, [itensPerPage])

    return (

        <div>
            <div className="ct-main-home">
                <Header
                    favoriteItems={dbFavorite.length}
                    dbAuthors={currentItens.length}
                    dbFavorite={dbFavorite}
                    pageCurrent={pageCurrent}
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
                    pages={pages}
                    itensPerPage={itensPerPage}
                    setItensPerPage={setItensPerPage}
                />
            </div>
        </div>
    );
}

export default Favorite;