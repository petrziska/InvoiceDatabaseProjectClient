import React from "react";
import { Link } from "react-router-dom";

const InvoiceTable = ({label, items, deleteInvoice }) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.note}</td>
                            <td>
                                <div className="btn-group">
                                    <Link to={"/invoices/" + item._id} className="btn btn-sm btn-info">Detail faktury</Link>
                                    <Link to={"/invoices/edit/" + item._id} className="btn btn-sm btn-warning">Upravit fakturu</Link>
                                    <button onClick={() => deleteInvoice(item._id)} className="btn btn-sm btn-danger">Odstanit fakturu</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <Link to={"/invoices/create/"} className="btn btn-success">Vytvořit novou fakturu</Link>
        </div>
    );
};

export default InvoiceTable;