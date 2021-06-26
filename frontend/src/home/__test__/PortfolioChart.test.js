import { getTheStuff } from '../PortfolioChart';

describe('PortfolioChart.test.js', () => {
    it('should...', () => {
        // Arrange
        const cryptoHistory = [
            {
                Date: "2021-06-21 00:00:00",
                Coin: 'btc',
                Amount: .0004,
                PricePerCoin: 30000,
            },
            {
                Date: "2021-06-22 00:00:00",
                Coin: 'btc',
                Amount: 10,
                PricePerCoin: 36000,
            },
            {
                Date: "2021-06-21 00:00:00",
                Coin: 'btc',
                Amount: .0004,
                PricePerCoin: 30000,
            },
            {
                Date: "2021-06-22 00:00:00",
                Coin: 'btc',
                Amount: 2,
                PricePerCoin: 36000,
            },
            {
                Date: "2021-06-21 00:00:00",
                Coin: 'eth',
                Amount: 1,
                PricePerCoin: 15000
            },
            {
                Date: "2021-06-22 00:00:00",
                Coin: 'eth',
                Amount: 3,
                PricePerCoin: 2000
            },
            {
                Date: "2021-06-21 00:00:00",
                Coin: 'eth',
                Amount: 1,
                PricePerCoin: 1900
            },
            {
                Date: "2021-06-22 00:00:00",
                Coin: 'eth',
                Amount: 3,
                PricePerCoin: 2000
            },
        ];

        const expectedOne = {
            Amount: (cryptoHistory[0].Amount * cryptoHistory[0].PricePerCoin)
                + (cryptoHistory[2].Amount * cryptoHistory[2].PricePerCoin)
                + (cryptoHistory[4].Amount * cryptoHistory[4].PricePerCoin)
                + (cryptoHistory[6].Amount * cryptoHistory[6].PricePerCoin),
            Date: cryptoHistory[0].Date
        }

        const portfolios = [
            {
                code: 'btc'
            },
            {
                code: 'eth'
            },
            {
                code: 'one'
            }
        ];

        // Act
        const actual = getTheStuff(cryptoHistory, portfolios);

        // Assert
        expect(actual[0]).toEqual(expectedOne);
    });
});