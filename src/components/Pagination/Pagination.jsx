import React from "react";
import PaginationSelector from "../PaginationSelector/PaginationSelector";
import '../../index.css';


function Pagination({ setCurrentPage, pages, itensPerPage, setItensPerPage }) {
    return (
        <div className="ct-pagination">
            {Array.from(Array(pages), (item, index) => {
                return <button
                    className="button-pagination"
                    value={index}
                    onClick={(e) => setCurrentPage(Number(e.target.value))}
                >
                    {index + 1}
                </button>
            })}
            <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
        </div>
    );
}

export default Pagination;