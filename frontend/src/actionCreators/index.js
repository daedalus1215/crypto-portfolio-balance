
export const PORTFOLIO_LIST = 'PORTFOLIO_LIST';

export const FETCH_CRYPTO_HISTORY_RESPONSE = 'FETCH_CRYPTO_HISTORY_RESPONSE';
export const FETCH_CRYPTO_HISTORY_ERROR = 'FETCH_CRYPTO_HISTORY_ERROR';

export const setPortfolioList = portfolios => {
    return {
        type: 'PORTFOLIO_LIST',
        payload: portfolios
    }
};

/**
 * Fetch the historical records for a specific crypto.
 * @param {String} code the code representation of the crypto asset: e.g. Bitcoin's would be 'btc', Ethereum's would be 'eth', Stellar Lumens would be 'xlm', etc.
 * @returns 
 */
export const fetchCryptoHistory = code => async dispatch => {
    await axios
        .get(`http://localhost:8081/api/history/${code}`)
        .then(async resp => dispatch({ type: 'FETCH_CRYPTO_HISTORY_RESPONSE', payload: await resp.data }))
        .catch(err => dispatch({ type: 'FETCH_CRYPTO_HISTORY_ERROR', payload: console.log(err) }));
};