import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import { fetchEtherHistory } from "../requests";
import useFetchEther from "../useFetchEther";
import "./EtherPortfolio.css";

const TIME_LAPSE = {
    YR: "YR",
    MTH: "MTH",
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
            console.log('what is this', portfolio)
            console.log('what is this btc:', btc)
            return portfolio?.filter(folio => (folio.timestamp === btc.timestamp)
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

        let lastwei = 0;
        const computeCurrentHoldingValue = (wei, rate) => {
            lastwei = lastwei + +wei;
            const weiRate = rate / 100000000;
            const marketValueForwei = (lastwei * weiRate);
            return marketValueForwei;
        }

        let labels = etherHistory?.map(btc => btc.timestamp);
        console.log('labels')
        let totalAmount = etherHistory
            .map(btc => {
                const totalAmountOfweiInTheSameDay = sumMultiplePurchasesInSameDay(btc);
                console.log('totalAmountOfweiInTheSameDay', totalAmountOfweiInTheSameDay)
                const computedCurrentHoldingValue = computeCurrentHoldingValue(totalAmountOfweiInTheSameDay, btc.rate);
                console.log('computedCurrentHoldingValue', computedCurrentHoldingValue)
                return computedCurrentHoldingValue
            });

        if (timePeriod === TIME_LAPSE.MTH) {
            totalAmount = totalAmount.splice(totalAmount.length - 34, totalAmount.length - 1);
            labels = labels.splice(labels.length - 34, labels.length - 1);
        }

        setTotalValue(totalAmount[totalAmount.length - 1]?.toFixed(2));
        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: totalAmount,
                    label: 'Ethereum',
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
    const ether  = useFetchEther();
    const portfolio = ether;

    useSetPortfolioData(setPortfolioData, portfolioData);
    useGetHistoryOfEther(setEtherHistory);

    console.log('etherHistory', etherHistory)
    console.log('portfolio', portfolio)
    useDisplayHistoricalExchangeRate(setData, portfolioData, etherHistory, timePeriod, portfolio, setTotalValue);

    return (
        <div className="historic-rates-page">
            <div><Button onClick={() => setTimePeriod(TIME_LAPSE.YR)}>Year</Button><Button onClick={() => setTimePeriod(TIME_LAPSE.MTH)}>Month</Button></div>
            <br />
            <div>
                {/* <p>Cash invested: ${fiatInvestment.toFixed(2)}</p> */}
                <p>Valued at: ${totalValue}</p>
            </div>
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}

export default EtherPortfolio;