import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import InvoiceStatistics from "./invoices/InvoiceStatistics";
import PersonSales from "./persons/PersonSales";
import PersonPurchases from "./persons/PersonPurchases";
import PersonStatistics from "./persons/PersonStatistics";

/**
 * Hlavní komponenta aplikace nastavující směrování (routing) pomocí React Router.
 * 
 * Používá Bootstrap pro stylování navigačního menu a komponenty pro práci s osobami a fakturami.
 */

export function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/persons"} className="nav-link">
                <strong>Osoby</strong>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/invoices"} className="nav-link">
                <strong>Faktury</strong>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/invoices/statistics"} className="nav-link">
                <strong>Statistiky faktur</strong>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/persons/statistics"} className="nav-link">
                <strong>Statistiky osob</strong>
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<Navigate to={"/persons"} />} />
          <Route path="/persons">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonForm />} />
            <Route path="edit/:id" element={<PersonForm />} />
            <Route path="statistics" element={<PersonStatistics />} />
          </Route>
          <Route path="/invoices">
            <Route index element={<InvoiceIndex />} />
            <Route path=":id" element={<InvoiceDetail />} />
            <Route path="create" element={<InvoiceForm />} />
            <Route path="edit/:id" element={<InvoiceForm />} />
            <Route path="statistics" element={<InvoiceStatistics />} />
          </Route>
          <Route path="/identification/:identificationNumber/sales" element={<PersonSales />} />
          <Route path="/identification/:identificationNumber/purchases" element={<PersonPurchases />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
