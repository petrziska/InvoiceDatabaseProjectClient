import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";

/**
 * Komponenta `InvoiceDetail` načítá detailní informace o konkrétní faktuře
 * pomocí jejího ID z URL (parametr `:id`) a zobrazuje je v přehledné formě.
 * 
 * Zahrnuje sekce: obecné informace, odběratel a dodavatel.
 */

const InvoiceDetail = () => {

    const { id } = useParams();
    const [invoice, setInvoice] = useState({});

    console.log("Získané ID z URL:", id);

    useEffect(() => {
        apiGet("/api/invoices/" + id)
            .then((data) => {
                setInvoice({
                    issued: data.issued,
                    dueDate: data.dueDate,
                    product: data.product,
                    price: data.price,
                    vat: data.vat,
                    note: data.note,
                    invoiceNumber: data.invoiceNumber,
                    buyer: {
                        name: data.buyer.name,
                        identificationNumber: data.buyer.identificationNumber,
                        taxNumber: data.buyer.taxNumber,
                        accountNumber: data.buyer.accountNumber,
                        bankCode: data.buyer.bankCode,
                        iban: data.buyer.iban,
                        telephone: data.buyer.telephone,
                        mail: data.buyer.mail,
                        street: data.buyer.street,
                        zip: data.buyer.zip,
                        city: data.buyer.city,
                        country: data.buyer.country,
                        note: data.buyer.note,
                    },
                    seller: {
                        name: data.seller.name,
                        identificationNumber: data.seller.identificationNumber,
                        taxNumber: data.seller.taxNumber,
                        accountNumber: data.seller.accountNumber,
                        bankCode: data.seller.bankCode,
                        iban: data.seller.iban,
                        telephone: data.seller.telephone,
                        mail: data.seller.mail,
                        street: data.seller.street,
                        zip: data.seller.zip,
                        city: data.seller.city,
                        country: data.seller.country,
                        note: data.seller.note,
                    },
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const dueDate = new Date(invoice.dueDate).toLocaleString();
    const issued = new Date(invoice.issued).toLocaleString();

    return (
        <div className="container mt-5 mb-4">
            <h1 className="mb-4">Detail faktury č. {invoice.invoiceNumber}</h1>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <h2>Obecné informace</h2>
                </div>
                <div className="card-body">
                    <dl className="row mb-0">
                        <dt className="col-sm-3">Datum vystavení:</dt> 
                        <dd className="col-sm-9">{invoice.issued}</dd>

                        <dt className="col-sm-3">Splatnost:</dt>
                        <dd className="col-sm-9">{invoice.dueDate}</dd>

                        <dt className="col-sm-3">Produkt:</dt>
                        <dd className="col-sm-9">{invoice.product}</dd>

                        <dt className="col-sm-3">Cena bez DPH:</dt>
                        <dd className="col-sm-9">{invoice.price}</dd>

                        <dt className="col-sm-3">DPH:</dt>
                        <dd className="col-sm-9">{invoice.vat}</dd>

                        <dt className="col-sm-3">Poznámka:</dt>
                        <dd className="col-sm-9">{invoice.note}</dd>
                    </dl>
                </div>

                <div className="card-header bg-light">
                    <h2>Odběratel</h2>
                </div>
                <div className="card-body">
                    <dl className="row mb-0">
                        <dt className="col-sm-3">Název:</dt> 
                        <dd className="col-sm-9">{invoice.buyer?.name}</dd>

                        <dt className="col-sm-3">IČO:</dt>
                        <dd className="col-sm-9">{invoice.buyer?.identificationNumber}</dd>

                        <dt className="col-sm-3">DIČ:</dt>
                        <dd className="col-sm-9">{invoice.buyer?.taxNumber}</dd>

                        <dt className="col-sm-3">Email:</dt>
                        <dd className="col-sm-9">{invoice.buyer?.mail}</dd>

                        <dt className="col-sm-3">Telefon:</dt>
                        <dd className="col-sm-9">{invoice.buyer?.telephone}</dd>

                        <dt className="col-sm-3">Adresa:</dt>
                        <dd className="col-sm-9">{invoice.buyer?.street}, {invoice.buyer?.zip} {invoice.buyer?.city}, {invoice.buyer?.country}</dd>

                        <dt className="col-sm-3">Poznámka:</dt>
                        <dd className="col-sm-9">{invoice.buyer?.note}</dd>
                    </dl>
                </div>

                <div className="card-header bg-light">
                    <h2>Dodavatel</h2>
                </div>
                <div className="card-body">
                    <dl className="row mb-0">
                        <dt className="col-sm-3">Název:</dt> 
                        <dd className="col-sm-9">{invoice.seller?.name}</dd>

                        <dt className="col-sm-3">IČO:</dt>
                        <dd className="col-sm-9">{invoice.seller?.identificationNumber}</dd>

                        <dt className="col-sm-3">DIČ:</dt>
                        <dd className="col-sm-9">{invoice.seller?.taxNumber}</dd>

                        <dt className="col-sm-3">Email:</dt>
                        <dd className="col-sm-9">{invoice.seller?.mail}</dd>

                        <dt className="col-sm-3">Telefon:</dt>
                        <dd className="col-sm-9">{invoice.seller?.telephone}</dd>

                        <dt className="col-sm-3">Adresa:</dt>
                        <dd className="col-sm-9">{invoice.seller?.street}, {invoice.seller?.zip} {invoice.seller?.city}, {invoice.seller?.country}</dd>

                        <dt className="col-sm-3">Poznámka:</dt>
                        <dd className="col-sm-9">{invoice.seller?.note}</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetail;