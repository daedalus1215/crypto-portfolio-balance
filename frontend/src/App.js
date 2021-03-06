import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import TopBar from './TopBar';
import HistoricRatesPage from './historicRatesPages/HistoricRatesPage';
import BitcoinPortfolio from './bitcoinPortfolio/BitcoinPortfolio';
import HistoricBtcPurchases from './historidBtcPurchases/HistoricBtcPurchases';
import './App.css';

const history = createHistory();

const App = () => {
  window.Chart.defaults.global.defaultFontFamily = `
  -apple-system, BlinkMacSystemFont, "Segoe  UI", 
  "Roboto", "Oxygen", "Ubuntu", "Cantarell", 
  "Fira Sans", "Droid Sans", "Helvetica Neue", 
  sans-serif`;

  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HistoricRatesPage} />
        <Route path="/historicrates" exact component={HistoricRatesPage} />
        <Route path="/historicBtcPurchases" exact component={HistoricBtcPurchases} />
        <Route path="/bitcoin-portfolio" exact component={BitcoinPortfolio} />

      </Router>
    </div>
  );
};

export default App;
