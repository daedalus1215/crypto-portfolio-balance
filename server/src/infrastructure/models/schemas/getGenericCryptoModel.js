const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    "unix": String,
    "date": String,
    "symbol": String,
    "open": String,
    "high": String,
    "low": String,
    "close": String,
    "Volume BTC": String,
    "Volume USD": String
});

const getGenericCryptoModel = code => {
    return mongoose.model(`${code}s`, schema);
}
module.exports = getGenericCryptoModel;
