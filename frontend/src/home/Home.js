import React from 'react';
import useFetchInstrument from "../hooks/useFetchInstrumentHistory";
import { fetchCurrentInstrumentPrices } from '../requests';
import PortfolioChart from './PortfolioChart';
import { useSelectPortfolioList } from '../selectors/portfolioSelectors';
import './Home.css';

const Home = () => {
    const [cryptoPrices, setCryptoPrices] = React.useState([]);
    const portfolios = useSelectPortfolioList();
    //@TODO: Got to change this, we should not be depending on btc as a financial instrument.
    //@TODO: I just need the full date range and I picked anyone of the financial instruments.
    useFetchInstrument('btc');

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
            })[0]
        );

        

    return <div className="home-page">
        <div className="home-page-container">
            <div className="home-graph">
                <PortfolioChart />
            </div>
            <ul className="home-ul">
                <li className="home-assets">
                    <div className="crypto-index">#</div>
                    <div className="crypto-name">Name</div>
                    <div className="crypto-price">Price</div>
                    <div className="crypto-onehour">1hr Change</div>
                    <div className="crypto-oneday">24hr Change</div>
                    <div className="crypto-marketcap">Market Cap</div>
                </li>
                {folios.map((p, index) => {
                    return (<li className="home-assets">
                        {/* <a className="crypto-link" href={`/${p?.code}`}> */}
                        <div className="crypto-index">{index}</div>
                        <div className="crypto-name">
                            <span className="crypto-image"><img className="crypto-img" src={`/icons/icon_${p?.code}.webp`} /> </span>
                            <span className="name">{p?.name}</span>
                            <span className="code">({p?.code.toUpperCase()})</span>
                        </div>
                        <div className="crypto-price">${Number(p?.price).toLocaleString()}</div>
                        <div className="crypto-onehour">{p?.oneHour?.toFixed(2)}</div>
                        <div className="crypto-oneday">{p?.oneDay.toFixed(2)}</div>
                        <div className="crypto-marketcap">{p?.marketCap.toLocaleString()}</div>
                        {/* </a> */}
                    </li>)
                })}
            </ul>
        </div>
    </div>
};

export default Home;