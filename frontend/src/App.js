import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import TopBar from './topBar/TopBar';
import useGetPortfolios from './hooks/useGetPortfolios';
import Home from './home/Home';
import PortfolioPageContainer from './portfolios/PortfolioPageContainer';
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
        <Route path="/" exact render={props => <Home portfolios={portfolios} />} />
        {portfolios.map(p => <Route path={"/" + p.code} exact render={props => <PortfolioPageContainer portfolioOfAsset={p} {...props} />} />)}
        {/* <Route path="/combine-portfolio" exact component={CombinePortfolio} /> */}
      </Router>
    </div>
  );
};

export default App;
