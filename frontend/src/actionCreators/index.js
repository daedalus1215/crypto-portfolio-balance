import axios from "axios";
const portfolios = require('../temp/portfolio.json');

export const PORTFOLIO_LIST = 'PORTFOLIO_LIST';
export const FETCH_CRYPTO_HISTORY_RESPONSE = 'FETCH_CRYPTO_HISTORY_RESPONSE';
export const FETCH_CRYPTO_HISTORY_ERROR = 'FETCH_CRYPTO_HISTORY_ERROR';

export const fetchPortfolioList = () => dispatch => {
    //@TODO: should throw error here if portfolios is not set. Would help if temp file was missing. 
    dispatch({
        type: 'PORTFOLIO_LIST', payload: portfolios
    });
};

/** 
 * Fetch the historical records for a specific crypto.
 * @param {String} code the code representation of the crypto asset: e.g. Bitcoin's would be 'btc', Ethereum's would be 'eth', Stellar Lumens would be 'xlm', etc.
 * @returns 
 */
export const fetchCryptoHistory = code => async dispatch => await axios
    .get(`http://localhost:8081/api/history/${code.toUpperCase()}`)
    .then(async resp => {
        const payload = await resp.data;
        dispatch({ type: FETCH_CRYPTO_HISTORY_RESPONSE, payload })
    })
    .catch(err => dispatch({ type: FETCH_CRYPTO_HISTORY_ERROR, payload: console.log(err) }))