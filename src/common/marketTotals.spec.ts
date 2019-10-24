import { OrderInfo } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from './marketTotals';

describe('market totals', () => {
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
        expect(result.length).toEqual(1);
        expect(result[0].id).toBeDefined();
        expect(result[0].totalOrders).toEqual(5);
    });

    it('should get order amount per market', () => {
        const result = getOrdersPerMarket(orders);
        expect(result.length).toEqual(1);
        expect(result[0].id).toBeDefined();
        expect(result[0].orders).toEqual([[], [[0.01, 0.1], [0.01, 0.2], [0.01, 0.3], [0.01, 0.4], [0.01, 0.5]]]);
    });
});
