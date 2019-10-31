import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo, loadTestOrderInfoFile } from '../test/loadTestOrderInfo';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from './marketTotals';

fdescribe('market totals', () => {
    let orders: OrderInfo[];

    beforeAll(() => {
        //orders = loadTestOrderInfoFile();
        orders = [
            {
                orderHash: '0x43b7913a1479c17c797f23965e432c2d302fb068689308559e733f9f03c7ec17',
                signedOrder: {
                    makerAddress: '0xdcae967431fb51aa7453ec6c06fa544c25e0f1ff',
                    makerAssetData:
                        '0x94cfcdd7000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000004402571792000000000000000000000000bdaed67214641b7eda3bf8d7431c3ae5fc46f466000000000000000000000000000000000000000000000000000000000000009c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004402571792000000000000000000000000bdaed67214641b7eda3bf8d7431c3ae5fc46f466000000000000000000000000000000000000000000000000000000000000019e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004402571792000000000000000000000000bdaed67214641b7eda3bf8d7431c3ae5fc46f466000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000',
                    makerAssetAmount: new BigNumber('1'),
                    makerFee: new BigNumber('0'),
                    takerAddress: '0x0000000000000000000000000000000000000000',
                    takerAssetData: '0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                    takerAssetAmount: new BigNumber('10000000000000000'),
                    takerFee: new BigNumber('0'),
                    senderAddress: '0x0000000000000000000000000000000000000000',
                    exchangeAddress: '0x080bf510fcbf18b91105470639e9561022937712',
                    feeRecipientAddress: '0xb0d7398d779ee9ffc727d2d5b045a5b441da8233',
                    expirationTimeSeconds: new BigNumber('1576828800'),
                    salt: new BigNumber(
                        '43093920559528974630875363482779105377433448845750093018366375035674683348719'
                    ),
                    signature:
                        '0x1cdf6a9479d9390ea6ccdb7f0fbe3e4ff6d0078431b8c3c06ecd523706aaa5157b5815d79e4d9df36e650f950e9622b09b971770d7916a30a747ed71c4ad8bd52e02'
                },
                fillableTakerAssetAmount: new BigNumber('10000000000000000')
            }
        ];
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
