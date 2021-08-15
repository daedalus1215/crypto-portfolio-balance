import axios from "axios";
import {
    FETCH_ACTIVITY_BY_CODE_ERROR,
    FETCH_ACTIVITY_BY_CODE_RESPONSE,
    FETCH_ALL_ACTIVITY_ERROR,
    FETCH_ALL_ACTIVITY_RESPONSE
} from ".";
const settings = require('../settings.json');

/** 
* Fetch all portfolio asset
* @param {String} code the code representation of the crypto asset: e.g. Bitcoin's would be 'btc', Ethereum's would be 'eth', Stellar Lumens would be 'xlm', etc.
* @returns 
*/
export const fetchAllActivity = () => async dispatch => await axios
    .get(`${settings.domain}:8081/api/all-activity`)
    .then(async resp => {
        const payload = await resp.data;
        dispatch({ type: FETCH_ALL_ACTIVITY_RESPONSE, payload })
    })
    .catch(err => dispatch({ type: FETCH_ALL_ACTIVITY_ERROR, payload: console.log(err) }))

export const fetchActivityByCode = code => async dispatch => await axios
    .get(`${settings.domain}:8081/api/activity/${code}`)
    .then(async resp => {
        const payload = await resp.data.items;
        dispatch({ type: FETCH_ACTIVITY_BY_CODE_RESPONSE, payload })
    })
    .catch(err => dispatch({ type: FETCH_ACTIVITY_BY_CODE_ERROR, payload: console.log(err) }))