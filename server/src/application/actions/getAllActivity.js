const ActivityModel = require('../../infrastructure/models/schemas/ActivityModel');
const getGenericCryptoModel = require('../../infrastructure/models/schemas/getGenericCryptoModel');
const { ASC } = require('../../infrastructure/models/utils/constants');
const portfolio = require('../../temp/portfolio.json');

const getAllActivity = async (req, response) => {

    let total = [];

    const assets = await portfolio.map( coin => {

        // get portfolio activity of that coin
        let activities = []
        ActivityModel.find({ Coin: coin.code }, {}, { sort: { Unix: ASC } }, (err, doc) => {
            activities = doc;
        });

        // get that asset's history prices
        let crypto = []
        const model = getGenericCryptoModel(coin);
        model.find({}, {}, { sort: { Unix: ASC } }, async (err, doc) => {
            crypto = await doc;
        });

        // match the timestamp
        let accumulatedFractionsOfAsset = 0;
        const getMarketValueForSmallestUnitOfAsset = (fractionUnitOfAsset, rate) => {
            // console.log('satoshis', satoshis)
            // console.log('rate', rate)
            accumulatedFractionsOfAsset = isNaN(accumulatedFractionsOfAsset) ? 0 : accumulatedFractionsOfAsset
            accumulatedFractionsOfAsset = accumulatedFractionsOfAsset + +fractionUnitOfAsset;
            return (accumulatedFractionsOfAsset * rate);
        }

        const labels = crypto?.map(asset => asset.Date);
        // console.log('labels', labels);
        const totalAmount = crypto
            // .map(asset => {
            //     const assetQuantityForAGivenDay = sumMultiplePurchasesInSameDay(asset);
            //     // console.log('totalAmountOfSatoshisInTheSameDay', assetQuantityForAGivenDay)
            //     const marketValueForAssetQuantity = getMarketValueForSmallestUnitOfAsset(assetQuantityForAGivenDay, asset.Close);
            //     // console.log('getMarketValueForSmallestUnitOfAsset', marketValueForAssetQuantity);
            //     return marketValueForAssetQuantity;
            // });
            .map(asset => getMarketValueForSmallestUnitOfAsset(sumMultiplePurchasesInSameDay(asset), asset.Close));


        return {
            labels,
            totalAmount,
            symbol: coin.code,
            activities
        }
    })

    console.log('assets', assets);
};




const sumMultiplePurchasesInSameDay = (activityHistory, coinHistory) => {
    // return portfolio
    //     .filter(folio => folio.timestamp === activity.Date)
    //     .map(folio => folio.amount)
    //     .reduce((first, second) => +first + +second, 0);
    // return portfolio?.filter(folio => folio.Date.replace('/(00):(00):(00)/g') === activity.Date.replace('/(00):(00):(00)/g'))
    return coinHistory?.filter(folio => folio.Date === activityHistory.Date)

        // .map(folio => {
        //     console.log('amoutn', folio.Amount)
        //     return folio.Amount
        // })
        .map(folio => folio.Amount)
        .reduce((first, second) => +first + +second, 0);
}


module.exports = getAllActivity;