import { aggregateValueByDayAcrossMultipleDays } from '../utilities';

describe('utilities.test.js', () => {
    describe('aggregateValueByDayAcrossMultipleDays', () => {
        it('should accumulate the quantity * exchange rate across multiple days', () => {
            // Arrange
            const activities = [
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

            const expectedOne = (activities[0].Amount * activities[0].PricePerCoin)
                + (activities[2].Amount * activities[2].PricePerCoin)
                + (activities[4].Amount * activities[4].PricePerCoin)
                + (activities[6].Amount * activities[6].PricePerCoin);

            const expectedTwo = expectedOne
                + (activities[1].Amount * activities[1].PricePerCoin)
                + (activities[3].Amount * activities[3].PricePerCoin)
                + (activities[5].Amount * activities[5].PricePerCoin)
                + (activities[7].Amount * activities[7].PricePerCoin);

            const instrumentHistory = [
                {
                    Date: '2021-06-21 00:00:00',
                },
                {
                    Date: '2021-06-22 00:00:00',
                }];

            // Act
            const actual = aggregateValueByDayAcrossMultipleDays(activities, instrumentHistory);

            // Assert
            expect(actual[0]).toEqual(expectedOne);
            expect(actual[1]).toEqual(expectedTwo);
        });
    });
});