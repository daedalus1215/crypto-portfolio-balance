const mongoose = require("mongoose");

module.exports = mongoose.model('activities', new mongoose.Schema({
    "Activity": String,
    "PricePerCoin": String,
    "Time": String,
    "Date": String,
    "unix": String,
    "Order": String,
    "Amount": String,
    "Coin": String
}));
