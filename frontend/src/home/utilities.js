/**
 * Multiply exchange rate with the amount, and then add it across each day
 * @param {Array} activities 
 * @param {Array} instrumentHistory 
 * @returns 
 */
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

export const aggregateQuantityByDay = (activities, instrumentHistory) => {
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