const getGenericCryptoModel = require('../../infrastructure/models/schemas/getGenericCryptoModel');
const { ASC } = require('../../infrastructure/models/utils/constants');


const getCryptoPriceAction = (req, response) => {
    const currency = req.params.currency;

    const model = getGenericCryptoModel(currency.toLowerCase());

    model.find({}, {}, { sort: { Unix: ASC } }, async (err, doc) => {
        
        response.jsonp(await doc)
    });
};

module.exports = getCryptoPriceAction;