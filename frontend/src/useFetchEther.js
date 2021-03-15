const ether = require('./temp/ether.json');

const useFetchEther = () => {
    const fiatInvestment = ether
        .map(p => parseFloat(p.order))
        .reduce((sum, order) => order + sum, 0);

    return {
        ether,
        fiatInvestment
    };
};

export default useFetchEther;