import React from 'react';
import { fetchCurrentCryptoPrices } from '../requests';
import './Home.css';

const Home = ({ portfolios }) => {
    const [cryptoPrices, setCryptoPrices] = React.useState([]);

    React.useEffect(() => {
        fetchCurrentCryptoPrices(setCryptoPrices);
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

    console.log('yeah', folios)

    return <div className="home-page">
        <ul className="home-ul">
            {folios.map(p => {
                return (<li className="home-assets">
                    <a href={`/${p?.code}`}>{p?.name}</a> - {Number(p?.price).toLocaleString()}
                </li>)
            })}
        </ul>
    </div>
};

export default Home;