import { aggregateValueByDayAcrossMultipleDays } from '../utilities';

describe('utilities.test.js', () => {
    it('should accumulate the quantity * exchange rate across multiple days', () => {
        // Arrange
        const activity = [
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

        const expectedOne = (activity[0].Amount * activity[0].PricePerCoin)
            + (activity[2].Amount * activity[2].PricePerCoin)
            + (activity[4].Amount * activity[4].PricePerCoin)
            + (activity[6].Amount * activity[6].PricePerCoin);

        const expectedTwo = expectedOne
            + (activity[1].Amount * activity[1].PricePerCoin)
            + (activity[3].Amount * activity[3].PricePerCoin)
            + (activity[5].Amount * activity[5].PricePerCoin)
            + (activity[7].Amount * activity[7].PricePerCoin);

        const instrumentHistory = [
            {
                Date: '2021-06-21 00:00:00',
            },
            {
                Date: '2021-06-22 00:00:00',
            }];

        // Act
        const actual = aggregateValueByDayAcrossMultipleDays(activity, instrumentHistory);

        // Assert
        expect(actual[0]).toEqual(expectedOne);
        expect(actual[1]).toEqual(expectedTwo);
    });
});