import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import { getHistoricStuff } from "./requests";
import useFetchPortfolioWithTotal from "./useFetchPortfolioWithTotal";
import "./HistoricRatesPage.css";

const TIME_LAPSE = {
    YR: "YR",
    MTH: "MTH",
}

function Explore() {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.YR);
    const [data, setData] = React.useState({});
    const [portfolioData, setPortfolioData] = React.useState([]);
    const [btcHistory, setBtcHistory] = React.useState([]);
    const { portfolio } = useFetchPortfolioWithTotal();

    React.useEffect(() => {
        setPortfolioData(portfolio);
    }, [portfolio]);

    React.useEffect(() => {
        getHistoricStuff(setBtcHistory);
    }, []);


    React.useEffect(() => {
        let lastSatoshis = 0;
        const computeCurrentHoldingValue = (satoshis, rate) => {
            console.log('satoshis', satoshis);

            lastSatoshis += lastSatoshis + +satoshis;

            return lastSatoshis * (rate / 100000000);
        }
        let labels = btcHistory?.map(btc => btc.timestamp);

        let totalAmount = btcHistory.map(btc => {
            const tAmount = portfolio
                .filter(folio => {
                    if (folio.timestamp === btc.timestamp) {
                        console.log('true!');
                        console.log(folio.timestamp);
                        console.log(btc.timestamp);
                        return true;
                    } else {
                        console.log('false!');
                        console.log(folio.timestamp);
                        console.log(btc.timestamp);
                        return false;
                    }
                })
                .map(folio => {
                    console.log('portfolio amount this time: ', folio.amount);
                    return folio.amount;
                })
                .reduce((first, second) => {
                    console.log('first', first);
                    console.log('second', second);
                    console.log('combined', +first + +second);
                    return +first + +second
                }, 0);
            return computeCurrentHoldingValue(tAmount, btc.rate);
        });

        if (timePeriod === TIME_LAPSE.MTH) {
            totalAmount = totalAmount.splice(totalAmount.length - 20, totalAmount.length - 1);
            labels = labels.splice(labels.length - 20, labels.length - 1);
        }

        console.log('timePeriod equals', totalAmount);
        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: totalAmount,
                    label: 'Explore',
                    borderColor: "#FFD700",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [portfolioData, btcHistory, timePeriod]);

    return (
        <div className="historic-rates-page">
            <div><Button onClick={() => setTimePeriod(TIME_LAPSE.YR)}>1Y</Button><Button onClick={() => setTimePeriod(TIME_LAPSE.MTH)}>Month</Button></div>
            <br />
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}

export default Explore;