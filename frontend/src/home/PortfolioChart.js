import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import useFetchAssetHistory from "../hooks/useGetAssetHistory";
import { useSelectAllActivity } from "../selectors/activitySelectors";
import { useSelectInstrumentHistory } from "../selectors/instrumentSelectors";
import { fetchAllActivity } from "../actionCreators/activityActionCreators";
import useFetchAllActivity from "../hooks/useFetchAllActivity";

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

export const aggregateValueByDay = cryptoHistory => {
    const labels = cryptoHistory.map(c => c.Date);
    const dates = [...new Set(labels)];

    return dates.map(date => {
        return cryptoHistory
            .filter(c => c.Date === date)
            .map(asset => ({ ...asset, Amount: asset.Amount * asset.PricePerCoin }))
            .reduce((first, second) => ({
                Date: date,
                Amount: first.Amount + second.Amount,
            }), { Amount: 0, Date: date });
    });
};

const PortfolioChart = ({ fetchAllActivity, dispatch }) => {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [data, setData] = React.useState([]);
    
    const portfolioActivity = useSelectAllActivity();
    useFetchAllActivity();

    useFetchAssetHistory('btc');
    useSelectInstrumentHistory();

    useEffect(() => {
        const totalAmount = aggregateValueByDay(portfolioActivity).map(c => c.Amount);
        const labels = portfolioActivity.map(c => c.Date);

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: totalAmount,
                    label: 'Portfolio',
                    borderColor: '#ffff',
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);

    }, [portfolioActivity]);

    // console.log('cryptoHiustory', cryptoHistory)
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
                    <div className="portfolio-grid">
                        <Line data={data} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default connect(state => ({}),
    dispatch => ({ fetchAllActivity: fetchAllActivity, dispatch }))(PortfolioChart);