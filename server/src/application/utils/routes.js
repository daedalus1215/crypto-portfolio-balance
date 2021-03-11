const getCryptoPriceAction = require('../actions/getCryptoPriceAction');

const routes = (app, key) => {
    const getCryptoPriceRequestHandler = getCryptoPriceAction(key);
    app.get('/status', (req, res) => { res.status(200).jsonp({ success: true }).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.get('/api/history/:currency', getCryptoPriceRequestHandler)
}

module.exports = routes;