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
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
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
        const sumMultiplePurchasesInSameDay = (btc) => {
            return portfolio
                .filter(folio => (folio.timestamp === btc.timestamp)
                    ? true
                    : false)
                .map(folio => folio.amount)
                .reduce((first, second) => {
                    console.log('first: ', first);
                    console.log('second: ', second);
                    const total = +first + +second;
                    console.log('total: ', total)
                    return total;
                }, 0);
        }
        let lastSatoshis = 0;
        const computeCurrentHoldingValue = (satoshis, rate) => {
            console.log('last satoshi', lastSatoshis);
            console.log('now satoshi', satoshis);
            lastSatoshis = lastSatoshis + +satoshis;
            console.log('combined satoshi', lastSatoshis);
            console.log('rate:', rate)
            const satoshiRate = rate / 100000000;
            console.log('satoshiRate', satoshiRate)
            const marketValueForSatoshis = (lastSatoshis * satoshiRate);
            console.log('market value: ', marketValueForSatoshis);
            return marketValueForSatoshis;
        }
        let labels = btcHistory?.map(btc => btc.timestamp);

        let totalAmount = btcHistory.map(btc => {
            const totalAmountOfSatoshisInTheSameDay = sumMultiplePurchasesInSameDay(btc);
            console.log('-------------------------');
            console.log('tAmount?', totalAmountOfSatoshisInTheSameDay);
            console.log('btc.timestamp', btc.timestamp);
            console.log('btc.rate', btc.rate);
            console.log('-------------------------');
            return computeCurrentHoldingValue(totalAmountOfSatoshisInTheSameDay, btc.rate);
        });


        if (timePeriod === TIME_LAPSE.MTH) {
            totalAmount = totalAmount.splice(totalAmount.length - 34, totalAmount.length - 1);
            labels = labels.splice(labels.length - 34, labels.length - 1);
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