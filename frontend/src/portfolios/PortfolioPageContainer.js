import react from 'react';
import HistoricBtcPurchases from '../historicBtcPurchases/HistoricBtcPurchases';
import PortfolioPage from './PortfolioPage';

const PortfolioPageContainer = ({ portfolioOfAsset }) => <div className="PortfolioPageContainer">
    <PortfolioPage portfolioOfAsset={portfolioOfAsset} />
    {/* <HistoricBtcPurchases /> */}
</div>

export default PortfolioPageContainer;