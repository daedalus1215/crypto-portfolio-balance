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
            const date = timestamp.match(/\d{4}\-\d{2}\-\d{2}/g)[0] + ' 00:00:00';
            console.log('timestamp', date)
            const g = portfolio.map(p => {
                return currentCryptos.data.filter(c => {
                    if (p.code.toUpperCase() === c.symbol) {
                        return true;
                    }
                    return false;
                }).map(d => {
                    console.log('what')
                    const model = getGenericCryptoModel(d.symbol);
                    const saveable = new model();
                    saveable.toObject();
                    saveable.Symbol = d.symbol;
                    saveable.Date = date;
                    saveable.Close = d.quote.USD.price;
                    saveable.Unix = new Date(timestamp).getTime();
                    saveable.Open = "";
                    saveable.Low = "";
                    saveable.High = "";
                    saveable.Volume = "";

                    // const existingDoc = model.find({ Date: date });
                    
                    let savedDoc;
                    // if (existingDoc) {
                    //     console.log('existingDoc', existingDoc);
                    //     existingDoc.Close = d.quote.USD.price;
                    //     existingDoc.Unix = new Date(d.last_updated).getTime()
                    //     savedDoc = await existingDoc.update((err, doc) => {
                    //         console.log('error, with updating existing doc:', doc);
                    //         return doc;
                    //     });
                    // } else {
                        console.log('saveable doc', saveable);
                        savedDoc = saveable.save((err, doc) => {
                            console.log('error:', err);
                            console.log('eeee:', doc);

                            return doc;
                        });
                    // }
                    // .catch(e => {
                    //     console.log('error: ', e)
                    // });
                    // console.log('saved', savedDoc);
                    return savedDoc;
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