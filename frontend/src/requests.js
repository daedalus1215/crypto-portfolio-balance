const APIURL = 'https://api.exchangeratesapi.io';
const axios = require("axios");
const querystring = require('querystring');

export const getExchangeRate = () => {
    return axios.get(`${APIURL}/latest`);
}

export const getRateBetweenCurrencies = data => axios
    .get(`${APIURL}/history?${querystring.encode(data)}`);

export const getHistoricRates = data => axios
    .get(`${APIURL}/history?${querystring.encode(data)}`);

export const getHistoricRatesBetweenCurrencies = data => axios
    .get(`${APIURL}/history?${querystring.encode(data)}`);

//@TODO: Clean this up
export const fetchBitcoinHistory = async (setHData) => await axios
    .get(`http://localhost:8081/api/history/BTC`)
    .then(async resp => {
        setHData(await resp.data);
    })
    .catch(err => err);

export const fetchEtherHistory = async (setHData) => await axios
    .get('http://localhost:8081/api/history/ETH')
    .then(async resp => {
        setHData(await resp.data);
    })
    .catch(err => err);

//@TODO: Swap this out so that the backend is dynamic and we are not hitting specific endpoint
export const fetchAssetHistory = async (code, setHData) => await axios
    .get(`http://localhost:8081/api/history/${code.toUpperCase()}`)
    .then(async resp => setHData(await resp.data))
    .catch(err => {
        console.log(`issue with fetching asset history: ${err}`);
        return err;
    });

export const fetchAssetActivity = async (code, setActivity) => await axios
    .get(`http://localhost:8081/api/activity/${code}`)
    .then(async resp => {
        const portfolio = await resp.data;

        //@TODO: Might need to do something with isNaN here
        const fiatInvestment = portfolio
            .map(p => parseFloat(p.order))
            .reduce((sum, order) => order + sum, 0);

        //@TODO: Might need to do something with isNaN here
        const totalAmountOfAsset = portfolio
            .map(p => parseFloat(p.amount))
            .reduce((p1, p2) => p1 + p2, 0)
            .toFixed(9);

        setActivity({
            portfolio,
            fiatInvestment,
            totalAmountOfAsset
        });
    })
    .catch(err => {
        console.log(`issue with fetching asset activity: ${err}`);
        return err;
    });