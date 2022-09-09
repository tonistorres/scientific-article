import React from "react";
import './Pagination.css';

function Pagination({ setCurrentPage, pages, btnNext,controlePagina,btnPrevious,valueSearchInput }) {
    return (
        <div className="ct-pagination">
             <button onClick={(e)=>btnPrevious(valueSearchInput, controlePagina)}>⬅️</button>
            {Array.from(Array(pages), (item, index) => {
                return <button
                    key={index}
                    className="button-pagination"
                    value={index}
                    onClick={(e) => setCurrentPage(Number(e.target.value))}
                >
                   <span><strong>Pagina:</strong>{controlePagina}</span> 
                </button>
            })}
            <button onClick={(e)=>btnNext(valueSearchInput,controlePagina)}>➡️</button>
        </div>

    );
}

export default Pagination;