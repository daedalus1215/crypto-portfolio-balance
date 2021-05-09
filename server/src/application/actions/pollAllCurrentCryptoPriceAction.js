const axios = require('axios');
const getGenericCryptoModel = require('../../infrastructure/models/schemas/getGenericCryptoModel');
const portfolio = require('../../portfolio.json');
const key = process.env.X_CMC_PRO_API_KEY;
const COIN_MARKET_CAP_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

/**
 * Using this endpoint:
 * 1. Retrieve crypto prices (for all cryptos) 
 * 2. Save the ones we have specified based on portfolio.json
 * @param {import('express').Request} req
 * @param {import('express').Response} response
 */
module.exports = (req, response) => {
    console.log('getAllCurrentCryptoPriceAction');
    const url = COIN_MARKET_CAP_URL;
    console.log('portfolio', portfolio)
    axios.defaults.headers.common = { "Accept": "application/json", "X-CMC_PRO_API_KEY": key };
    axios
        .get(url)
        .then(async resp => {
            const currentCryptos = await resp.data;

            const timestamp = currentCryptos.status.timestamp;
            console.log('timestamp', timestamp)
            const g = portfolio.map(p => {
                return currentCryptos.data.filter(c => {
                    if (p.code.toUpperCase() === c.symbol) {
                        return true;
                    }
                    return false;
                }).map(async d => {
                    const model = getGenericCryptoModel(d.symbol);
                    const saveable = new model();
                    saveable.toObject();
                    saveable.symbol = d.symbol;
                    saveable.date = d.last_updated;
                    saveable.close = d.quote.USD.price;

                    const z = await saveable.save((err, doc) => { console.log('error:', err); return doc })
                    // .catch(e => {
                    //     console.log('error: ', e)
                    // });
                    console.log('saved', z);
                    return z;
                    // return {
                    //     symbol: d.symbol,
                    //     date: d.last_updated,
                    //     close: d.quote.USD.price
                    // }
                });
            });



            console.log('xxxxx', g);
            response.send(resp.data);
        })
        .catch(err => { response.send('Error fetching data from coinmarket' + err); });
};