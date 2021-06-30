import { useSelector } from "react-redux";
import { createSelector } from 'reselect';

const selectPortfolioList = createSelector(
    state => state?.portfolio,
    item => item?.assets || []
);

// const selectPortfolioByCode = createSelector(
//     state => state.portfolio.assets,
//     (_, props)=> props.code,
//     (portfolio, code) => portfolio.filter(p => p.code === code)[0]
// );

export const useSelectPortfolioList = () => useSelector(selectPortfolioList);

// export const useSelectPortfolioByCode = () => useSelector(selectPortfolioByCode);