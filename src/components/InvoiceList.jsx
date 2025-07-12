import React, { useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

/**
 *  * InvoiceList je komponenta, která zobrazuje seznam vystavených nebo přijatých faktur
 * pro danou osobu na základě jejího IČ (identifikačního čísla). Data se načítají z REST API
 * na základě parametru z URL a z prop `type`.
 */
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
        <div className="container mt-4">
            <h2 className="mb-4">
                {type === "sales" ? "Vystavené faktury" : "Přijaté faktury"} osoby s IČ: <strong>{identificationNumber}</strong>
            </h2>
            {invoices.length === 0 ? (
                <div className="alert alert-info">Žádné faktury nebyly nalezeny.</div>
            ) : (
            
                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
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
                                            <Link to={"/invoices/" + invoice._id} className="btn btn-sm btn-outline-primary">
                                            Detail faktury
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>    
                </div>
            )}
        </div>
    );
};

export default InvoiceList;