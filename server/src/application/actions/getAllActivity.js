const getGenericCryptoModel = require('../../infrastructure/models/schemas/getGenericCryptoModel');
const { ASC } = require('../../infrastructure/models/utils/constants');
const portfolio = require('../../temp/portfolio.json');

const getCryptoPriceAction = (req, response) => {


    let total = [];

    portfolio.forEach(coin => {
        let activities = []
        ActivityModel.find({ Coin: coin }, {}, { sort: { Unix: ASC } }, (err, doc) => {
            activities = doc;
        });

        let crypto = []
        const model = getGenericCryptoModel(coin);
        model.find({}, {}, { sort: { Unix: ASC } }, async (err, doc) => {
            crypto = doc;
        });

        // match the timestamp
        let accumulatedFractionsOfAsset = 0;
        const getMarketValueForSatoshis = (fractionUnitOfAsset, rate) => {
            // console.log('satoshis', satoshis)
            // console.log('rate', rate)
            accumulatedFractionsOfAsset = isNaN(accumulatedFractionsOfAsset) ? 0 : accumulatedFractionsOfAsset
            accumulatedFractionsOfAsset = accumulatedFractionsOfAsset + +fractionUnitOfAsset;
            return (accumulatedFractionsOfAsset * rate);
        }
        let labels = assetHistory?.map(asset => asset.Date);
        // console.log('labels', labels);
        let totalAmount = assetHistory
            // .map(asset => {
            //     const assetQuantityForAGivenDay = sumMultiplePurchasesInSameDay(asset);
            //     // console.log('totalAmountOfSatoshisInTheSameDay', assetQuantityForAGivenDay)
            //     const marketValueForAssetQuantity = getMarketValueForSatoshis(assetQuantityForAGivenDay, asset.Close);
            //     // console.log('getMarketValueForSatoshis', marketValueForAssetQuantity);
            //     return marketValueForAssetQuantity;
            // });
            .map(asset => getMarketValueForSatoshis(sumMultiplePurchasesInSameDay(asset), asset.Close));

    })
};




const sumMultiplePurchasesInSameDay = (activityHistory, coinHistory) => {
    // return portfolio
    //     .filter(folio => folio.timestamp === activity.Date)
    //     .map(folio => folio.amount)
    //     .reduce((first, second) => +first + +second, 0);
    // return portfolio?.filter(folio => folio.Date.replace('/(00):(00):(00)/g') === activity.Date.replace('/(00):(00):(00)/g'))
    return coinHistory?.filter(folio => folio.Date === activity.Date)

        // .map(folio => {
        //     console.log('amoutn', folio.Amount)
        //     return folio.Amount
        // })
        .map(folio => folio.Amount)
        .reduce((first, second) => +first + +second, 0);
}


module.exports = getCryptoPriceAction;