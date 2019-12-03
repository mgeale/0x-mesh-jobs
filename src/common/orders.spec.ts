import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { AssetAddress, AssetProxyId, TokenId } from '../test/assetData';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { AssetAmounts, getOrdersPerMarket } from './orders';

describe('orders', () => {
    let orders: OrderInfo[];
    const daiWethId = [AssetAddress.Dai, AssetAddress.Weth].sort().join('|');
    const ensWethId = [AssetAddress.Ens, AssetAddress.Weth].sort().join('|');
    const atomWethId = [AssetAddress.Atom, AssetAddress.Weth].sort().join('|');
    const atomMultiWethId = [[AssetAddress.Atom, AssetAddress.Atom, AssetAddress.Atom].join('+'), AssetAddress.Weth]
        .sort()
        .join('|');

    const singleDai = 1000000000000000000;
    const singleWeth = 1000000000000000000;
    const makerAddress = 'maker_address';

    beforeAll(() => {
        orders = loadTestOrderInfo();
    });

    it('should get order amount per market', () => {
        const result = getOrdersPerMarket(orders);
        expect(result.length).toEqual(5);
        const daiWethMarket = result.find(r => r.marketId === daiWethId);
        expect(daiWethMarket.orders.length).toEqual(5);

        const orderSingleWeth = {
            assetProxyId: AssetProxyId.Erc20,
            tokenAddress: AssetAddress.Weth,
            amount: new BigNumber(singleWeth)
        } as AssetAmounts;

        expect(daiWethMarket.orders[0]).toEqual({
            makerAddress,
            makerAsset: orderSingleWeth,
            takerAsset: {
                assetProxyId: AssetProxyId.Erc20,
                tokenAddress: AssetAddress.Dai,
                amount: new BigNumber(singleDai * 180)
            } as AssetAmounts
        });

        expect(daiWethMarket.orders[1]).toEqual({
            makerAddress,
            makerAsset: orderSingleWeth,
            takerAsset: {
                assetProxyId: AssetProxyId.Erc20,
                tokenAddress: AssetAddress.Dai,
                amount: new BigNumber(singleDai * 182.5)
            } as AssetAmounts
        });

        expect(daiWethMarket.orders[2]).toEqual({
            makerAddress,
            makerAsset: orderSingleWeth,
            takerAsset: {
                assetProxyId: AssetProxyId.Erc20,
                tokenAddress: AssetAddress.Dai,
                amount: new BigNumber(singleDai * 185)
            } as AssetAmounts
        });

        expect(daiWethMarket.orders[3]).toEqual({
            makerAddress,
            makerAsset: orderSingleWeth,
            takerAsset: {
                assetProxyId: AssetProxyId.Erc20,
                tokenAddress: AssetAddress.Dai,
                amount: new BigNumber(singleDai * 187.5)
            } as AssetAmounts
        });

        expect(daiWethMarket.orders[4]).toEqual({
            makerAddress,
            makerAsset: orderSingleWeth,
            takerAsset: {
                assetProxyId: AssetProxyId.Erc20,
                tokenAddress: AssetAddress.Dai,
                amount: new BigNumber(singleDai * 190)
            } as AssetAmounts
        });

        const ensWethMarket = result.find(r => r.marketId === ensWethId);
        expect(ensWethMarket.orders.length).toEqual(1);
        expect(ensWethMarket.orders[0]).toEqual({
            makerAddress,
            makerAsset: {
                assetProxyId: AssetProxyId.Erc721,
                tokenAddress: AssetAddress.Ens,
                amount: new BigNumber(1),
                tokenId: new BigNumber(TokenId.Ens)
            } as AssetAmounts,
            takerAsset: {
                assetProxyId: AssetProxyId.Erc20,
                tokenAddress: AssetAddress.Weth,
                amount: new BigNumber(singleWeth / 4)
            } as AssetAmounts
        });

        const atomWethMarket = result.find(r => r.marketId === atomWethId);
        expect(atomWethMarket.orders.length).toEqual(1);
        expect(atomWethMarket.orders[0]).toEqual({
            makerAddress,
            makerAsset: {
                assetProxyId: AssetProxyId.Erc721,
                tokenAddress: AssetAddress.Atom,
                amount: new BigNumber(1),
                tokenId: new BigNumber(TokenId.Atom)
            } as AssetAmounts,
            takerAsset: {
                assetProxyId: AssetProxyId.Erc20,
                tokenAddress: AssetAddress.Weth,
                amount: new BigNumber(singleWeth / 5)
            } as AssetAmounts
        });

        const atomMultiWethMarket = result.find(r => r.marketId === atomMultiWethId);
        expect(atomMultiWethMarket.orders[0]).toEqual({
            makerAddress,
            makerAsset: {
                assetProxyId: AssetProxyId.MultiAsset,
                amounts: [new BigNumber(1), new BigNumber(1), new BigNumber(1)],
                amount: new BigNumber(1),
                nestedAssetData: [
                    {
                        assetProxyId: AssetProxyId.Erc721,
                        tokenAddress: AssetAddress.Atom,
                        tokenId: new BigNumber(156)
                    },
                    {
                        assetProxyId: AssetProxyId.Erc721,
                        tokenAddress: AssetAddress.Atom,
                        tokenId: new BigNumber(414)
                    },
                    {
                        assetProxyId: AssetProxyId.Erc721,
                        tokenAddress: AssetAddress.Atom,
                        tokenId: new BigNumber(544)
                    }
                ]
            } as AssetAmounts,
            takerAsset: orderSingleWeth
        });
    });
});
