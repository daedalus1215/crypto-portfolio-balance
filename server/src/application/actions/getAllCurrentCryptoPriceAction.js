const axios = require('axios');
const key = process.env.X_CMC_PRO_API_KEY;
const COIN_MARKET_CAP_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

module.exports = (req, response) => {
    console.log('getAllCurrentCryptoPriceAction');
    const url = COIN_MARKET_CAP_URL;

    axios.defaults.headers.common = { "Accept": "application/json", "X-CMC_PRO_API_KEY": key };
    axios
        .get(url)
        .then(async resp => {
            console.log('response');
            const yeah = await resp.data;
            console.log('yeah', yeah);
            response.send(resp.data);

        })
        .catch(err => { response.send('Error fetching data from coinmarket' + err); });
};