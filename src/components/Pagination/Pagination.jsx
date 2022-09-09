import React from "react";
import './Pagination.css';

function Pagination({ setCurrentPage, pages, btnNext, controlePagina, btnPrevious, valueSearchInput }) {
    return (
        <div className="ct-pagination">
            <div className="ct-buttons">

                <button
                    onClick={(e) => btnPrevious(valueSearchInput, controlePagina)}
                    className="btn-pagination">
                    Previous
                </button>

                {Array.from(Array(pages), (item, index) => {
                    return <div
                        key={index}
                        className="div-pagination"
                        value={index}
                        onClick={(e) => setCurrentPage(Number(e.target.value))}
                    >
                        <span>pg:{controlePagina}</span>
                    </div>
                })}

                <button
                    onClick={(e) => btnNext(valueSearchInput, controlePagina)}
                    className="btn-next">
                    Next
                </button>

            </div>
        </div>

    );
}

export default Pagination;