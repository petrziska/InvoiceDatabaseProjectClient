import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

/**
 * PersonStatistics - komponenta pro zobrazení statistik osob a jejich příjmů.
 *
 * Popis:
 * - Načítá statistiky osob z API volání na endpoint "/api/persons/statistics".
 * - V případě chyby zobrazí chybovou hlášku.
 * - Statistiky jsou zobrazeny v seznamu, kde každý řádek ukazuje:
 *   - jméno osoby (personName)
 *   - pořadové číslo osoby v seznamu
 *   - celkový příjem osoby (revenue), formátovaný jako číslo s oddělovači tisíců a měnou Kč.
*/

const PersonStatistics = () => {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        apiGet("/api/persons/statistics")
        .then(data => setStats(data))
        .catch((error) => setError("Nepodařilo se načíst statistiky."));
    }, []);

    if(error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Statistiky osob</h1>
            <div className="card shadow-sm">
                <div className="card-header bg-light fw-bold">
                    Přehled osob a jejích příjmů
                </div>
                <ul className="list-group list-group-flush">
                    {stats.map((person, index) => (
                        <li key={index} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="fw-semibold">{person.personName}</span>
                                    <div className="text-muted small">Osoba č. {index + 1}</div>
                                </div>
                                <span className="fs-5 fw-bold">
                                    {person.revenue.toLocaleString()} Kč
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PersonStatistics;