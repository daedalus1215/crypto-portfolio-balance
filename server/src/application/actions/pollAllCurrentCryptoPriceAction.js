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
            const date = timestamp.match(/\d{4}\-\d{2}\-\d{2}/g)[0] + ' 00:00:00'; // format date proper

            portfolio.map(p => {
                return currentCryptos.data
                    .filter(c => p.code.toUpperCase() === c.symbol)
                    .map(async currentCryptoInPortfolio => {
                        const model = getGenericCryptoModel(currentCryptoInPortfolio.symbol);

                        return await model.updateOne(
                            { Date: `${date}` },
                            {
                                Symbol: currentCryptoInPortfolio.symbol,
                                Date: date,
                                Close: currentCryptoInPortfolio.quote.USD.price,
                                Unix: new Date(timestamp).getTime(),
                                Open: "",
                                Low: "",
                                High: "",
                                Volume: "",
                            },
                            { upsert: true });
                    });
            })
            response.send({ 'Updated with': currentCryptos })
        })
        .catch(err => {
            response.send(`error with pollAllCurrentCryptoPriceAction: ${err}`);
        });
}