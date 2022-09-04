import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
// import { apiCore } from '../../services/Api';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import '../../index.css';

function Home() {
    const [dbAuthors, setAuthors] = useState([]);
    const [dbFavorite, setFavorites] = useState([]);
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)


    const pages = (array) => {
        return Math.ceil(array.length / itensPerPage)
    }

    const currentItens = (array) => {
        const startIndex = currentPage * itensPerPage
        const endIndex = startIndex + itensPerPage
        return array.slice(startIndex, endIndex)
    }

  
    const renderList = (arrayListFull, arrayComparision) => {
        console.log('Observando:',arrayListFull, arrayComparision);
        if (arrayListFull.length && arrayComparision.length) {
            arrayListFull.filter(function (item) {
                return !arrayComparision.includes(item)
            })
        }

        if(!arrayListFull.length && !arrayComparision.length){
            return arrayListFull
        }

        if(!arrayListFull.length && arrayComparision.length){
            return arrayListFull
        }
        if(arrayListFull.length && !arrayComparision.length){
            return arrayListFull
        }
    }
console.log('Estou renderizando quem:',renderList(dbAuthors,dbFavorite));

    useEffect(() => {
        const handleApiCORE = async () => {
            try {

                //    removeAllLocalStorage() 
                // const response = await apiCore.get();
                // console.log(response.data.results);
                // setAuthors(response.data.results)
                // if (dbAuthors) {
                //  saveLocalStorage('DadosAPI', response.data.results)
                setAuthors(searchLocalStorage('DadosAPI'))
                // setFavorites(searchLocalStorage('DbHome'))
                // setRender(searchLocalStorage('DadosAPI'))

                //  }
            } catch (error) {
                console.log("Error useEffect in Home:", error);
            }
        }
        handleApiCORE();
    }, []);

    // Logica corrigida: verifyExist
    const getId = (id) => {
        const objectArticleFilter = dbAuthors.filter((item) => item.id === id)
        const verifyExist = dbFavorite.some((item) => item.id === id)
        console.log(verifyExist);
        if (!verifyExist) {
            setFavorites([...dbFavorite, ...objectArticleFilter])
            alert('SALVO')
        } else {
            alert('ITEM CADASTRADO')
        }
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])

    useEffect(() => {
       renderList(dbAuthors,dbFavorite)
    }, [dbFavorite])

  
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
                        {currentItens(dbAuthors).length > 0 && currentItens(dbAuthors).map((item) => {
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
                    pages={pages(currentItens(dbAuthors))}
                    itensPerPage={itensPerPage}
                    setItensPerPage={setItensPerPage}
                />
            </div>
        </div>
    );
}

export default Home;
