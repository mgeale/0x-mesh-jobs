import { OrderInfo } from '@0x/mesh-rpc-client';

import { AssetAddress } from '../test/assetData';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket } from './marketTotals';

describe('market totals', () => {
    let orders: OrderInfo[];
    const daiWethId = [AssetAddress.Dai, AssetAddress.Weth].sort().join('|');

    beforeAll(() => {
        orders = loadTestOrderInfo();
    });

    it('should count total number of different markets', () => {
        const result = countTotalNumberOfMarkets(orders);
        expect(result).toEqual(5);
    });

    it('should count total number of orders per market', () => {
        const result = countTotalOrdersPerMarket(orders);
        expect(result.length).toEqual(5);
        const daiWethResult = result.find(r => r.marketId === daiWethId);
        expect(daiWethResult.totalOrders).toEqual(5);
    });
});
