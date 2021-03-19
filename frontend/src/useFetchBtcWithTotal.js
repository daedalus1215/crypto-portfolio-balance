import React from 'react';
const portfolio = require('./temp/btc.json');

const useFetchBtcWithTotal = () => {
    return React.useMemo(() => {
        const fiatInvestment = portfolio
            .map(p => parseFloat(p.order))
            .reduce((sum, order) => order + sum, 0);

        return {
            portfolio,
            fiatInvestment
        }
    }, [portfolio]);
};

export default useFetchBtcWithTotal;