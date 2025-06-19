import React from "react";
import { Link } from "react-router-dom";

const InvoiceTable = ({label, items}) => {
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
                                    <Link to={"/invoices/" + item._id} className="btn btn-sm btn-info">
                                        Detail faktury
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;