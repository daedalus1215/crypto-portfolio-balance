const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    "Unix": String,
    "Date": String,
    "Symbol": String, 
    "Open": String,
    "High": String,
    "Low": String,
    "Close": String,
    "Volume BTC": String,
    "Volume USD": String
});

const getGenericCryptoModel = code => {
    return mongoose.model(`${code}s`, schema);
}
module.exports = getGenericCryptoModel;
