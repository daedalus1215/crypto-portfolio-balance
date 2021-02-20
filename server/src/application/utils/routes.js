const getBitcoinPriceAction = require('../actions/getBitcoinPriceAction');

const routes = (app, key) => {
    const getBitcoinPrice = getBitcoinPriceAction(key);
    app.get('/status', (req, res) => { res.status(200).jsonp({ success: true }).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.get('/api/history/:currency', getBitcoinPrice)
}

module.exports = routes;