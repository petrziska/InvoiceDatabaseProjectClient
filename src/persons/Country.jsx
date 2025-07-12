/**
 * Objekt `Country` slouží jako výčet (enum) zemí.
 * 
 * Obsahuje konstantní hodnoty reprezentující jednotlivé země.
 * Použití `Object.freeze` zajistí, že objekt je neměnný (immutable).
 * 
 * V současnosti obsahuje:
 *  - CZECHIA: 'CZECHIA'
 *  - SLOVAKIA: 'SLOVAKIA'
 */

const Country = Object.freeze({
    CZECHIA: 'CZECHIA',
    SLOVAKIA: 'SLOVAKIA',
});

export default Country;