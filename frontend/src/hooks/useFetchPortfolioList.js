import React from 'react';
import { useDispatch } from "react-redux";
import { fetchPortfolioList } from "../actionCreators/portfolioActionCreators";

const useFetchPortfolioList = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchPortfolioList());
    }, [fetchPortfolioList]);
}

export default useFetchPortfolioList;