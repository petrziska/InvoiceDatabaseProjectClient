import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";

const InvoiceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [buyerList, setBuyerList] = useState([]);
    const [sellerList, setSellerList] = useState([]);

    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [buyer, setBuyer] = useState("");
    const [seller, setSeller] = useState("");
    const [issued, setIssued] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState(0);
    const [vat, setVat] = useState(0);
    const [note, setNote] = useState("");

    const [sent, setSent] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "invoiceNumber") setInvoiceNumber(value);
        else if (name === "buyer") setBuyer(value);
        else if (name === "seller") setSeller(value);
        else if (name === "issued") setIssued(value);
        else if (name === "dueDate") setDueDate(value);
        else if (name === "product") setProduct(value);
        else if (name === "price") setPrice(Number(value));
        else if (name === "vat") setVat(Number(value));
        else if (name === "note") setNote(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            invoiceNumber,
            seller: {"_id": seller},
            buyer: {"_id": buyer},
            issued,
            dueDate,
            product,
            price: Number(price),
            vat: Number(vat),
            note,
        };

        (id
            ? apiPut("/api/invoices/" + id, body)
            : apiPost("/api/invoices", body)
        )
            .then((data) => {
                console.log("success", data);
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };


    useEffect(() => {
        apiGet("/api/persons").then((data) => {
            setBuyerList(data);
            setSellerList(data);
        });

        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoiceNumber(data.invoiceNumber);
                setBuyer(data.buyer._id);
                setSeller(data.seller._id);
                setIssued(data.issued);
                setDueDate(data.dueDate);
                setProduct(data.product);
                setPrice(data.price);
                setVat(data.vat);
                setNote(data.note);
            });
        }
    }, [id]);

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {error && <div className="alert alert-danger">{error}</div>}
            {sent && success && (
                <FlashMessage theme="success" text="Faktura byla úspěšně uložena." />
            )}

            <form onSubmit={handleSubmit}>
                <InputField 
                    required
                    name="invoiceNumber"
                    type="number"
                    label="Číslo faktury"
                    prompt="Zadejte číslo"
                    value={invoiceNumber}
                    handleChange={handleChange}
                />
                <InputSelect 
                    required
                    name="buyer"
                    label="Kupující"
                    prompt="Vyberte kupujícího"
                    items={buyerList}
                    value={buyer}
                    handleChange={handleChange}
                />
                <InputSelect 
                    required
                    name="seller"
                    label="Prodávající"
                    prompt="Vyberte prodávajícího"
                    items={sellerList}
                    value={seller}
                    handleChange={handleChange}
                />
                <InputField 
                    required
                    name="issued"
                    type="date"
                    label="Datum vystavení"
                    prompt="Zadejte datum"
                    value={issued}
                    handleChange={handleChange}
                />
                <InputField 
                    required
                    name="dueDate"
                    type="date"
                    label="Datum splatnosti"
                    prompt="Zadejte datum"
                    value={dueDate}
                    handleChange={handleChange}
                />
                <InputField 
                    required
                    name="product"
                    type="text"
                    label="Produkt"
                    prompt="Název produktu"
                    value={product}
                    handleChange={handleChange}
                /> 
                <InputField 
                    required
                    name="price"
                    type="number"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={price}
                    handleChange={handleChange}
                />
                <InputField 
                    required
                    name="vat"
                    type="number"
                    label="DPH"
                    prompt="Zadejte DPH"
                    value={vat}
                    handleChange={handleChange}
                />
                <InputField 
                    name="note"
                    type="text"
                    label="Poznámka"
                    prompt="Doplňující informace"
                    value={note}
                    handleChange={handleChange}
                />
                <input type="submit" className="btn btn-primary" value="Uložit" /> 
            </form>
        </div>
    );
};

export default InvoiceForm;