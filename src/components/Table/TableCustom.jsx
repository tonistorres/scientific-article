import React from "react";
import { FaStar } from 'react-icons/fa';


function TableArticle({dbAuthors,getId}) {
    return (  
        <table className="table">
        <tr>
            <thead className="thead-light">
                <tr>
                    <th scope="col width: 10%"  >Authors</th>
                    <th scope="col width: 10%" >Type</th>
                    <th scope="col width: 10%" >Title</th>
                    <th scope="col width: 10%" >Description(s)</th>
                    <th scope="col width: 10%">url(s)</th>
                    <th scope="col width: 10%">Favorite</th>
                </tr>
            </thead>
            {dbAuthors.length > 0 && dbAuthors.map((item, index) => {
                return (
                    <tbody>
                        <tr key={index + 1} scope="row">
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

    );
}

export default TableArticle;