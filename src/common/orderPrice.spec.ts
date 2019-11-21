import { BigNumber, SignedOrder } from '@0x/mesh-rpc-client';

import { getAskOrderPrice, getBidOrderPrice } from './orderPrice';

describe('order price', () => {
    it('should calculate ask order price', () => {
        const order: SignedOrder = {
            makerAddress: 'maker_address',
            makerAssetData: 'maker_asset_data',
            makerAssetAmount: new BigNumber(272246488340000000000),
            makerFee: new BigNumber(0),
            takerAddress: 'taker_address',
            takerAssetData: 'taker_asset_data',
            takerAssetAmount: new BigNumber(1333681097079992000),
            takerFee: new BigNumber(0),
            senderAddress: 'sender_address',
            exchangeAddress: 'exchange_address',
            feeRecipientAddress: 'fee_recipient_address',
            expirationTimeSeconds: new BigNumber(0),
            salt: new BigNumber(0),
            signature: 'signature'
        };
        const result = getAskOrderPrice([order]);
        expect(result[0].price).toEqual(new BigNumber(0.0048988));
    });

    it('should calculate bid order price', () => {
        const order: SignedOrder = {
            makerAddress: 'maker_address',
            makerAssetData: 'maker_asset_data',
            makerAssetAmount: new BigNumber(135090000000000000),
            makerFee: new BigNumber(0),
            takerAddress: 'taker_address',
            takerAssetData: 'taker_asset_data',
            takerAssetAmount: new BigNumber(150000000000000000000),
            takerFee: new BigNumber(0),
            senderAddress: 'sender_address',
            exchangeAddress: 'exchange_address',
            feeRecipientAddress: 'fee_recipient_address',
            expirationTimeSeconds: new BigNumber(0),
            salt: new BigNumber(0),
            signature: 'signature'
        };
        const result = getBidOrderPrice([order]);
        expect(result[0].price).toEqual(new BigNumber(0.0009006));
    });
});
