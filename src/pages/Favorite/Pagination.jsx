import React from "react";
import './PaginationFavorite.css';

function Pagination({ setCurrentPage, pages }) {
    return (
        <div className="ct-pagination-favorite">
            <div className="ct-butons">
            {Array.from(Array(pages), (item, index) => {
                return (
                    // <div >
                        <button
                            key={index}
                            className="btn-pagination"
                            value={index}
                            onClick={(e) => setCurrentPage(Number(e.target.value))}
                        >
                            <strong>{index + 1}</strong>

                        </button>
                    // </div>
                )
            })}
            </div>
        </div>
    );


}

export default Pagination;