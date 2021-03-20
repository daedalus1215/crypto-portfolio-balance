import React, { useEffect, useState } from "react";
import { fetchBitcoinHistory } from "../requests";
import { Line } from "react-chartjs-2";
import Button from "react-bootstrap/esm/Button";
import "./HistoricRatesPage.css";

const TIME_LAPSE = {
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

function HistoricRatesPage() {
    const [data, setData] = React.useState({});
    const [btcHistory, setBtcHistory] = useState([]);
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);

    useEffect(() => {
        fetchBitcoinHistory(setBtcHistory);
    }, []);

    useEffect(() => {
        let labels = btcHistory.map(timeUnit => timeUnit.timestamp);
        let data = btcHistory.map(timeUnit => timeUnit.rate);

        if (timePeriod === TIME_LAPSE.MTH) {
            data = data.splice(data.length - 34, data.length - 1);
            labels = labels.splice(labels.length - 34, labels.length - 1);
        }

        if (timePeriod === TIME_LAPSE.THREE_MTH) {
            data = data.splice(data.length - 90, data.length - 1);
            labels = labels.splice(labels.length - 90, labels.length - 1);
        }

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: data,
                    label: 'Bitcoin',
                    borderColor: "#FFD700",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [btcHistory, timePeriod]);


    return (
        <div className="historic-rates-page">
            <Button onClick={() => setTimePeriod(TIME_LAPSE.THREE_MTH)}>Three Month</Button>
            <Button onClick={() => setTimePeriod(TIME_LAPSE.MTH)}>Month</Button>
            <br />
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}
export default HistoricRatesPage;