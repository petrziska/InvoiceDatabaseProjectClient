import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = (props) => {
    const [invoiceState, setInvoices] = useState([]);
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    const [filterState, setFilter] = useState({
        buyerID: undefined,
        sellerID: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        product: undefined,
        limit: undefined,
    });

    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => setBuyerList(data));
        apiGet("/api/persons").then((data) => setSellerList(data));
    }, []);

    const deleteInvoice = async (id) => {
        await apiDelete("/api/invoices/" + id);
        setInvoices(invoiceState.filter((invoice) => invoice._id !== id));
    };

    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilter(prevState => {
                return{...prevState, [e.target.name]: e.target.value}
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    }

    return (
        <div>
            <h1 className="container mt-5">Faktury</h1>
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buyerList={buyerListState}
                sellerList={sellerListState}
                filter={filterState}
                confirm="Filtrovat filmy"
            />
            <InvoiceTable deleteInvoice={deleteInvoice} items={invoiceState} label="Počet faktur:" />
        </div>
    );
};

export default InvoiceIndex;