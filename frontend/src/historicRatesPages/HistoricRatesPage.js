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
        let labels = btcHistory.map(btc => btc.Date);
        let cryptoData = btcHistory.map(btc => btc.Close);

        if (timePeriod === TIME_LAPSE.MTH) {
            cryptoData = cryptoData.splice(cryptoData.length - 34, cryptoData.length - 1);
            labels = labels.splice(labels.length - 34, labels.length - 1);
        }

        if (timePeriod === TIME_LAPSE.THREE_MTH) {
            cryptoData = cryptoData.splice(cryptoData.length - 90, cryptoData.length - 1);
            labels = labels.splice(labels.length - 90, labels.length - 1);
        }

        // console.log('labels', labels)
        // console.log('cryptoData', cryptoData);

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: cryptoData,
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