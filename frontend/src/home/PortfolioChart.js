import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useSelectAllActivity, useSelectPortfolioList } from "../selectors";
// import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import { fetchAllAssets } from '../actionCreators'

const TIME_LAPSE = {
    ALL: "ALL",
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

// 1. grab portfolios
// 2. iterate over them, use their code to filter on activities
// 3. reduce on the activities to get the full amount 
// 4.


const getMarketValueForFraction = (fractionUnitOfAsset, rate) => {
    // console.log('satoshis', satoshis)
    // console.log('rate', rate)
    // accumulatedFractionsOfAsset = isNaN(accumulatedFractionsOfAsset) ? 0 : accumulatedFractionsOfAsset
    // accumulatedFractionsOfAsset = accumulatedFractionsOfAsset + +fractionUnitOfAsset;
    return (fractionUnitOfAsset * rate);
}

export const getTheStuff = (cryptoHistory, portfolios) => {
    const labels = cryptoHistory.map(c => c.Date);
    let dates = [...new Set(labels)];

    // const d = portfolios.map(portfolio => {
    // const { code } = portfolio;
    return dates.map(date => {
        return cryptoHistory
            .filter(c => c.Date === date)
            .map(asset => ({ ...asset, Amount: asset.Amount * asset.PricePerCoin }))
            .reduce((first, second) => {
                return {
                    Date: date,
                    Amount: first.Amount + second.Amount,
                }
            }, { Amount: 0, Date: date });
        // });

    });
    console.log('dates', d);
};

const PortfolioChart = ({ fetchAllAssets, dispatch }) => {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [data, setData] = React.useState([]);
    const cryptoHistory = useSelectAllActivity();
    const portfolios = useSelectPortfolioList();
    //@TODO: Abstract this out
    useEffect(() => {
        dispatch(fetchAllAssets());
    }, []);

    useEffect(() => {
        // if we can take an array of objects
        // [
        // { Amount: 0, Date: '2021-01-01, Coin: btc}
        // ]


    }, []);

    console.log('cryptoHiustory', cryptoHistory)
    return (
        <div className="p-page">
            <div className="portfolio-page">
                <div className="title-container">
                    <div className="buttons">
                        <Button onClick={() => setTimePeriod(TIME_LAPSE.ALL)}>All</Button>
                        <Button onClick={() => setTimePeriod(TIME_LAPSE.YR)}>Year</Button>
                        <Button onClick={() => setTimePeriod(TIME_LAPSE.THREE_MTH)}>Three Month</Button>
                        <Button onClick={() => setTimePeriod(TIME_LAPSE.MTH)}>Month</Button>
                        <Button onClick={() => setTimePeriod(TIME_LAPSE.WEEK)}>Week</Button>
                    </div>
                    <div className="title">

                    </div>
                </div>

            </div>
        </div>
    );
}

export default connect(state => ({}),
    dispatch => ({ fetchAllAssets: fetchAllAssets, dispatch }))(PortfolioChart);