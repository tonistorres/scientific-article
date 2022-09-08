import React from "react";
import '../../index.css';

function Pagination({ setCurrentPage, pages }) {
    return ( 
               <div className="ct-pagination">
                {Array.from(Array(pages), (item, index) => {
                    return <button
                        key={index}
                        className="button-pagination"
                        value={index}
                        onClick={(e) => setCurrentPage(Number(e.target.value))}
                    >
                        {index + 1}
                    </button>
                })}
            </div>
        );


}

export default Pagination;