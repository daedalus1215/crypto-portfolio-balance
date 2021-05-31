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
export const fetchBitcoinHistory = async (code, setHData) => await axios
    .get(`http://localhost:8081/api/history/${code}`)
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
        const portfolio = await resp.data.items;

        //@TODO: Might need to do something with isNaN here
        const fiatInvestment = portfolio
            .map(p => parseFloat(p.Order))
            .reduce((sum, order) => order + sum);

        //@TODO: Might need to do something with isNaN here
        const totalAmountOfAsset = portfolio
            .map(p => parseFloat(p.Amount))
            .reduce((p1, p2) => p1 + p2)
            .toFixed(9); //@TODO: Might need to do this dynamically, based off of a config or something.

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