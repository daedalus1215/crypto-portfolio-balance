import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { Line } from "react-chartjs-2";
import { fetchAllAssets } from '../actionCreators'

const TIME_LAPSE = {
    ALL: "ALL",
    YR: "YR",
    MTH: "MTH",
    WEEK: "WEEK",
    THREE_MTH: "THREE_MTH",
}

// 1. grab portfolios
// 2. iterate over them, use their code to filter on activities
// 3. reduce on the activities to get the full amount 
// 4.


const PortfolioChart = ({ cryptoHistory, fetchAllAssets, dispatch }) => {
    const [timePeriod, setTimePeriod] = React.useState(TIME_LAPSE.MTH);
    
    

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
                </div>

            </div>
        </div>
    );
}

export default connect(state => ({ cryptoHistory: state.allActivity.assets?.items }),
    dispatch => ({ fetchAllAssets: fetchAllAssets, dispatch }))(PortfolioChart);