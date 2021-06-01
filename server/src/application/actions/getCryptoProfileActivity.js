const ActivityModel = require('../../infrastructure/models/schemas/ActivityModel');
const { ASC } = require('../../infrastructure/models/utils/constants.js');

const axios = require('axios');
const getGenericCryptoModel = require('../../infrastructure/models/schemas/getGenericCryptoModel');
const portfolio = require('../../temp/portfolio.json');
const key = process.env.X_CMC_PRO_API_KEY;
const COIN_MARKET_CAP_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

const getCryptoProfileActivity = (req, res) => {
    // console.log('getAllCurrentCryptoPriceAction');
    const url = COIN_MARKET_CAP_URL;
    // console.log('portfolio', portfolio)
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
            // response.send({ 'Updated with': currentCryptos })
            // console.log('returned from coinmarket', currentCryptos)
        })
        .then(async () => {
            const { code } = req.params;
            ActivityModel.find({ Coin: code }, {}, { sort: { Unix: ASC } }, (err, doc) => {
                // console.log('err: ', err);
                res.jsonp({
                    latest:true,
                    items: doc
                });
            });
        })
        .catch(err => {
            // console.log('err: ', err);

            const { code } = req.params;
            ActivityModel.find({ Coin: code }, {}, { sort: { Unix: ASC } }, (err, doc) => {
                // console.log('err: ', err);
                res.jsonp({ 
                    latest: false,
                    items: doc
                });
            });
        });

    /// previous


    // const { code } = req.params;
    // ActivityModel.find({ Coin: code }, {}, { sort: { Unix: ASC } }, (err, doc) => {
    //     console.log('err: ', err);
    //     res.jsonp(doc)
    // });
};

module.exports = getCryptoProfileActivity;