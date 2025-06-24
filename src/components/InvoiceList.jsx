import React, { useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceList = ({ type }) => {
    const { identificationNumber } = useParams();
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiGet(`/api/identification/${identificationNumber}/${type}`)
            .then(data => setInvoices(data))
            .catch((error) => console.error("Chyba při načtení faktur:", error));
    }, [identificationNumber, type]);

    return (
        <div>
            <h2>
                {type === "sales" ? "Vystavené faktury" : "Přijaté faktury"} osoby s IČ: {identificationNumber}
            </h2>
            {invoices.length === 0 ? (
                <p>Žádné faktury nebyly nalezeny.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Produkt</th>
                            <th>Cena</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.product}</td>
                                <td>{invoice.price}</td>
                                <td>
                                    <Link to={"/invoices/" + invoice._id} className="btn btn-sm btn-primary">
                                    Detail faktury
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default InvoiceList;