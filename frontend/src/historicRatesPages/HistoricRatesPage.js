import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import Button from "react-bootstrap/esm/Button";

const TIME_LAPSE = {
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

const useSetGraphData = (setData, btcHistory, timePeriod, color) => {
    useEffect(() => {
        let labels;
        let cryptoData;

        if (btcHistory) {
            labels = btcHistory.map(btc => btc.Date);
            cryptoData = btcHistory.map(btc => btc.Close);

            if (timePeriod === TIME_LAPSE.WEEK) {
                cryptoData = cryptoData.splice(cryptoData.length - 10, cryptoData.length - 1);
                labels = labels.splice(labels.length - 10, labels.length - 1);
            }

            if (timePeriod === TIME_LAPSE.MTH) {
                cryptoData = cryptoData.splice(cryptoData.length - 34, cryptoData.length - 1);
                labels = labels.splice(labels.length - 34, labels.length - 1);
            }

            if (timePeriod === TIME_LAPSE.THREE_MTH) {
                cryptoData = cryptoData.splice(cryptoData.length - 90, cryptoData.length - 1);
                labels = labels.splice(labels.length - 90, labels.length - 1);
            }

            if (timePeriod === TIME_LAPSE.YR) {
                cryptoData = cryptoData.splice(cryptoData.length - 150, cryptoData.length - 1);
                labels = labels.splice(labels.length - 150, labels.length - 1);
            }
        } else {
            labels = '';
            cryptoData = [];
        }

        setData({
            labels,
            datasets: [
                {
                    data: cryptoData,
                    label: 'Bitcoin',
                    borderColor: color,
                    fill: false,
                },
            ],
        });
    }, [btcHistory, timePeriod]);
}

const HistoricRatesPage = ({ color }) => {
    const btcHistory = useSelector(state => state.cryptoHistory.asset);
    const [data, setData] = React.useState({});
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);

    useSetGraphData(setData, btcHistory, timePeriod, color);

    const currentMarketValue = btcHistory && btcHistory[btcHistory.length - 1]?.Close;

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
                        <p>CM Value: {currentMarketValue}</p>
                    </div>
                </div>
                <div className="portfolio-grid">
                    <Line data={data} />
                </div>
            </div>
        </div>
    );
}
export default HistoricRatesPage;