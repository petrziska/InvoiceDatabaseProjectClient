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
        <div className="container mt-5">
            <h1 className="mb-4">Statistiky faktur</h1>
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white fw-semibold">
                    Přehled fakturačních údajů
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>Počet faktur:</strong></span>
                        <span className="fs-5 fw-bold">{stats.invoicesCount}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>Součet za aktuální rok:</strong></span>
                        <span className="fs-5 fw-bold">{stats.currentYearSum} Kč</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>Celkový součet všech faktur:</strong></span>
                        <span className="fs-5 fw-bold">{stats.allTimeSum.toLocaleString()} Kč</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InvoiceStatistics;