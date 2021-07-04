import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import { useSelectAllActivity } from "../selectors/activitySelectors";
import { useSelectInstrumentHistory } from "../selectors/instrumentSelectors";
import { fetchAllActivity } from "../actionCreators/activityActionCreators";
import useFetchAllActivity from "../hooks/useFetchAllActivity";
import { aggregateValueByDay } from "./utilities";

const TIME_LAPSE = {
    ALL: "ALL",
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

const PortfolioChart = ({ fetchAllActivity, dispatch }) => {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [data, setData] = React.useState([]);
    const [totalValue, setTotalValue] = React.useState(0);

    useFetchAllActivity();
    const portfolioActivity = useSelectAllActivity();

    const instrumentHistory = useSelectInstrumentHistory()


    useEffect(() => {
        let totalAmount = aggregateValueByDay(portfolioActivity, instrumentHistory);
        let labels = instrumentHistory.map(c => c.Date.replace(' 00:00:00', ''));

        if (timePeriod === TIME_LAPSE.WEEK) {
            totalAmount = totalAmount.splice(totalAmount.length - 10, totalAmount.length - 1);
            labels = labels.splice(labels.length - 10, labels.length - 1);
        }

        if (timePeriod === TIME_LAPSE.MTH) {
            totalAmount = totalAmount.splice(totalAmount.length - 34, totalAmount.length - 1);
            labels = labels.splice(labels.length - 34, labels.length - 1);
        }

        if (timePeriod === TIME_LAPSE.THREE_MTH) {
            totalAmount = totalAmount.splice(totalAmount.length - 90, totalAmount.length - 1);
            labels = labels.splice(labels.length - 90, labels.length - 1);
        }

        if (timePeriod === TIME_LAPSE.YR) {
            totalAmount = totalAmount.splice(totalAmount.length - 150, totalAmount.length - 1);
            labels = labels.splice(labels.length - 150, labels.length - 1);
        }
        const options = {
            // scaleBeginAtZero: true,
            /*This is how to customize how the labels look :) */
            tooltips: {
                tooltipModel: (data) => `$${data}`
            }
        };
        const lineGraphData = {
            labels,
            options,
            datasets: [
                {
                    data: totalAmount,
                    borderColor: '#9a5',
                    fill: false,
                    label: 'label',
                    options
                },
            ],
        };
        setData(lineGraphData);
        //@TODO: Violation here by doing 2 things in this useEffect
        setTotalValue(totalAmount[totalAmount.length - 1])
    }, [portfolioActivity, instrumentHistory, timePeriod]);


    const options = {
        // scaleBeginAtZero: true,
        /*This is how to customize how the labels look :) */
        tooltips: {
            tooltipModel: (data) => `$${data}`}
    };
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
                        {/* <p>Invested: ${fiatInvestment?.toFixed(2)}</p> */}
                        {/* <p>Valued at: ${totalV}</p> */}
                        <p>Total Value: {totalValue}</p>

                    </div>
                    <div className="portfolio-grid-max">
                        <Line data={data} options={options}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default connect(state => ({}),
    dispatch => ({ fetchAllActivity: fetchAllActivity, dispatch }))(PortfolioChart);