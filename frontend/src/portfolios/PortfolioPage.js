import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import { fetchBitcoinHistory } from "../requests";
import useFetchBtcWithTotal from "../useFetchBtcWithTotal";
import "./PortfolioPage.css";

const TIME_LAPSE = {
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

const useSetPortfolioData = (setPortfolioData, portfolio) => {
    React.useEffect(() => {
        setPortfolioData(portfolio);
    }, [portfolio]);
}

const useGetHistoryOfBitcoin = setBtcHistory => {
    React.useEffect(() => {
        fetchBitcoinHistory(setBtcHistory);
    }, []);
};

const useDisplayHistoricalExchangeRate = (setData, portfolioData, btcHistory, timePeriod, portfolio, setTotalValue) => {

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
                    console.log('fiatInvestment: ', total)
                    return total;
                }, 0);
        }
        let lastSatoshis = 0;
        const computeCurrentHoldingValue = (satoshis, rate) => {
            lastSatoshis = lastSatoshis + +satoshis;
            const satoshiRate = rate;
            const marketValueForSatoshis = (lastSatoshis * satoshiRate);
            return marketValueForSatoshis;
        }
        let labels = btcHistory?.map(btc => btc.timestamp);

        let totalAmount = btcHistory
            .map(btc => {
                const totalAmountOfSatoshisInTheSameDay = sumMultiplePurchasesInSameDay(btc);
                return computeCurrentHoldingValue(totalAmountOfSatoshisInTheSameDay, btc.rate);
            });


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

        setTotalValue(totalAmount[totalAmount.length - 1]?.toFixed(2));
        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: totalAmount,
                    label: 'Portfolio',
                    borderColor: "#FFD700",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [portfolioData, btcHistory, timePeriod]);
};

const PortfolioPage = (folio) => {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [data, setData] = React.useState({});
    const [portfolioData, setPortfolioData] = React.useState([]);
    const [btcHistory, setBtcHistory] = React.useState([]);
    const [totalValue, setTotalValue] = React.useState(0);
    const { portfolio, fiatInvestment, totalAmountOfAsset } = useFetchBtcWithTotal();

    useSetPortfolioData(setPortfolioData, portfolioData);
    useGetHistoryOfBitcoin(setBtcHistory);


    useDisplayHistoricalExchangeRate(setData, portfolioData, btcHistory, timePeriod, portfolio, setTotalValue);

    return (
        <div className="historic-rates-page">
            <div>
                <Button onClick={() => setTimePeriod(TIME_LAPSE.YR)}>Year</Button>
                <Button onClick={() => setTimePeriod(TIME_LAPSE.THREE_MTH)}>Three Month</Button>
                <Button onClick={() => setTimePeriod(TIME_LAPSE.MTH)}>Month</Button>
                <Button onClick={() => setTimePeriod(TIME_LAPSE.WEEK)}>Week</Button>
            </div>
            <br />
            <div className="title-container">
                <div className="title">
                    <p>Invested: ${fiatInvestment.toFixed(2)}</p>
                    <p>Valued at: ${totalValue}</p>
                    <p>Total: {totalAmountOfAsset}</p>
                </div>
            </div>
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}

export default PortfolioPage;