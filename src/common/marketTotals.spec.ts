import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { AssetAddress } from '../test/assetData';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from './marketTotals';

describe('market totals', () => {
    let orders: OrderInfo[];
    const daiWethId = [AssetAddress.Dai, AssetAddress.Weth].sort().join('|');
    const ensWethId = [AssetAddress.Ens, AssetAddress.Weth].sort().join('|');
    const atomWethId = [AssetAddress.Atom, AssetAddress.Weth].sort().join('|');
    const atomMultiWethId = [[AssetAddress.Atom, AssetAddress.Atom, AssetAddress.Atom].join('+'), AssetAddress.Weth]
        .sort()
        .join('|');
    const mixMultiWethId = [[AssetAddress.Atom, AssetAddress.Ens, AssetAddress.Dai].sort().join('+'), AssetAddress.Weth]
        .sort()
        .join('|');

    beforeAll(() => {
        orders = loadTestOrderInfo();
    });

    it('should count total number of different markets', () => {
        const result = countTotalNumberOfMarkets(orders);
        expect(result).toEqual(5);
    });

    it('should count total number of orders per market', () => {
        const result = countTotalOrdersPerMarket(orders);
        const expectedLength = 5;
        expect(result.length).toEqual(5);
        const daiWethResult = result.find(r => r.marketId === daiWethId);
        expect(daiWethResult.totalOrders).toEqual(expectedLength);
    });

    it('should get order amount per market', () => {
        const result = getOrdersPerMarket(orders);
        expect(result.length).toEqual(5);
        const daiWethMarket = result.find(r => r.marketId === daiWethId);
        expect(daiWethMarket.orders.length).toEqual(5);
        expect(daiWethMarket.orders[0]).toEqual({
            maker: {
                id: AssetAddress.Dai,
                amount: new BigNumber(1000000000000000000),
                multiAssetAmounts: null
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(180000000000000000000),
                multiAssetAmounts: null
            }
        });
        expect(daiWethMarket.orders[1]).toEqual({
            maker: {
                id: AssetAddress.Dai,
                amount: new BigNumber(1000000000000000000),
                multiAssetAmounts: null
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(181000000000000000000),
                multiAssetAmounts: null
            }
        });
        expect(daiWethMarket.orders[2]).toEqual({
            maker: {
                id: AssetAddress.Dai,
                amount: new BigNumber(1000000000000000000),
                multiAssetAmounts: null
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(182000000000000000000),
                multiAssetAmounts: null
            }
        });
        expect(daiWethMarket.orders[3]).toEqual({
            maker: {
                id: AssetAddress.Dai,
                amount: new BigNumber(1000000000000000000),
                multiAssetAmounts: null
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(183000000000000000000),
                multiAssetAmounts: null
            }
        });
        expect(daiWethMarket.orders[4]).toEqual({
            maker: {
                id: AssetAddress.Dai,
                amount: new BigNumber(1000000000000000000),
                multiAssetAmounts: null
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(184000000000000000000),
                multiAssetAmounts: null
            }
        });

        const ensWethMarket = result.find(r => r.marketId === ensWethId);
        expect(ensWethMarket.orders.length).toEqual(1);
        expect(ensWethMarket.orders[0]).toEqual({
            maker: {
                id: AssetAddress.Ens,
                amount: new BigNumber(1),
                multiAssetAmounts: null
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(125000000000000000),
                multiAssetAmounts: null
            }
        });

        const atomWethMarket = result.find(r => r.marketId === atomWethId);
        expect(atomWethMarket.orders.length).toEqual(1);
        expect(atomWethMarket.orders[0]).toEqual({
            maker: {
                id: AssetAddress.Atom,
                amount: new BigNumber(1),
                multiAssetAmounts: null
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(29000000000000000),
                multiAssetAmounts: null
            }
        });

        const atomMultiWethMarket = result.find(r => r.marketId === atomMultiWethId);
        expect(atomMultiWethMarket.orders[0]).toEqual({
            maker: {
                id: [AssetAddress.Atom, AssetAddress.Atom, AssetAddress.Atom].join('+'),
                amount: new BigNumber(1),
                multiAssetAmounts: [new BigNumber(1), new BigNumber(1), new BigNumber(1)]
            },
            taker: {
                id: AssetAddress.Weth,
                amount: new BigNumber(10000000000000000),
                multiAssetAmounts: null
            }
        });
    });
});
