import { OrderInfo } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { calculateTotalNumberOfMarkets, calculateTotalOrdersPerMarket } from './marketTotals';

describe('market totals', () => {
    let orders: OrderInfo[];

    beforeAll(() => {
        orders = loadTestOrderInfo();
    });

    it('should calculate total number of different markets', () => {
        expect(calculateTotalNumberOfMarkets(orders)).toEqual(7);
    });

    it('should calculate total number of orders per market', () => {
        expect(calculateTotalOrdersPerMarket(orders)).toEqual([]);
    });
});
