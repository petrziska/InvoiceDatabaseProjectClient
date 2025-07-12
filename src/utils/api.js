/**
 * API helper functions pro komunikaci s backendem na základě Fetch API.
 * 
 * Konstanty:
 * - API_URL: základní URL adresa API serveru.
 * 
 * Funkce:
 * 
 * fetchData(url: string, requestOptions: object): Promise<any | void>
 * - Obecná funkce pro fetch požadavky.
 * - Přidá základní URL k relativnímu url.
 * - Zpracuje odpověď, pokud není status OK, vyhodí chybu.
 * - U metody DELETE nevrací json, u ostatních ano.
 * - V případě chyby vyhodí chybu dál.
 * 
 * apiGet(url: string, params?: object): Promise<any>
 * - Provede GET požadavek na zadanou url.
 * - Podporuje nepovinné parametry jako objekt, které přidá do query stringu.
 * - Parametry s hodnotou null nebo undefined ignoruje.
 * 
 * apiPost(url: string, data: object): Promise<any>
 * - Provede POST požadavek na zadanou url.
 * - Posílá data v JSON formátu v těle požadavku.
 * 
 * apiPut(url: string, data: object): Promise<any>
 * - Provede PUT požadavek na zadanou url.
 * - Posílá data v JSON formátu v těle požadavku.
 * 
 * apiDelete(url: string): Promise<void>
 * - Provede DELETE požadavek na zadanou url.
 * - Nečeká tělo odpovědi (nevrací JSON).
 */

const API_URL = "http://localhost:8080";

const fetchData = (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;

    return fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            if (requestOptions.method !== 'DELETE')
                return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const apiGet = (url, params) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => value != null)
    );

    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    const requestOptions = {
        method: "GET",
    };

    return fetchData(apiUrl, requestOptions);
};

export const apiPost = (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

export const apiPut = (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

export const apiDelete = (url) => {
    const requestOptions = {
        method: "DELETE",
    };

    return fetchData(url, requestOptions);
};
