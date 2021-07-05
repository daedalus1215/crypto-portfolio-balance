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

const upDown = p => isNegative(p?.oneHour?.toFixed(2))
    ? (<ion-icon name="arrow-down" className="red"></ion-icon>)
    : (<ion-icon name="arrow-up" className="green"></ion-icon>);

const PortfolioGridRow = ({p, index}) => {
    return <li className="home-assets">
        {/* <a className="crypto-link" href={`/${p?.code}`}> */}

        <div className="crypto-index">{index}</div>
        <div className="crypto-name">
            <span className="crypto-image"><img className="crypto-img" src={`/icons/icon_${p?.code}.webp`} /> </span>
            <span className="name">{p?.name}</span>
            <span className="code">({p?.code.toUpperCase()})</span>
        </div>
        <div className="crypto-price">${Number(p?.price).toLocaleString()}</div>
        <div className="crypto-onehour">{upDown(p?.oneHour)}{p?.oneHour?.toFixed(2)}</div>
        <div className="crypto-oneday">{upDown(p?.oneDay)}{p?.oneDay.toFixed(2)}</div>
        <div className="crypto-marketcap">{p?.marketCap.toLocaleString()}</div>
        {/* </a> */}
    </li>
};

export default PortfolioGridRow;