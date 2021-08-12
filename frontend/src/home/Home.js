import React from 'react';
import useFetchInstrument from "../hooks/useFetchInstrumentHistory";
import PortfolioChart from './PortfolioChart';
import PortfolioGrid from './PortfolioGrid';
import './Home.css';

const Home = () => {

    //@TODO: Got to change this, we should not be depending on btc as a financial instrument.
    //@TODO: I just need the full date range and I picked anyone of the financial instruments.
    useFetchInstrument('btc');


    return <div className="home-page">
        <div className="home-page-container">
            <div className="home-graph">
                <PortfolioChart />
            </div>
            <PortfolioGrid />
        </div>
    </div >
};

export default Home;