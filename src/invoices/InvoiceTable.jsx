import React from "react";
import { Link } from "react-router-dom";

const InvoiceTable = ({label, items, deleteInvoice }) => {
    return (
        <div className="container mt-5 mb-4">
            <div className="card shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{label}</h5>
                    <span className="badge bg-secondary">{items.length}</span>
                </div>

                <div className="card-body p-0">
                    <table className="table table-hover mb-0 table-bordered">
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">{item.note}</td>
                                    <td className="align-middle text-center">
                                        <div className="btn-group">
                                            <Link to={"/invoices/" + item._id} className="btn btn-sm btn-outline-info">Detail faktury</Link>
                                            <Link to={"/invoices/edit/" + item._id} className="btn btn-sm btn-outline-warning">Upravit fakturu</Link>
                                            <button onClick={() => deleteInvoice(item._id)} className="btn btn-sm btn-outline-danger">Odstanit fakturu</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-end">
                    <Link to={"/invoices/create/"} className="btn btn-outline-success">Vytvořit novou fakturu</Link>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTable;