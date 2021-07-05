import React from 'react';

const isNegative = percentageChange => {
    console.log('percentageChange', percentageChange)
    if (percentageChange === undefined) {
        return false;
    }

    if (percentageChange.search('-') === 0) {
        return true;
    }

    return false;
};

const upDown = entry => isNegative(entry.toFixed(2))
    ? (<span className="red"><ion-icon name="arrow-down">entry.toFixed(2)</ion-icon></span>)
    : (<span className="green"><ion-icon name="arrow-up">entry.toFixed(2)</ion-icon></span>);

const PortfolioGridRow = ({ p, index }) => {
    const { name, code, price, oneHour, oneDay, marketCap } = p;
    const nameFormat = name;
    const priceFormat = Number(price).toLocaleString();
    const oneHourFormat = oneHour.toFixed(2);
    const oneDayFormat = oneDay.toFixed(2);
    const marketCapFormat = marketCap.toLocaleString();
    const codeFormat = code.toUpperCase();
    const oneHourPercentSign = upDown(oneHour);
    const oneDayPercentSign = upDown(oneDay);
    
    return <a className="crypto-link" href={`/${code}`}>
        <li className="home-assets">
            <div className="crypto-index">{index}</div>
            <div className="crypto-name">
                <span className="crypto-image"><img className="crypto-img" src={`/icons/icon_${code}.webp`} /> </span>
                <span className="name">{nameFormat}</span>
                <span className="code">{codeFormat}</span>
            </div>
            <div className="crypto-price">{priceFormat}</div>
            <div className="crypto-onehour">{oneHourPercentSign}{oneHourFormat}</div>
            <div className="crypto-oneday">{oneDayPercentSign}{oneDayFormat}</div>
            <div className="crypto-marketcap">{marketCapFormat}</div>
        </li>
    </a>
};

export default PortfolioGridRow;