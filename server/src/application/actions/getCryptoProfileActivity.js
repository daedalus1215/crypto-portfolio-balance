const ActivityModel = require('../../infrastructure/models/schemas/ActivityModel');
const { ASC } = require('../../infrastructure/models/utils/constants.js');

const getCryptoProfileActivity = (req, res) => {
    const { code } = req.params;

    ActivityModel.find({ Coin: code }, {}, { sort: { Unix: ASC } }, (err, doc) => {
        console.log('err: ', err);
        res.jsonp(doc)
    });
};

module.exports = getCryptoProfileActivity;