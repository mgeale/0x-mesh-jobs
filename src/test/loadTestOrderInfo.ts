import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';
import * as fs from 'fs';
import * as path from 'path';

import { EncodedAssets } from './assetData';

/**
 * <<<<<<<>>>>>>>>>.
 */
export function loadTestOrderInfo(): OrderInfo[] {
    const orders = [];
    const length = 5;
    let index = 0;
    const makerAmount = 1000000000000000000;
    while (index < length) {
        const takerAmount = (index + 1) * 1000000000000000000 + 179000000000000000000;
        orders.push({
            signedOrder: {
                senderAddress: 'sender_address',
                makerAddress: 'maker_address',
                takerAddress: 'taker_address',
                makerFee: new BigNumber(0),
                takerFee: new BigNumber(0),
                makerAssetAmount: new BigNumber(makerAmount),
                takerAssetAmount: new BigNumber(takerAmount),
                makerAssetData: EncodedAssets.Dai,
                takerAssetData: EncodedAssets.Weth,
                salt: new BigNumber(0),
                exchangeAddress: 'exchange_address',
                feeRecipientAddress: 'fee_recipient_address',
                expirationTimeSeconds: new BigNumber(0),
                signature: 'signature',
            },
        });
        index++;
    }
    return orders;
}

/**
 * <<<<<<<>>>>>>>>>.
 */
export function loadTestOrderInfoFile(): OrderInfo[] {
    const rawData = fs.readFileSync(path.join(__dirname, '../../testData/meshOrders.json'));
    const orders = JSON.parse(rawData.toString());
    return orders.map(o => {
        return {
            orderHash: o.orderHash,
            signedOrder: {
                ...o.signedOrder,
                makerAssetData: EncodedAssets.Dai,
                takerAssetData: EncodedAssets.Weth,
                makerFee: new BigNumber(o.signedOrder.makerFee),
                takerFee: new BigNumber(o.signedOrder.takerFee),
                makerAssetAmount: new BigNumber(o.signedOrder.makerAssetAmount),
                takerAssetAmount: new BigNumber(o.signedOrder.takerAssetAmount),
                salt: new BigNumber(o.signedOrder.salt),
                expirationTimeSeconds: new BigNumber(o.signedOrder.expirationTimeSeconds),
            },
            fillableTakerAssetAmount: o.fillableTakerAssetAmount,
        };
    });
}
