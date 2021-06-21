import React from 'react';
import { connect } from 'react-redux';
import PortfolioPage from './PortfolioPage';
import HistoricBtcPurchases from '../historicBtcPurchases/HistoricBtcPurchases';
import HistoricRatesPage from '../historicRatesPages/HistoricRatesPage';
import { setPortfolioList } from '../actionCreators';
import { getPortfolioList } from '../requests';
import './PortfolioPage.css';

/**
 * Leaving an older version of redux as a bookmark.
 * @param {Object} param0 
 * @returns 
 */
const PortfolioPageContainer = ({ portfolioOfAsset, setList, portfolioList }) => {

    React.useEffect(() => {
        getPortfolioList(setList);
    }, []);

    return <div className="whole-page">

        <PortfolioPage portfolioOfAsset={portfolioOfAsset} />

        <div className="hs-page">
            <HistoricBtcPurchases code={portfolioOfAsset.code} color={portfolioOfAsset.color} />
        </div>
        <div className="hr-page">
            <HistoricRatesPage code={portfolioOfAsset.code} color={portfolioOfAsset.color} />
        </div>
    </div>
}


const mapStateToProps = state => {
    return { portfolioList: state.portfolioList }
};

export default connect(mapStateToProps, { setList: setPortfolioList })(PortfolioPageContainer);