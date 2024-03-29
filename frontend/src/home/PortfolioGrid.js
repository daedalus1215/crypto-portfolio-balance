import React from 'react';
import useInterval from '../hooks/useInterval';
import { fetchCurrentInstrumentPrices } from '../requests';
import { useSelectPortfolioList } from '../selectors/portfolioSelectors';
import PortfolioGridRow from './PortfolioGridRow';

const TWENTY_MINUTES = 1200000;

const PortfolioGrid = () => {
    const [cryptoPrices, setCryptoPrices] = React.useState([]);
    const portfolios = useSelectPortfolioList();

    useInterval(() => {
        fetchCurrentInstrumentPrices(setCryptoPrices);
    }, TWENTY_MINUTES);

    React.useEffect(() => {
        fetchCurrentInstrumentPrices(setCryptoPrices);
    }, []);

    const folios = portfolios
        .map(portfolio => cryptoPrices?.filter(p => p.symbol.toLowerCase() === portfolio.code)
            .map(cryptoPrice => {
                return {
                    ...portfolio,
                    price: cryptoPrice.quote.USD.price,
                    oneHour: cryptoPrice.quote.USD.percent_change_1h,
                    oneDay: cryptoPrice.quote.USD.percent_change_24h,
                    marketCap: cryptoPrice.quote.USD.market_cap,
                }
            })[0]);

    return <ul className="home-ul">
        <li className="home-assets">
            <div className="crypto-index">#</div>
            <div className="crypto-name">Name</div>
            <div className="crypto-price">Price</div>
            <div className="crypto-onehour">1hr <span className="sub">Change</span></div>
            <div className="crypto-oneday">24hr<span className="sub">Change</span></div>
            <div className="crypto-marketcap"><span className="sub">Market </span>Cap</div>
        </li>
        {folios.map((p, index) => {
            return p ? <PortfolioGridRow p={p} index={index} key={index} /> : []
        })}
    </ul>;
};

export default PortfolioGrid;