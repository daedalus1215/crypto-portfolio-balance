import { response } from "express";

const axios = require('axios');

const NOMICS_URL = "https://api.nomics.com/v1/exchange-rates/history?key=";
const key = process.env.NOMICS_API_KEY;

interface Request {
    params: {
        currency: string;
    }
}

interface Response {
    data: {}
}

const getHistoricalDataByDay: (Request, Response) => void = (req, res) => {
    const currency = req.params.currency;

    axios
        .get(`${NOMICS_URL}${key}&currency=${currency}&start=2020-01-01T00%3A00%3A00Z`)
        .then(resp => { response.send(resp.data); })
        .catch(err => { console.log('Error fetching data from nomics', err); });
};

module.exports = getHistoricalDataByDay;