import React from 'react';
import PortfolioPage from './PortfolioPage';
import HistoricBtcPurchases from '../historicBtcPurchases/HistoricBtcPurchases';
import HistoricRatesPage from '../historicRatesPages/HistoricRatesPage';
import './PortfolioPage.css';

/**
 * Leaving an older version of redux as a bookmark.
 * @param {Object} param0 
 * @returns 
 */
const PortfolioPageContainer = ({ portfolioOfAsset }) => {
    return <div className="whole-page">

        <PortfolioPage portfolioOfAsset={portfolioOfAsset} />

        <div className="hs-page">
            <HistoricBtcPurchases code={portfolioOfAsset.code} color={portfolioOfAsset.color} />
        </div>
        <div className="hr-page">
            <HistoricRatesPage color={portfolioOfAsset.color} />
        </div>
    </div>
}

export default PortfolioPageContainer;