import React from "react";
import '../../index.css';

function PaginationSelector({itensPerPage, setItensPerPage}) {
    return ( 
        <div className="ct-pagination-selector">
            
        <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))} className="selct-pagination">
        <option value={2} key="">2</option>
            <option value={5} key="">5</option>
            <option value={10} key="">10</option>
            <option value={15} key="">15</option>
            <option value={20} key="">20</option>
        </select>
    </div>
 
     );
}

export default PaginationSelector;