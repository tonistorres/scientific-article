import React, { useState, useEffect } from "react";
// import { apiCore } from '../../services/Api';
import { saveLocalStorage, searchLocalStorage } from '../../util/LocalStorage';
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import StarRating from "../../components/StarRating/StarRating";
import '../../index.css';

function Home() {

    const [dbAuthors, setAuthors] = useState([]);
    const [itensPerPage, setItensPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(dbAuthors.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = dbAuthors.slice(startIndex, endIndex)


    useEffect(() => {
        const handleApiCORE = async () => {
            try {

                //    removeAllLocalStorage() 
                // const response = await apiCore.get();
                // console.log(response.data.results);
                // setAuthors(response.data.results)
                // if (dbAuthors) {
                // saveLocalStorage('DadosAPI', response.data.results)
                const result = searchLocalStorage('DadosAPI')
                setAuthors(result)
                console.log(result);
                //    
                // }
            } catch (error) {
                console.log("Error useEffect in Home:", error);
            }
        }
        handleApiCORE();
    }, []);


    useEffect(() => {
        setCurrentPage(0)
    }, [itensPerPage])

    return (
        <div>
            <div className="ct-main-home">
                <Header />
                {/* <div> */}
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
                                            <td>{item.dataProviders.map(item => <ul className="ul-none"><li><a href={item.url} target="_blank" rel="noreferrer" >{item.url}</a></li></ul>)}</td>
                                            <td ><div className="btn-favorite"><StarRating/></div></td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </tr>
                    </table>
                {/* </div> */}
                <Pagination setCurrentPage={setCurrentPage} pages={pages} itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
            </div>
        </div>
    );
}

export default Home;
