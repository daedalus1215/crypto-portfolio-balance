const getCryptoPriceAction = require('../actions/getCryptoPriceAction');
const getCryptoProfileActivity = require('../actions/getCryptoProfileActivity');
const getAllCurrentCryptoPriceAction = require('../actions/getAllCurrentCryptoPriceAction');

const routes = (app, key) => {
    const getCryptoPriceRequestHandler = getCryptoPriceAction(key);
    app.get('/status', (req, res) => { res.status(200).jsonp({ success: true }).end(); });
    app.get('/api/status', (req, res) => { res.status(200).jsonp({ success: true }).end(); });
    app.get('/api/history/:currency', getCryptoPriceRequestHandler);
    app.get('/api/activity/:code', getCryptoProfileActivity);
    app.get('/api/getAllCurrentCryptoPrice', getAllCurrentCryptoPriceAction);
}

module.exports = routes;