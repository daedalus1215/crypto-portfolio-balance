import React from 'react';
const portfolio = require('./temp/portfolio.json');

const useFetchPortfolioWithTotal = () => {
    return React.useMemo(() => {
        const total = portfolio
            .map(p => p.order)
            .reduce((sum, order) => {
                console.log('order', order)
                console.log('sum', sum)
                return parseFloat(order) + parseFloat(sum)
            }, 0);

        console.log('the total is: ', total);
        return {
            portfolio,
            total
        }
    }, [portfolio]);
};

export default useFetchPortfolioWithTotal;