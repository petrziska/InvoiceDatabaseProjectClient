import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";

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
        <div>
            <h1>Detail faktury č. {invoice.invoiceNumber}</h1>
            <hr />
            <h2>Obecné informace</h2>
            <p><strong>Datum vystavení:</strong> {invoice.issued}</p>
            <p><strong>Splatnost:</strong> {invoice.dueDate}</p>
            <p><strong>Produkt:</strong> {invoice.product}</p>
            <p><strong>Cena bez DPH:</strong> {invoice.price}</p>
            <p><strong>DPH:</strong> {invoice.vat} %</p>
            <p><strong>Poznámka:</strong> {invoice.note}</p>

            <hr />

            <h2>Odběratel</h2>
            <p><strong>Název:</strong> {invoice.buyer?.name}</p>
            <p><strong>IČO:</strong> {invoice.buyer?.identificationNumber}</p>
            <p><strong>DIČ:</strong> {invoice.buyer?.taxNumber}</p>
            <p><strong>Email:</strong> {invoice.buyer?.mail}</p>
            <p><strong>Telefon:</strong> {invoice.buyer?.telephone}</p>
            <p><strong>Adresa:</strong> {invoice.buyer?.street}, {invoice.buyer?.zip} {invoice.buyer?.city}, {invoice.buyer?.country}</p>
            <p><strong>Poznámka:</strong> {invoice.buyer?.note}</p>

            <hr />

            <h2>Dodavatel</h2>
            <p><strong>Název:</strong> {invoice.seller?.name}</p>
            <p><strong>IČO:</strong> {invoice.seller?.identificationNumber}</p>
            <p><strong>DIČ:</strong> {invoice.seller?.taxNumber}</p>
            <p><strong>Email:</strong> {invoice.selller?.mail}</p>
            <p><strong>Telefon:</strong> {invoice.seller?.telephone}</p>
            <p><strong>Adresa:</strong> {invoice.seller?.street}, {invoice.seller?.zip} {invoice.seller?.city}, {invoice.seller?.country}</p>
            <p><strong>Poznámka:</strong> {invoice.seller?.note}</p>
        </div>
    );
};

export default InvoiceDetail;