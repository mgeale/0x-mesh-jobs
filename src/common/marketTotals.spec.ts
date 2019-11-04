import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo, loadTestOrderInfoFile } from '../test/loadTestOrderInfo';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from './marketTotals';
import { AssetAddress } from '../test/assetData';

fdescribe('market totals', () => {
    let orders: OrderInfo[];
    const daiWethId = [AssetAddress.Dai, AssetAddress.Weth].sort().join('|');
    const ensWethId = [AssetAddress.Ens, AssetAddress.Weth].sort().join('|');
    const atomWethId = [AssetAddress.Atom, AssetAddress.Weth].sort().join('|');

    beforeAll(() => {
        orders = loadTestOrderInfo();
    });

    it('should count total number of different markets', () => {
        const result = countTotalNumberOfMarkets(orders);
        expect(result).toEqual(4);
    });

    it('should count total number of orders per market', () => {
        const result = countTotalOrdersPerMarket(orders);
        const expectedLength = 5;
        expect(result.length).toEqual(3);
        const daiWethResult = result.find(r => r.marketId === daiWethId);
        expect(daiWethResult.totalOrders).toEqual(expectedLength);
    });

    it('should get order amount per market', () => {
        const result = getOrdersPerMarket(orders);
        expect(result.length).toEqual(3);
        const daiWethMarket = result.find(r => r.marketId === daiWethId);
        expect(daiWethMarket.orders.length).toEqual(5);
        expect(daiWethMarket.orders[0]).toEqual({
            makerAddress: AssetAddress.Dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(180000000000000000000)
        });
        expect(daiWethMarket.orders[1]).toEqual({
            makerAddress: AssetAddress.Dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(181000000000000000000)
        });
        expect(daiWethMarket.orders[2]).toEqual({
            makerAddress: AssetAddress.Dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(182000000000000000000)
        });
        expect(daiWethMarket.orders[3]).toEqual({
            makerAddress: AssetAddress.Dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(183000000000000000000)
        });
        expect(daiWethMarket.orders[4]).toEqual({
            makerAddress: AssetAddress.Dai,
            makerAmount: new BigNumber(1000000000000000000),
            takerAmount: new BigNumber(184000000000000000000)
        });

        const ensWethMarket = result.find(r => r.marketId === ensWethId);
        expect(ensWethMarket.orders.length).toEqual(1);
        expect(ensWethMarket.orders[0]).toEqual({
            makerAddress: AssetAddress.Ens,
            makerAmount: new BigNumber(1),
            takerAmount: new BigNumber(125000000000000000)
        });

        const atomWethMarket = result.find(r => r.marketId === atomWethId);
        expect(atomWethMarket.orders.length).toEqual(4);
        expect(atomWethMarket.orders[0]).toEqual({
            makerAddress: AssetAddress.Atom,
            makerAmount: new BigNumber(1),
            takerAmount: new BigNumber(29000000000000000)
        });
        expect(atomWethMarket.orders[1]).toEqual({
            makerAddress: AssetAddress.Atom,
            makerAmount: new BigNumber(1),
            takerAmount: new BigNumber(3333333333333333)
        });
        expect(atomWethMarket.orders[2]).toEqual({
            makerAddress: AssetAddress.Atom,
            makerAmount: new BigNumber(1),
            takerAmount: new BigNumber(3333333333333333)
        });
        expect(atomWethMarket.orders[3]).toEqual({
            makerAddress: AssetAddress.Atom,
            makerAmount: new BigNumber(1),
            takerAmount: new BigNumber(3333333333333333)
        });
    });
});
