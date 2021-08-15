const settings = require('./settings.json');
const axios = require("axios");

//@TODO: ActionCreation this
export const fetchCurrentInstrumentPrices = async (setCurrentCryptoPrices) => await axios
    .get(`${settings.domain}:8081/api/pollAllCurrentCryptoPriceAction`)
    .then(async resp => {
        setCurrentCryptoPrices(await resp.data.data)
    })
    .catch(err => err);

//@TODO: ActionCreation this
export const fetchSpecificActivity = async (code, setActivity) => await axios
    .get(`${settings.domain}:8081/api/activity/${code}`)
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