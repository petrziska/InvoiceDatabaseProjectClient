import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = (props) => {
    const [invoiceState, setInvoices] = useState([]);

    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
    }, []);


    return (
        <div>
            <h1>Faktury</h1>
            <hr />
            <InvoiceTable items={invoiceState} label="Počet faktur:" />
        </div>
    );
};

export default InvoiceIndex;