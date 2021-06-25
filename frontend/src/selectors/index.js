import { useSelector } from "react-redux";
import { createSelector } from 'reselect';

export const selectPortfolioList = createSelector(
    state => state?.portfolio,
    item => item?.assets || []
);

export const useSelectPortfolioList = () => useSelector(selectPortfolioList);