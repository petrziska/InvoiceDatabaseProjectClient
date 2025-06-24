import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = (props) => {
    const [invoiceState, setInvoices] = useState([]);

    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
    }, []);

    const deleteInvoice = async (id) => {
        await apiDelete("/api/invoices/" + id);
        setInvoices(invoiceState.filter((invoice) => invoice._id !== id));
    };


    return (
        <div>
            <h1>Faktury</h1>
            <hr />
            <InvoiceTable deleteInvoice={deleteInvoice} items={invoiceState} label="Počet faktur:" />
        </div>
    );
};

export default InvoiceIndex;