import React, { useEffect, useState } from "react";
import { getHistoricStuff } from "./requests";
import { Line } from "react-chartjs-2";
import "./HistoricRatesPage.css";
import Button from "react-bootstrap/esm/Button";

function HistoricRatesPage() {
    const [data, setData] = React.useState({});
    const [hData, setHData] = useState([]);

    useEffect(() => {
        getHistoricStuff(setHData);
    }, []);

    useEffect(() => {
        const labels = hData.map(timeUnit => {
            const date = new Date(timeUnit.timestamp);
            return (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getFullYear();
        });

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: hData.map(timeUnit => timeUnit.rate),
                    label: 'Bitcoin',
                    borderColor: "#FFD700",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [hData]);

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