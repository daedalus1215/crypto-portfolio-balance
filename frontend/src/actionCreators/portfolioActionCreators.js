import { PORTFOLIO_BY_CODE, PORTFOLIO_LIST } from ".";
const portfolios = require('../temp/portfolio.json');

export const fetchPortfolioList = () => dispatch => {
    //@TODO: should throw error here if portfolios is not set. Would help if temp file was missing. 
    dispatch({
        type: PORTFOLIO_LIST, payload: portfolios
    });
};

export const fetchPortfolioByCode = code => dispatch => {
    //@TODO: should throw error here if portfolios is not set. Would help if temp file was missing. 
    dispatch({
        type: PORTFOLIO_BY_CODE, payload: portfolios.filter(p => p.code === code)[0],
    });
};