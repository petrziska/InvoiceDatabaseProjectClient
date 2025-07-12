/**
 * PersonTable - komponenta pro zobrazení tabulky osob.
 */

import React from "react";
import {Link} from "react-router-dom";

const PersonTable = ({label, items, deletePerson}) => {
    return (
        <div className="container mt-5 mb-4">
            <div className="card shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{label}</h5>
                    <span className="badge bg-secondary">{items.length}</span>
                </div>

                <div className="card-body p-0">
                    <table className="table table-bordered table-hover mb-0">
                        <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Jméno</th>
                            <th colSpan={3} className="align-middle text-center">Akce</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index + 1}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">{item.name}</td>
                                <td className="align-middle text-center">
                                    <div className="btn-group">
                                        <Link
                                            to={"/persons/show/" + item._id}
                                            className="btn btn-sm btn-outline-info"
                                        >
                                            Detail osoby
                                        </Link>
                                        <Link
                                            to={"/persons/edit/" + item._id}
                                            className="btn btn-sm btn-outline-warning"
                                        >
                                            Upravit osobu
                                        </Link>
                                        <button
                                            onClick={() => deletePerson(item._id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            Odstranit osobu
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-end">
                    <Link to={"/persons/create"} className="btn btn-outline-success">
                        Vytvořit novou osobu
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PersonTable;
