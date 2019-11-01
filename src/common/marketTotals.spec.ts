import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo, loadTestOrderInfoFile } from '../test/loadTestOrderInfo';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from './marketTotals';

fdescribe('market totals', () => {
    let orders: OrderInfo[];

    beforeAll(() => {
        orders = loadTestOrderInfo();
    });

    it('should count total number of different markets', () => {
        const result = countTotalNumberOfMarkets(orders);
        expect(result).toEqual(1);
    });

    it('should count total number of orders per market', () => {
        const result = countTotalOrdersPerMarket(orders);
        //console.log(result)
        const expectedLength = 5;
        expect(result.length).toEqual(1);
        expect(result[0].marketId).toBeDefined();
        expect(result[0].totalOrders).toEqual(expectedLength);
    });

    it('should get order amount per market', () => {
        const dai = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359';
        const result = getOrdersPerMarket(orders);
        expect(result.length).toEqual(1);
        expect(result[0].marketId).toEqual(
            '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359|0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
        );
        expect(result[0].orders[0]).toEqual({
            makerAddress: dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(180000000000000000000)
        });
        expect(result[0].orders[1]).toEqual({
            makerAddress: dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(181000000000000000000)
        });
        expect(result[0].orders[2]).toEqual({
            makerAddress: dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(182000000000000000000)
        });
        expect(result[0].orders[3]).toEqual({
            makerAddress: dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(183000000000000000000)
        });
        expect(result[0].orders[4]).toEqual({
            makerAddress: dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(184000000000000000000)
        });
    });
});
