import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./HistoricRatesPage.css";
import Button from "react-bootstrap/esm/Button";
import useFetchPortfolioWithTotal from "./useFetchPortfolioWithTotal";

function Explore() {
    const [data, setData] = React.useState({});
    const [hData, setHData] = useState([]);
    const { portfolio, total } = useFetchPortfolioWithTotal();
    console.log('explore: ', portfolio);
    useEffect(() => {
        
        setHData(portfolio);
    }, [portfolio]);

    useEffect(() => {
        const labels = hData.map(timeUnit => {
            return timeUnit.timestamp;
        });

        

        const lineGraphData = {
            labels,
            datasets: [
                {
                    data: hData.map(timeUnit => timeUnit.amount),
                    label: 'Explore',
                    borderColor: "#FFD700",
                    fill: false,
                },
            ],
        };
        setData(lineGraphData);
    }, [hData]);

    return (
        <div className="historic-rates-page">
            <div><Button>1Y</Button><Button>1M</Button></div>
            <br />
            <div className="grid">
                <Line data={data} />
            </div>
        </div>
    );
}
export default Explore;