import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import { fetchEtherHistory } from "../requests";
import useFetchEther from "../useFetchEther";
import "./EtherPortfolio.css";

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

const useGetHistoryOfEther = setEtherHistory => {
    React.useEffect(() => {
        fetchEtherHistory(setEtherHistory);
    }, []);
};

const useDisplayHistoricalExchangeRate = (setData, portfolioData, etherHistory, timePeriod, portfolio, setTotalValue) => {

    React.useEffect(() => {
        const sumMultiplePurchasesInSameDay = (btc) => {
            // console.log('what is this', portfolio)
            // console.log('what is this btc:', btc)
            return portfolio?.filter(folio => (folio.timestamp === btc.timestamp)
                ? true
                : false)
                .map(folio => parseFloat(folio.amount))
                .reduce((first, second) => {
                    console.log('first: ', first);
                    console.log('second: ', second);
                    const total = parseFloat(first + second);
                    console.log('ethereum total for the day: ', total)
                    return total;
                }, 0);
        }

        let lastEther = 0;
        const computeCurrentHoldingValue = (ether, rate) => {
            lastEther = isNaN(lastEther) ? 0 : lastEther
            console.log('lastEther:', lastEther)
            console.log('ether:', ether)
            lastEther = parseFloat(lastEther) + parseFloat(ether);
            console.log('new lastEther:', lastEther)
            const etherRate = rate * lastEther;
            const marketValueForether = etherRate
            return marketValueForether;
        }

        let labels = etherHistory?.map(btc => btc.timestamp);
        console.log('labels')
        let totalAmount = etherHistory
            .map(btc => {
                const totalAmountOfetherInTheSameDay = sumMultiplePurchasesInSameDay(btc);
                // console.log('totalAmountOfetherInTheSameDay', totalAmountOfetherInTheSameDay)
                const computedCurrentHoldingValue = computeCurrentHoldingValue(totalAmountOfetherInTheSameDay, btc.rate);
                // console.log('computedCurrentHoldingValue', computedCurrentHoldingValue)
                return computedCurrentHoldingValue
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
                    label: 'Value in Ethereum',
                    borderColor: "#77f",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [portfolioData, etherHistory, timePeriod]);
};

function EtherPortfolio() {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [data, setData] = React.useState({});
    const [portfolioData, setPortfolioData] = React.useState([]);
    const [etherHistory, setEtherHistory] = React.useState([]);
    const [totalValue, setTotalValue] = React.useState(0);
    const { ether, fiatInvestment } = useFetchEther();
    const portfolio = ether;

    useSetPortfolioData(setPortfolioData, portfolioData);
    useGetHistoryOfEther(setEtherHistory);

    useDisplayHistoricalExchangeRate(setData, portfolioData, etherHistory, timePeriod, portfolio, setTotalValue);

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
                </div>
            </div>
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}

export default EtherPortfolio;