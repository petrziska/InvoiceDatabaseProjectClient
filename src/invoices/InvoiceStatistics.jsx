import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const InvoiceStatistics = () => {
    const [stats, setStats] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        apiGet("/api/invoices/statistics")
        .then(data => setStats(data))
        .catch((error) => setError("Nepodařilo se načíst statistiky."));
    }, []);

    if(error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h1>Statistiky faktur</h1>
            <hr />
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                    <span>Počet faktur:</span>
                    <strong>{stats.invoicesCount}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Součet za aktuální rok:</span>
                    <strong>{stats.currentYearSum} Kč</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Celkový součet všech faktur:</span>
                    <strong>{stats.allTimeSum} Kč</strong>
                </li>
            </ul>
        </div>
    );
};

export default InvoiceStatistics;