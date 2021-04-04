import React from 'react';

const useFetchWithTotal = (assetPath) => {
    return React.useMemo(() => {
        const portfolio = require(assetPath);

        const fiatInvestment = portfolio
            .map(p => parseFloat(p.order))
            .reduce((sum, order) => order + sum, 0);

        const totalAmountOfAsset = portfolio.map(p => parseFloat(p.amount)).reduce((p1, p2) => p1 + p2).toFixed(9);

        return {
            portfolio,
            fiatInvestment,
            totalAmountOfAsset
        }
    }, [portfolio]);
};

export default useFetchWithTotal;