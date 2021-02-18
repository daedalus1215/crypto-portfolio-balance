const getHistoricalDataByDayAction = require('../actions/getHistoricalDataByDayAction');
const routes = (app, key) => {
    const getHistoryByDay =  getHistoricalDataByDayAction(key);
    app.get('/status', (req, res) => { res.status(200).jsonp({ success: true }).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.get('/api/history/:currency', getHistoryByDay)
}


module.exports = routes;