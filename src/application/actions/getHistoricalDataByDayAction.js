const axios = require('axios');
const key = process.env.NOMIC_API;
const NOMICS_URL = "https://api.nomics.com/v1/exchange-rates/history?key=";

const getHistoricalDataByDayAction = () => (req, response) => {
    const currency = req.params.currency;
    const url = `${NOMICS_URL}${key}&currency=${currency}&start=2020-01-01T00%3A00%3A00Z`;

    axios
        .get(url)
        .then(resp => { console.log('response is: ' + resp.data); response.send(resp.data); })
        .catch(err => { response.send('Error fetching data from nomics ' + err); });
};

module.exports = getHistoricalDataByDayAction;