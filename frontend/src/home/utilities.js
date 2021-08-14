/**
 * Multiply exchange rate with the amount, and then add it across each day
 * @param {Array} activities 
 * @param {Array} instrumentHistory
 * @returns 
 */
//@TODO: We really only need the dates from the instrumentHistory now, we were getting the exchange rate before from it, but now our activities actually store the exchange rate, so will have to clean this up.
export const aggregateValueByDayAcrossMultipleDays = (activities, instrumentHistory) => {
    let summation = 0;
    return instrumentHistory.map(instrument => {
        return activities
            .filter(c => c.Date === instrument.Date)
            .map(asset => asset.Amount * asset.PricePerCoin)
            .reduce((first, second) => {
                summation = summation + second;
                return summation;
            }, summation);
    });
};

//@TODO: We really only need the dates from the instrumentHistory now, we were getting the exchange rate before from it, but now our activities actually store the exchange rate, so will have to clean this up.
export const aggregateQuantityByDayAcrossMultipleDays = (activities, instrumentHistory) => {
    let summation = 0;
    return instrumentHistory.map(instrument => {
        return activities
            .filter(c => c.Date === instrument.Date)
            .map(asset => +asset.Amount)
            .reduce((first, second) => {
                summation = summation + second;
                return summation;
            }, summation);
    });
};