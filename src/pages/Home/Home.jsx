import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { apiCore } from '../../services/Api';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import '../../index.css';

function Home() {
    const [dbAuthors, setAuthors] = useState([]);
    // const [dbOperations, setOperations] = useState([]);
    const [dbFavorite, setFavorites] = useState([])

    const arrayRender = dbAuthors.filter(function(item){
        return !dbFavorite.includes(item)
    })
    console.log('ArrayRender:',arrayRender);
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbAuthors.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = arrayRender.slice(startIndex, endIndex)




    useEffect(() => {
        const handleApiCORE = async () => {
            try {

                //    removeAllLocalStorage() 
                // const response = await apiCore.get();
                // console.log(response.data.results);
                // setAuthors(response.data.results)
                // if (dbAuthors) {
                //  saveLocalStorage('DadosAPI', response.data.results)
                const result = searchLocalStorage('DadosAPI')
                setAuthors(result)


                //  console.log(result);

                //  }
            } catch (error) {
                console.log("Error useEffect in Home:", error);
            }
        }
        handleApiCORE();
    }, []);

    // Logica corrigida: Salvando dbFavorites
    const getId = (id) => {
        console.log('iD', id);
        const objectArticleFilter = currentItens.filter((item) => item.id === id)
        const verifyExist = dbFavorite.filter((item) => item.id === id)
        console.log(verifyExist);
        if (!verifyExist || verifyExist.length === 0) {
            setFavorites([...dbFavorite, ...objectArticleFilter])
            console.log('Render:',arrayRender);
            alert('SALVO')
        } else {

            alert('ITEM CADASTRADO')
        }

    }

    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])


    // const verifyLogN = () => {
    //     for (let i = 0; i < dbAuthors.length; i++) {

    //         for (let j = 0; j < dbFavorite.length; j++) {
    //             if (dbAuthors[i].id === dbFavorite[j].id) {
    //                 // dbOperations.push(dbAuthors[i])
    //                 setOperations([...dbOperations,dbAuthors[i]])
    //             }
    //         }
    //     }
    // }
    // Logica corrigida: Escutador em dbFavorites, MUDOU/ATUALIZOU
    useEffect(() => {
        // alert('Home useEffect ESCUTA UPDATE dbFavorites');
        saveLocalStorage("Favorites", dbFavorite)
        saveLocalStorage("Length", dbFavorite.length)
        // verifyLogN()

    }, [dbFavorite])




    // useEffect(() => {
    //     alert('ESCUTA OPERATIONS');
    //     saveLocalStorage("Operations", dbOperations)
    //     saveLocalStorage("LenOperations", dbOperations.length)
    //     console.log(dbOperations);
    // }, [dbOperations])


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

export default Home;
