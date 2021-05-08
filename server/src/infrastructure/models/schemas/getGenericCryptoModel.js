const mongoose = require("mongoose");

const getGenericCryptoModel = code => {
    return mongoose.model(`${code}s`, new mongoose.Schema({
        "unix": String,
        "date": String,
        "symbol": String,
        "open": String,
        "high": String,
        "low": String,
        "close": String,
        "Volume BTC": String,
        "Volume USD": String
    }));
}

module.exports = getGenericCryptoModel;
