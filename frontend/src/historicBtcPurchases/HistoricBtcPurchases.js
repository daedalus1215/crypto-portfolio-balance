import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useFetchActivityWithTotal from "../portfolios/useFetchWithTotal";

const HistoricBtcPurchases = ({ code, color }) => {
    const [data, setData] = React.useState({});
    const [hData, setHData] = useState([]);
    useFetchActivityWithTotal(code, setHData);

    useEffect(() => {
        const labels = hData.portfolio?.map(timeUnit => {
            return timeUnit.Date;
        });

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: hData.portfolio?.map(timeUnit => timeUnit.Amount),
                    label: 'Activity',
                    borderColor: color,
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [hData]);

    return (
        <div className="historic-rates-page">
            <div className="portfolio-grid">
                <Line data={data} />
            </div>
        </div>
    );
}
export default HistoricBtcPurchases;