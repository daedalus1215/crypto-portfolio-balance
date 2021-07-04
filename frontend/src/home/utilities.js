export const aggregateValueByDay = (activity, instrumentHistory) => {
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