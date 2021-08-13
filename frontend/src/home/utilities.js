/**
 * Multiply exchange rate with the amount, and then add it across each day
 * @param {Array} activity 
 * @param {Array} instrumentHistory 
 * @returns 
 */
export const aggregateValueByDayAcrossMultipleDays = (activity, instrumentHistory) => {
    let summation = 0;
    return instrumentHistory.map(instrument => {
        return activity
            .filter(c => c.Date === instrument.Date)
            .map(asset => asset.Amount * asset.PricePerCoin)
            .reduce((first, second) => {
                summation = summation + second;
                return summation;
            }, summation);
    });
};

//@TODO: Left off writing a test for this
export const aggregateQuantityByDay = (activity, instrumentHistory) => {
    let summation = 0;
    return instrumentHistory.map(instrument => {
        return activity
            .filter(c => c.Date === instrument.Date)
            .map(asset => +asset.Amount)
            .reduce((first, second) => {
                summation = summation + second;
                return summation;
            }, summation);
    });
};