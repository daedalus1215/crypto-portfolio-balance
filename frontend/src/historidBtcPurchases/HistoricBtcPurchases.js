import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useFetchPortfolio from "../useFetchPortfolio";
import "./HistoricBtcPurchases.css";

function HistoricBtcPurchases() {
    const [data, setData] = React.useState({});
    const [hData, setHData] = useState([]);
    const response = useFetchPortfolio();
    const thegoods = response;

    useEffect(() => {
        setHData(thegoods);
    }, [thegoods]);

    useEffect(() => {
        const labels = hData.map(timeUnit => {
            return timeUnit.timestamp;
        });

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: hData.map(timeUnit => timeUnit.amount),
                    label: 'Bitcoin Activity',
                    borderColor: "#FFD700",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [hData]);

    return (
        <div className="historic-rates-page">
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}
export default HistoricBtcPurchases;