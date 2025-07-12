/**
 *PersonIndex - komponenta pro zobrazení seznamu osob.
 *
 * Funkce:
 * - Načítá ze serveru seznam osob při prvním renderu komponenty (useEffect).
 * - Ukládá seznam osob do stavové proměnné `persons`.
 * - Umožňuje smazat osobu pomocí funkce `deletePerson`, která:
 *    - Zavolá API endpoint pro smazání osoby podle `id`.
 *    - Pokud dojde k chybě, vypíše ji do konzole a zobrazí alert.
 *    - Po úspěšném smazání aktualizuje stav `persons` odstraněním smazané osoby.
 * - Zobrazu
 */
import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";

import PersonTable from "./PersonTable";

const PersonIndex = () => {
    const [persons, setPersons] = useState([]);

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setPersons(persons.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
    }, []);

    return (
        <div>
            <h1 className="container mt-5">Seznam osob</h1>
            <PersonTable
                deletePerson={deletePerson}
                items={persons}
                label="Počet osob:"
            />
        </div>
    );
};
export default PersonIndex;
