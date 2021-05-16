import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import useFetchAssetHistory from "./useFetchAssetHistory";
import useFetchActivityWithTotal from "./useFetchWithTotal";
import "./PortfolioPage.css";

const TIME_LAPSE = {
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

/**
 * @TODO: Clean this up 
 * @param {*} setData 
 * @param {*} portfolioData 
 * @param {*} btcHistory 
 * @param {*} timePeriod 
 * @param {*} portfolio 
 * @param {*} setTotalValue 
 */
const useDisplayHistoricalExchangeRate = (setData, portfolioData, btcHistory, timePeriod, portfolio, setTotalValue, color) => {
    // console.log('portfolio ', portfolio);
    const sumMultiplePurchasesInSameDay = (btc) => {
        // return portfolio
        //     .filter(folio => folio.timestamp === btc.Date)
        //     .map(folio => folio.amount)
        //     .reduce((first, second) => +first + +second, 0);
        return portfolio?.filter(folio => folio.Date === btc.Date)
            // .map(folio => {
            //     console.log('amoutn', folio.Amount)
            //     return folio.Amount
            // })
            .map(folio => folio.Amount)
            .reduce((first, second) => +first + +second, 0);
    }

    React.useEffect(() => {
        let lastSatoshis = 0;
        const getMarketValueForSatoshis = (satoshis, rate) => {
            // console.log('satoshis', satoshis)
            // console.log('rate', rate)
            lastSatoshis = isNaN(lastSatoshis) ? 0 : lastSatoshis
            lastSatoshis = lastSatoshis + +satoshis;
            return (lastSatoshis * rate);
        }
        let labels = btcHistory?.map(btc => btc.Date);
        // console.log('labels', labels);
        let totalAmount = btcHistory
            // .map(btc => {
            //     const assetQuantityForAGivenDay = sumMultiplePurchasesInSameDay(btc);
            //     // console.log('totalAmountOfSatoshisInTheSameDay', assetQuantityForAGivenDay)
            //     const marketValueForAssetQuantity = getMarketValueForSatoshis(assetQuantityForAGivenDay, btc.Close);
            //     // console.log('getMarketValueForSatoshis', marketValueForAssetQuantity);
            //     return marketValueForAssetQuantity;
            // });
            .map(btc => getMarketValueForSatoshis(sumMultiplePurchasesInSameDay(btc), btc.Close));

        console.log('totalAmount', totalAmount)

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

        if (timePeriod === TIME_LAPSE.YR) {
            totalAmount = totalAmount.splice(totalAmount.length - 150, totalAmount.length - 1);
            labels = labels.splice(labels.length - 150, labels.length - 1);
        }

        setTotalValue(totalAmount[totalAmount.length - 1]?.toFixed(2));
        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: totalAmount,
                    label: 'Portfolio',
                    borderColor: color,
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [portfolioData, btcHistory, timePeriod]);
};

const PortfolioPage = ({ portfolioOfAsset }) => {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [data, setData] = React.useState({});
    const [activity, setActivity] = React.useState({});
    const [assetHistory, setAssetHistory] = React.useState([]);
    const [totalValue, setTotalValue] = React.useState(0);
    useFetchAssetHistory(portfolioOfAsset.code, setAssetHistory)
    useFetchActivityWithTotal(portfolioOfAsset.code, setActivity);
    const { portfolio, fiatInvestment, totalAmountOfAsset } = activity;

    // console.log('activity', activity)
    // console.log('totalAmountOfAsset', assetHistory[assetHistory.length - 1].Date)
    const totalV = (totalAmountOfAsset * assetHistory[assetHistory.length - 1]?.Close)?.toFixed(2);

    useDisplayHistoricalExchangeRate(setData, activity.portfolio, assetHistory, timePeriod, portfolio, setTotalValue, portfolioOfAsset.color);

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
                    <p>Invested: ${fiatInvestment?.toFixed(2)}</p>
                    <p>Valued at: ${totalV}</p>
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