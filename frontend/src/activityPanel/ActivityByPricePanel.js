import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Button from "react-bootstrap/esm/Button";
import { aggregateValueByDay } from "../home/utilities";
import useFetchActivityByCode from "../hooks/useFetchActivityByCode";
import useFetchInstrumentHistory from "../hooks/useFetchInstrumentHistory";
import { useSelectActivityByCode } from "../selectors/activitySelectors";
import { useSelectInstrumentHistory } from "../selectors/instrumentSelectors";

const TIME_LAPSE = {
    ALL: "ALL",
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

const ActivityByPricePanel = ({ selectedPortfolio }) => {
    const { code, color, name } = selectedPortfolio;
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [totalValue, setTotalValue] = React.useState(0);
    const [data, setData] = React.useState({});

    useFetchInstrumentHistory(code);
    const instrumentHistory = useSelectInstrumentHistory();

    useFetchActivityByCode(code);
    const activity = useSelectActivityByCode(code);

    useEffect(() => {
        let totalAmount = aggregateValueByDay(activity, instrumentHistory);
        let labels = instrumentHistory.map(a => a.Date);

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

        labels = labels.map(d => d.replace(' 00:00:00', ''));

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: totalAmount,
                    label: `Value of ${name} (${code.toUpperCase()}) during the time of activity`,
                    borderColor: color,
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
        setTotalValue(totalAmount[totalAmount.length - 1]);
    }, [activity, instrumentHistory, timePeriod]);

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
                        <p>Activity value for {name} ({code.toUpperCase()}): {totalValue}</p>

                    </div>
                </div>
                <div className="portfolio-grid">
                    <Line data={data} />
                </div>
            </div>
        </div>
    );
}
export default ActivityByPricePanel;