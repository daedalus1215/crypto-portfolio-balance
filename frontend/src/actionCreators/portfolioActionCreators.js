import { PORTFOLIO_LIST } from ".";
const portfolios = require('../temp/portfolio.json');

export const fetchPortfolioList = () => dispatch => {
    //@TODO: should throw error here if portfolios is not set. Would help if temp file was missing. 
    dispatch({
        type: PORTFOLIO_LIST, payload: portfolios
    });
};