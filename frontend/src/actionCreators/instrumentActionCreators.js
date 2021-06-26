import axios from "axios";
import { FETCH_INSTRUMENT_HISTORY_ERROR as FETCH_INSTRUMENT_HISTORY_ERROR, FETCH_INSTRUMENT_HISTORY_RESPONSE as FETCH_INSTRUMENT_HISTORY_RESPONSE } from ".";

/** 
 * Fetch the historical records for a specific crypto.
 * @param {String} code the code representation of the crypto asset: e.g. Bitcoin's would be 'btc', Ethereum's would be 'eth', Stellar Lumens would be 'xlm', etc.
 * @returns 
 */
export const fetchInstrumentHistory = code => async dispatch => await axios
    .get(`http://localhost:8081/api/instrument/history/${code.toUpperCase()}`)
    .then(async resp => {
        const payload = await resp.data;
        dispatch({ type: FETCH_INSTRUMENT_HISTORY_RESPONSE, payload })
    })
    .catch(err => dispatch({ type: FETCH_INSTRUMENT_HISTORY_ERROR, payload: console.log(err) }))


