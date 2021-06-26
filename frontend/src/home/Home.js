import React from 'react';
import { fetchCurrentInstrumentPrices } from '../requests';
import PortfolioChart from './PortfolioChart';
import { useSelectPortfolioList } from '../selectors/portfolioSelectors';
import './Home.css';

const Home = () => {
    const [cryptoPrices, setCryptoPrices] = React.useState([]);
    const portfolios = useSelectPortfolioList();
    React.useEffect(() => {
        fetchCurrentInstrumentPrices(setCryptoPrices);
    }, []);

    const folios = portfolios
        .map(portfolio => cryptoPrices
            .filter(p => p.symbol.toLowerCase() === portfolio.code)
            .map(cryptoPrice => {
                return {
                    ...portfolio,
                    price: cryptoPrice.quote.USD.price,
                }
            })[0]
        );

    return <div className="home-page">
        <div className="home-page-container">
            <div className="home-graph">
                <PortfolioChart />
            </div>
            <ul className="home-ul">
                {folios.map(p => {
                    return (<li className="home-assets">
                        <a className="crypto-link" href={`/${p?.code}`}>
                            <span className="crypto-icon"><img className="crypto-img" src={`/icons/icon_${p?.code}.webp`} /></span>
                            <span className="crypto-name">{p?.code}: {Number(p?.price).toLocaleString()}</span>
                        </a>
                    </li>)
                })}
            </ul>
        </div>
    </div>
};

export default Home;