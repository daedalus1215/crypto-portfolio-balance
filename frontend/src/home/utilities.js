export const aggregateValueByDay = (activity, instrumentHistory) => {
    //@TODO: Clean this up when we are ready
    let summation = 0;
    return instrumentHistory.map(instrument => {
        return activity
            .filter(c => c.Date === instrument.Date)
            .map(asset => {
                const yeah = asset.Amount * asset.PricePerCoin;
                return yeah
            }).reduce((first, second) => { 
                console.log('first', summation);
                console.log('second', second)
                summation = summation + second;
                console.log('combinedo', summation)
                return summation;
            }, summation);
    });
};


export const aggregateQuantityByDay = (activity, instrumentHistory) => {
    //@TODO: Clean this up when we are ready
    let summation = 0;
    return instrumentHistory.map(instrument => {
        return activity
            .filter(c => c.Date === instrument.Date)
            .map(asset => {
                return +asset.Amount;
            }).reduce((first, second) => {
                console.log('first', summation);
                console.log('second', second)
                summation = summation + second;
                console.log('combinedo', summation)
                return summation;
            }, summation);
    });
};