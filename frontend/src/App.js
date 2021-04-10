import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import TopBar from './topBar/TopBar';
import HistoricRatesPage from './historicRatesPages/HistoricRatesPage';
import HistoricBtcPurchases from './historidBtcPurchases/HistoricBtcPurchases';
import useGetPortfolios from './portfolios/useGetPortfolios';
import PortfolioPage from './portfolios/PortfolioPage';
import './App.css';

const history = createHistory();

const App = () => {
  window.Chart.defaults.global.defaultFontFamily = `
  -apple-system, BlinkMacSystemFont, "Segoe  UI", 
  "Roboto", "Oxygen", "Ubuntu", "Cantarell", 
  "Fira Sans", "Droid Sans", "Helvetica Neue", 
  sans-serif`;

  const portfolios = useGetPortfolios();

  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HistoricRatesPage} />
        <Route path="/historicrates" exact component={HistoricRatesPage} />
        <Route path="/historicBtcPurchases" exact component={HistoricBtcPurchases} />
        {portfolios.map(p => <Route path={"/" + p.code} exact render={props => <PortfolioPage portfolioOfAsset={p} {...props} />} />)}
        {/* <Route path="/combine-portfolio" exact component={CombinePortfolio} /> */}
      </Router>
    </div>
  );
};

export default App;
