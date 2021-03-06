import React, { useEffect, useState } from "react";
import { getHistoricStuff } from "../requests";
import { Line } from "react-chartjs-2";
import Button from "react-bootstrap/esm/Button";
import "./HistoricRatesPage.css";

function HistoricRatesPage() {
    const [data, setData] = React.useState({});
    const [btcHistory, setBtcHistory] = useState([]);

    useEffect(() => {
        getHistoricStuff(setBtcHistory);
    }, []);

    useEffect(() => {
        const labels = btcHistory.map(timeUnit => {
            return timeUnit.timestamp;
            // const date = timeUnit.timestamp);
            // return (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getFullYear();
        });

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: btcHistory.map(timeUnit => timeUnit.rate),
                    label: 'Bitcoin',
                    borderColor: "#FFD700",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [btcHistory]);

    return (
        <div className="historic-rates-page">
            <div><Button>1Y</Button><Button>1M</Button></div>
            <br />
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}
export default HistoricRatesPage;