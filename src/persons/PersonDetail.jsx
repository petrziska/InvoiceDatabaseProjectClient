
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import { apiGet } from "../utils/api";

import Country from "./Country";

/**
 * Komponenta PersonDetail zobrazuje detailní informace o osobě podle jejího ID.
 * 
 * - Načítá data osoby z API pomocí parametru `id` z URL (useParams).
 * - Používá stav `person` pro uložení načtených dat.
 * - Po načtení dat zobrazí informace o osobě v přehledné kartě.
 * - Převádí hodnotu země pomocí konstant z enumu `Country` na český název.
 * - Obsahuje odkazy na faktury vystavené a přijaté danou osobou (používá identifikační číslo).
 */

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});

    useEffect(() => {
        apiGet("/api/persons/" + id)
            .then((data) => {
                setPerson(data)
            })
            .catch((error) => {
                console.error(error)
            });
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div className="container mt-5">
                <h1 className="mb-4">Detail osoby</h1>
                <div className="card shadow-sm">
                    <div className="card-header bg-light">
                        <h3>{person.name} ({person.identificationNumber})</h3>
                    </div>

                    <div className="card-body">
                        <dl className="row mb-0">
                            <dt className="col-sm-3">DIČ:</dt>
                            <dd className="col-sm-9">{person.taxNumber}</dd>

                            <dt className="col-sm-3">Bankovní účet:</dt>
                            <dd className="col-sm-9">{person.accountNumber}/{person.bankCode} <br />
                                <small className="text-muted">IBAN: {person.iban}</small>
                            </dd>

                            <dt className="col-sm-3">Telefon:</dt>
                            <dd className="col-sm-9">{person.telephone}</dd>

                            <dt className="col-sm-3">E-mail:</dt>
                            <dd className="col-sm-9">{person.mail}</dd>

                            <dt className="col-sm-3">Sídlo:</dt>
                            <dd className="col-sm-9">
                                {person.street}, {person.city}, {person.zip}, {country}
                            </dd>

                            <dt className="col-sm-3">Poznámka:</dt>
                            <dd className="col-sm-9">{person.note}</dd>
                        </dl>    
                    </div>
                
                    <div className="card-footer bg-light d-flex justify-content-start gap-2">
                        <Link to={`/identification/${person.identificationNumber}/sales`} className="btn btn-outline-primary btn-sm">
                            Vystavené faktury
                        </Link>

                        <Link to={`/identification/${person.identificationNumber}/purchases`} className="btn btn-outline-secondary btn-sm">
                            Přijaté faktury
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonDetail;
