import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import useFetchAssetHistory from "../hooks/useGetAssetHistory";
import { useSelectAllActivity } from "../selectors/activitySelectors";
import { useSelectInstrumentHistory } from "../selectors/instrumentSelectors";
import useFetchAllActivity from "../hooks/useFetchAllActivity";
import useFetchPortfolioList from "../hooks/useFetchPortfolioList";

const TIME_LAPSE = {
    ALL: "ALL",
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

export const aggregateValueByDay = cryptoHistory => {
    const labels = cryptoHistory.map(c => c.Date);
    const dates = [...new Set(labels)];

    //@TODO: I need to accumulate here per instrument code
    //@TODO: then do the addition in the reducer. 
    return dates.map(date => {
        return cryptoHistory
            .filter(c => c.Date === date)
            .map(asset => ({ ...asset, Amount: +asset.Amount * +asset.PricePerCoin }))
            .reduce((first, second) => {
                console.log('first', first)
                console.log('second', second)
                return {
                    Date: date,
                    Amount: first.Amount + second.Amount,
                }
            }, { Amount: 0, Date: date });
    });
};

export const addValueAcrossAllAssets = activities => {
    let summedUp = 0;

    return activities.map(a => {
        console.log('activities', a)
        summedUp += a;
        // summedUp = summedUp + a;
        return summedUp;
    });
}

const PortfolioChart = () => {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    const [data, setData] = React.useState([]);

    const portfolio = useFetchPortfolioList();
    const activity = useSelectAllActivity();
    useFetchAllActivity();

    useFetchAssetHistory('btc');
    useSelectInstrumentHistory();

    useEffect(() => {
        const totalAmount = aggregateValueByDay(activity).map(c => c.Amount);
        // const t = aggregateValueByDay(portfolioActivity).map(c => c.Amount);
        console.log('what are you ', totalAmount)
        // const t = addValueAcrossAllAssets(totalAmount);
        // console.log('total amount', t)
        const labels = activity.map(c => c.Date);

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: totalAmount,
                    label: 'Portfolio',
                    borderColor: '#9a5',
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);

    }, [activity]);

    // console.log('cryptoHiustory', cryptoHistory)
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

                    </div>
                    <div className="portfolio-grid">
                        <Line data={data} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PortfolioChart;