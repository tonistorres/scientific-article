import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { apiCore, apiCoreEndPoint } from '../../services/Api';

import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import Load from "../../components/Loading/Load";
import '../../index.css';

function Home() {
    const NUMBER_PAGES_CONST=1;
    const [load, setLoad] = useState(false);
    const [dbAuthors, setAuthors] = useState([]);
    const [dbFavorite, setFavorites] = useState([]);
    
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbAuthors.slice(startIndex, endIndex)

    const paginationControl =()=>{
        const checkListingResultLocalStorage = searchLocalStorage('ListResulting')
        if(!checkListingResultLocalStorage){
            const pages = NUMBER_PAGES_CONST;
            return pages;
        }else{
            const pages =Number( Math.ceil(dbAuthors.length / itensPerPage));
            return pages;
        }
    }

    // corrigida
    const searchAPI = async () => {
        const response = await apiCoreEndPoint.get();
        setAuthors(response.data.data)
        setLoad(true)
    }


    // corrigida: Ambos nulos no localStorage
    const feedInitial =() =>{
        const dataFavorite = searchLocalStorage("Favorite");
        const listResulting = searchLocalStorage("listResulting")
        if(dataFavorite===null && listResulting===null){
            searchAPI();
        }
    }


    const feedInitialFull =()=>{
        alert('Full')
        const dataFavorite = searchLocalStorage("Favorite");
        const listResulting = searchLocalStorage("listResulting");
        console.log('dataFavorite',typeof(dataFavorite));
        console.log('listingResulting',typeof(listResulting));

        console.log('Data Favorite',[...dataFavorite]);
        console.log('Data Listing',[...listResulting]);
        //  if(dataFavorite.length && listResulting.length){
        //      searchAPI();
        //      setFavorites(dataFavorite)
        //     setLoad(true)
        //  }

        setLoad(true)
    }

    const feedCheckFavoriteFullListingEmpty =()=>{
        alert('Empty')
        const dataFavorite = searchLocalStorage("Favorite");
        const listResulting = searchLocalStorage("listResulting")
        if(dataFavorite.length && !listResulting.length){
            setFavorites(dataFavorite)
            setLoad(true)
        }
    }


    const initialState = () => {
        try {
            saveLocalStorage("Disfavor", []);
            saveLocalStorage("DbHome", []);
            feedInitial();
            feedInitialFull();

            // feedCheckFavoriteFullListingEmpty();
            // feedCheckFavoriteFullListingContainSize();
            setLoad(true)
        } catch (error) {
            console.log(`Erro function initialState:${error}`);
        }
    }

   
    // const callingVerifyDbAuthors = () => {
    //     if (dbAuthors.length) {
    //         alert('Acessei Deu BOm')
    //         verifyDbAuthors();
    //     } else {
    //         alert('The state not feed')
    //     }

    // }


    // const verifyDbAuthors = () => {
    //     alert('Consegui entrar em DbAuthors')
    //     // verifyFavorite();

    // // criar uma função buscar direto da api
    // const checKeyAPI = searchLocalStorage('DadosAPI');
    // const checKeyFavorite = searchLocalStorage('Favorite');

    // if (!checKeyAPI) {
    //     // alert('CRIANDO CHAVE API')
    //     saveLocalStorage("DadosAPI", [])
    //     setAuthors([])
    // }

    // if (!checKeyFavorite.length) {
    //     // alert('PEGANDO DA API')
    //     setAuthors(searchLocalStorage('DadosAPI'));
    // } 

    // if(checKeyFavorite.length && checKeyAPI.length){
    //     // alert('PEGANDO ListResulting')
    //     setAuthors(searchLocalStorage('ListResulting'));
    // }

    // }


    const verifyFavorite = () => {
        const checkKey = searchLocalStorage("Favorite");
        if (!checkKey) {
            saveLocalStorage("Favorite", []);
            setFavorites([]);
        } else {
            setFavorites(searchLocalStorage('Favorite'));
        }
    }


    // lógica corrigida
    useEffect(() => {
        const handleApiCORE = async () => {
            try {
                initialState()
            } catch (error) {
                console.log("Error useEffect in Home:", error);
            }
        }
        handleApiCORE();
    }, []);


    // observar se for fazer pesquisa
    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])


    //Revisar lógica
    const getId = (id) => {
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
    }
    // console.log('-------------aqui------',dbAuthors.length)
    return (
        
        <div>
            {
                !load ? <Load /> :
                    <div className="ct-main-home">
                        <Header
                            dbFavorite={dbFavorite}
                            
                            dbAuthors={dbAuthors}
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
